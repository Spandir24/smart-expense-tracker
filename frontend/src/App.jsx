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
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <main className="max-w-6xl mx-auto px-6 py-8">
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
    </>
  );
}

export default App;
