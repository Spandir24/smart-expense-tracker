import { useState } from "react";

function Transactions({ transactions, setTransactions }) {
  //from App.jsx,that function now arrives as a prop.

  console.log(transactions);


  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [editingIndex, setEditingIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");


  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.type === filter;

    const matchesSearch = transaction.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    {
      /* to handle browser's default page re-load behaviour*/
    }

    {
      /* building t/c object: combining all the req React states*/
    }
    const newTransaction = {
      title,
      amount,
      type,
    };

    {
      /* modifying the t/c state variable to add a new t/c */
    }
    if (editingIndex !== null) {
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction, index) =>
          index === editingIndex ? newTransaction : transaction,
        ),
      );
    } else {
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    }

    {
      /* To reset the form, we simply change those states back to their initial values. */
    }
    setTitle("");
    setAmount("");
    setType("income");
    setEditingIndex(null);
  };


  const handleDelete = (indexToDelete) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction, index) => index !== indexToDelete),
    );
  };


  const handleEdit = (indexToEdit) => {
    const transactionToEdit = transactions[indexToEdit];

    setTitle(transactionToEdit.title);
    setAmount(transactionToEdit.amount);
    setType(transactionToEdit.type);

    setEditingIndex(indexToEdit);
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

          <button type="submit">
            {editingIndex !== null ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>

        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />


        <div className="mt-6" style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("income")}>Income</button>
          <button onClick={() => setFilter("expense")}>Expense</button>
        </div>

        <div className="mt-6">
          {transactions.length === 0 ? (
            <p>No transactions yet.</p>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <div key={index}>
                <p>{transaction.title}</p>
                <p>₹{transaction.amount}</p>
                <p>{transaction.type}</p>

                {/*Button functionality */}
                <button onClick={() => handleEdit(index)}>Edit</button>

                <br></br>

                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Transactions;
