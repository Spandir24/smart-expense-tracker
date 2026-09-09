import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";
import { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  console.log(transactions);


  {/*CALCULATIONS- via normal JS variables*/}
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  const balance = totalIncome - totalExpenses;

  
  
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
