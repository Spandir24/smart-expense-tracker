import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <main className="max-w-6xl mx-auto px-6 py-8">
          <Dashboard />
          <Transactions setTransactions={setTransactions} />
        </main>
      </div>
    </>
  );
}

export default App;
