import React, { useState, useMemo, ChangeEvent } from 'react';

interface Column {
  Header: string;
  accessor: string;
  filterable?: boolean;
  Cell?: (row: Record<string, unknown>) => React.ReactNode;
}

interface SortConfig {
  key: string | null;
  direction: 'asc' | 'desc';
}

interface CreativeDataTableProps {
  data: Array<Record<string, string | number | boolean>>;
  columns: Column[];
  pageSizeOptions?: number[];
}

interface SortIndicatorProps {
  direction: 'asc' | 'desc';
}

const CreativeDataTable: React.FC<CreativeDataTableProps> = ({
  data,
  columns,
  pageSizeOptions = [5, 10, 20]
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
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
      Object.entries(filters).every(([key, value]) =>
        !value || String(row[key]).toLowerCase() === value.toLowerCase()
      )
    );

    // Sorting
    if (sortConfig.key) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
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
    <span className="ml-2 transition-transform duration-300">
      {direction === 'asc' ? '↑' : '↓'}
    </span>
  );

  // Unique feature: Column filter chips
  const FilterChips: React.FC = () => (
    <div className="flex flex-wrap gap-2 mb-4">
      {Object.entries(filters).map(([key, value]) =>
        value ? (
          <span
            key={key}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center"
          >
            {columns.find((c) => c.accessor === key)?.Header}: {value}
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, [key]: '' }))
              }
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </span>
        ) : null
      )}
    </div>
  );

  return (
    <div className="p-6 bg-white  rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800">
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="🔍 Search all columns..."
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600"
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        />

        <FilterChips />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {columns.map(
            (col) =>
              col.filterable && (
                <select
                  key={col.accessor}
                  className="p-2 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFilters((prev) => ({
                      ...prev,
                      [col.accessor]: e.target.value
                    }))
                  }
                  value={filters[col.accessor] || ''}
                >
                  <option value="">All {col.Header}</option>
                  {[...new Set(data.map((item) => item[col.accessor]))].map((value) => (
                    <option key={String(value)} value={String(value)}>
                      {value}
                    </option>
                  ))}
                </select>
              )
          )}
        </div>
      </div>

      {/* Table */}
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
                        prev.key === col.accessor && prev.direction === 'asc'
                          ? 'desc'
                          : 'asc'
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
                className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                onClick={() =>
                  setExpandedRow(expandedRow === index ? null : index)
                }
              >
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {col.Cell ? col.Cell(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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

          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreativeDataTable;
