import React, { useState, useMemo, ChangeEvent } from "react";

interface Column {
  Header: string;
  accessor: string;
  filterable?: boolean;
  Cell?: (row: Record<string, unknown>) => React.ReactNode;
}

interface SortConfig {
  key: string | null;
  direction: "asc" | "desc";
}

interface CreativeDataTableProps {
  data: Array<Record<string, string | number | boolean>>;
  columns: Column[];
  pageSizeOptions?: number[];
}

interface SortIndicatorProps {
  direction: "asc" | "desc";
}

const CreativeDataTable: React.FC<CreativeDataTableProps> = ({
  data,
  columns,
  pageSizeOptions = [5, 10, 20],
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(pageSizeOptions[0]);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Memoized filtered and sorted data
  const processedData = useMemo(() => {
    let filteredData = data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );

    // Apply column filters
    filteredData = filteredData.filter((row) =>
      Object.entries(filters).every(
        ([key, value]) =>
          !value || String(row[key]).toLowerCase() === value.toLowerCase()
      )
    );

    // Sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, filters, sortConfig, columns]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / pageSize);
  const paginatedData = processedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Unique feature: Animated sorting indicators
  const SortIndicator: React.FC<SortIndicatorProps> = ({ direction }) => (
    <span className="ml-6 transition-transform duration-300 ">
      {direction === "asc" ? "↑" : "↓"}
    </span>
  );

  // Unique feature: Column filter chips
  const FilterChips: React.FC = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(filters).map(([key, value]) =>
        value ? (
          <span
            key={key}
            className="px-4 py-1 bg-blue-100 text-blue-900 rounded-full flex items-center"
          >
            {columns.find((c) => c.accessor === key)?.Header}: {value}
            <button
              onClick={() => setFilters((prev) => ({ ...prev, [key]: "" }))}
              className="ml-2 text-blue-700 hover:text-red-600 text-2xl"
            >
              ×
            </button>
          </span>
        ) : null
      )}
    </div>
  );

  return (
    <div className="p-6 mb-10 mx-5 border border-white/20  rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="🔍 Search all columns..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
        />

        <FilterChips />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {columns.map(
            (col) =>
              col.filterable && (
                <select
                  key={col.accessor}
                  className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFilters((prev) => ({
                      ...prev,
                      [col.accessor]: e.target.value,
                    }))
                  }
                  value={filters[col.accessor] || ""}
                >
                  <option value="">All {col.Header}</option>
                  {[...new Set(data.map((item) => item[col.accessor]))].map(
                    (value) => (
                      <option key={String(value)} value={String(value)}>
                        {value}
                      </option>
                    )
                  )}
                </select>
              )
          )}
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  onClick={() =>
                    setSortConfig((prev) => ({
                      key: col.accessor,
                      direction:
                        prev.key === col.accessor && prev.direction === "asc"
                          ? "desc"
                          : "asc",
                    }))
                  }
                >
                  <div className="flex items-center">
                    {col.Header}
                    {sortConfig.key === col.accessor && (
                      <SortIndicator direction={sortConfig.direction} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                  row.status === "Inactive"
                    ? "bg-red-100 dark:bg-red-500/10"
                    : "bg-blue-100 dark:bg-blue-500/10"
                }`}
                onClick={() =>
                  setExpandedRow(expandedRow === index ? null : index)
                }
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className={`px-6 py-4 text-sm text-gray-700 dark:text-gray-300 ${
                      expandedRow === index
                        ? "bg-gray-100/40 dark:bg-gray-600/30"
                        : ""
                    }`}
                  >
                    {col.Cell ? col.Cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <select
            className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700"
            value={pageSize}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setPageSize(Number(e.target.value))
            }
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                Show {option}
              </option>
            ))}
          </select>

          {/* <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span> */}
        </div>

        <div className="flex space-x-2">
          <button
            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white/90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white/90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div className="flex items-center px-2 py-2 text-sm font-light text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
            Page {currentPage} of {totalPages}
          </div>

          <button
            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white/90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <button
            className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-1"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white/90"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreativeDataTable;
