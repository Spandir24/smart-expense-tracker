import { useState } from "react";

function Transactions({ transactions, setTransactions }) {
  //from App.jsx,that function now arrives as a prop.

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();        { /* to handle browser's default page re-load behaviour*/ }


    {/* building t/c object: combining all the req React states*/}
    const newTransaction = {    
      title,
      amount,
      type,
    };

    {/* modifying the t/c state variable */}
    setTransactions((prevTransactions) => [            
      ...prevTransactions,
      newTransaction,
    ]);

    {
      /* To reset the form, we simply change those states back to their initial values. */
    }
    setTitle("");
    setAmount("");
    setType("income");

  };

  
  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Transactions</h2>
      </div>

      <div className="bg-white p-6 border rounded-xl shadow-sm">

        <form onSubmit={handleSubmit}>
          <div>
            <label>Title </label>
            <input
              type="text"
              placeholder=" e.g. Salary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label>Amount </label>
            <input
              type="number" // but the value we receive (here as input) is initially treated as a string
              placeholder=" Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label>Type </label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <br></br>

          <button type="submit">Add Transaction</button>
        </form>

        <div className="mt-6">
          {transactions.map((transaction, index) => (
            <div key={index}>
              <p>{transaction.title}</p>
              <p>₹{transaction.amount}</p>
              <p>{transaction.type}</p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}

export default Transactions;
