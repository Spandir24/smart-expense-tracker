import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";

function App() {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">

        <main className="max-w-6xl mx-auto px-6 py-8">
          <Dashboard />
          <Transactions />
        </main>
      </div> 
    </>
  );
}

export default App;
