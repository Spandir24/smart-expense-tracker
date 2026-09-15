import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import { useEffect, useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(transactions);


  {/*CALCULATIONS- via normal JS variables*/}
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpenses;


  useEffect(() => {
    fetch("http://localhost:5000/api/transactions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }

        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.log("Error fetching transactions:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <p>Loading transactions...</p>;
  }

  
  
  return (
    <div className="min-h-screen bg-slate-50">
      {/* App name stays outside the main content box */}
      <Navbar />

      {/* Main content box */}
      <main className="mx-auto mt-8 max-w-6xl rounded-2xl bg-white px-8 py-10 shadow-sm md:px-12 md:py-14">
        <Dashboard
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
        />

        <Transactions
          transactions={transactions}
          setTransactions={setTransactions}
        />
      </main>
    </div>
  );
}

export default App;
