// App.tsx
import "./App.css";
import CreativeDataTable from "./components/CreativeDataTable";

function App() {
  const data = [
    { id: 1, name: "John", age: 25, status: "Active" },
    { id: 2, name: "Jane", age: 30, status: "Inactive" },
    { id: 3, name: "Alice", age: 28, status: "Active" },
    { id: 4, name: "Bob", age: 32, status: "Inactive" },
    { id: 5, name: "Charlie", age: 22, status: "Active" },
    { id: 6, name: "David", age: 27, status: "Active" },
    { id: 7, name: "Eva", age: 29, status: "Inactive" },
    { id: 8, name: "Frank", age: 24, status: "Active" },
    { id: 9, name: "Grace", age: 26, status: "Inactive" },
    { id: 10, name: "Hannah", age: 31, status: "Active" },
    { id: 11, name: "Ian", age: 23, status: "Active" },
    { id: 12, name: "Jill", age: 34, status: "Inactive" },
    { id: 13, name: "Kevin", age: 29, status: "Active" },
    { id: 14, name: "Laura", age: 27, status: "Inactive" },
    { id: 15, name: "Mike", age: 33, status: "Active" },
    { id: 16, name: "Nina", age: 28, status: "Inactive" },
    { id: 17, name: "Oscar", age: 26, status: "Active" },
    { id: 18, name: "Pam", age: 25, status: "Inactive" },
    { id: 19, name: "Quinn", age: 30, status: "Active" },
    { id: 20, name: "Rachel", age: 32, status: "Inactive" },
    { id: 21, name: "Sam", age: 27, status: "Active" },
    { id: 22, name: "Tina", age: 24, status: "Inactive" },
    { id: 23, name: "Uma", age: 26, status: "Active" },
    { id: 24, name: "Victor", age: 31, status: "Inactive" },
    { id: 25, name: "Wendy", age: 29, status: "Active" },
    { id: 26, name: "Xander", age: 28, status: "Inactive" },
    { id: 27, name: "Yvonne", age: 27, status: "Active" },
    { id: 28, name: "Zach", age: 33, status: "Inactive" },
    { id: 29, name: "Aaron", age: 22, status: "Active" },
    { id: 30, name: "Betty", age: 30, status: "Inactive" },
    { id: 31, name: "Carl", age: 25, status: "Active" },
    { id: 32, name: "Diana", age: 31, status: "Inactive" },
    { id: 33, name: "Ethan", age: 27, status: "Active" },
    { id: 34, name: "Fiona", age: 24, status: "Inactive" },
    { id: 35, name: "George", age: 28, status: "Active" },
    { id: 36, name: "Helen", age: 29, status: "Inactive" },
    { id: 37, name: "Isaac", age: 26, status: "Active" },
    { id: 38, name: "Jasmine", age: 32, status: "Inactive" },
    { id: 39, name: "Kyle", age: 23, status: "Active" },
    { id: 40, name: "Lily", age: 25, status: "Inactive" },
    { id: 41, name: "Mark", age: 30, status: "Active" },
    { id: 42, name: "Nora", age: 27, status: "Inactive" },
    { id: 43, name: "Owen", age: 28, status: "Active" },
    { id: 44, name: "Paula", age: 29, status: "Inactive" },
    { id: 45, name: "Quincy", age: 31, status: "Active" },
    { id: 46, name: "Rita", age: 26, status: "Inactive" },
    { id: 47, name: "Steve", age: 24, status: "Active" },
    { id: 48, name: "Tara", age: 30, status: "Inactive" },
    { id: 49, name: "Ulysses", age: 28, status: "Active" },
    { id: 50, name: "Violet", age: 27, status: "Inactive" },
    { id: 51, name: "Walter", age: 29, status: "Active" },
    { id: 52, name: "Xenia", age: 25, status: "Inactive" },
    { id: 53, name: "Yosef", age: 31, status: "Active" },
    { id: 54, name: "Zara", age: 26, status: "Inactive" },
    { id: 55, name: "Adam", age: 24, status: "Active" },
    { id: 56, name: "Bella", age: 27, status: "Inactive" },
    { id: 57, name: "Cody", age: 29, status: "Active" },
    { id: 58, name: "Daisy", age: 30, status: "Inactive" },
    { id: 59, name: "Eli", age: 28, status: "Active" },
    { id: 60, name: "Faith", age: 26, status: "Inactive" },
    { id: 61, name: "Gavin", age: 25, status: "Active" },
    { id: 62, name: "Hailey", age: 31, status: "Inactive" },
    { id: 63, name: "Ian", age: 29, status: "Active" },
    { id: 64, name: "Jenna", age: 27, status: "Inactive" },
    { id: 65, name: "Karl", age: 24, status: "Active" },
    { id: 66, name: "Laura", age: 28, status: "Inactive" },
    { id: 67, name: "Miles", age: 26, status: "Active" },
    { id: 68, name: "Nina", age: 30, status: "Inactive" },
    { id: 69, name: "Omar", age: 29, status: "Active" },
    { id: 70, name: "Penny", age: 25, status: "Inactive" },
    { id: 71, name: "Quentin", age: 31, status: "Active" },
    { id: 72, name: "Ralph", age: 27, status: "Inactive" },
    { id: 73, name: "Sophie", age: 28, status: "Active" },
    { id: 74, name: "Trent", age: 29, status: "Inactive" },
    { id: 75, name: "Ursula", age: 26, status: "Active" },
    { id: 76, name: "Vince", age: 24, status: "Inactive" },
    { id: 77, name: "Wanda", age: 30, status: "Active" },
    { id: 78, name: "Xander", age: 28, status: "Inactive" },
    { id: 79, name: "Yara", age: 27, status: "Active" },
    { id: 80, name: "Zane", age: 31, status: "Inactive" },
    { id: 81, name: "Alan", age: 29, status: "Active" },
    { id: 82, name: "Bianca", age: 25, status: "Inactive" },
    { id: 83, name: "Caleb", age: 30, status: "Active" },
    { id: 84, name: "Diana", age: 27, status: "Inactive" },
    { id: 85, name: "Ethan", age: 28, status: "Active" },
    { id: 86, name: "Felicity", age: 29, status: "Inactive" },
    { id: 87, name: "George", age: 26, status: "Active" },
    { id: 88, name: "Hazel", age: 24, status: "Inactive" },
    { id: 89, name: "Isaac", age: 31, status: "Active" },
    { id: 90, name: "Jade", age: 27, status: "Inactive" },
    { id: 91, name: "Kevin", age: 28, status: "Active" },
    { id: 92, name: "Lana", age: 29, status: "Inactive" },
    { id: 93, name: "Mason", age: 26, status: "Active" },
    { id: 94, name: "Nora", age: 24, status: "Inactive" },
    { id: 95, name: "Owen", age: 31, status: "Active" },
    { id: 96, name: "Paige", age: 27, status: "Inactive" },
    { id: 97, name: "Quinn", age: 28, status: "Active" },
    { id: 98, name: "Riley", age: 29, status: "Inactive" },
    { id: 99, name: "Sophia", age: 26, status: "Active" },
    { id: 100, name: "Tyler", age: 24, status: "Inactive" },
  ];

  const columns = [
    { Header: "ID", accessor: "id", filterable: true },
    { Header: "Name", accessor: "name", filterable: true },
    { Header: "Age", accessor: "age", filterable: true },
    {
      Header: "Status",
      accessor: "status",
      filterable: true,
    },
  ];

  const PortfolioEmbed = () => {
    return (
      <div className="max-w-7xl mx-auto w-full">
        <div className="relative w-full overflow-hidden rounded-xl shadow-purple-800/30 shadow-2xl bg-white dark:bg-gray-800">
          <div className="aspect-auto w-full">
            <iframe
              src="https://aharekrushna.netlify.app/"
              className="w-full h-[600px] border-none rounded-t-lg scroll-bar"
              title="HareKrushna's Portfolio"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            >
              <p className="text-red-500">
                Your browser does not support iframes.
              </p>
            </iframe>
          </div>

          <div className="p-10 text-center">
            <a
              href="https://aharekrushna.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Open Portfolio in New Tab ↗
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-10 py-4 w-full dark:bg-gray-900 h-full overflow-x-clip">
      <div className="my-10 dark:bg-gray-900">
        <PortfolioEmbed />
      </div>
      <CreativeDataTable
        data={data}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
}

export default App;
