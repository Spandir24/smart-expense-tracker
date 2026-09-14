import { useState } from "react";

function Transactions({ transactions, setTransactions }) {
  //from App.jsx,that function now arrives as a prop.

  console.log(transactions);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !amount || Number(amount) <= 0) {
      alert("Please enter a valid title and amount");
      return;
    }

    const transactionData = {
      title,
      amount: Number(amount),
      type,
    };

    try {
      let response;

      if (editingIndex !== null) {
        const transactionToEdit = transactions[editingIndex];

        response = await fetch(
          `http://localhost:5000/api/transactions/${transactionToEdit._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transactionData),
          },
        );
      } else {
        response = await fetch("http://localhost:5000/api/transactions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        });
      }

      const savedTransaction = await response.json();

      if (!response.ok) {
        throw new Error(
          savedTransaction.message || "Transaction request failed",
        );
      }

      if (editingIndex !== null) {
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction, index) =>
            index === editingIndex ? savedTransaction : transaction,
          ),
        );
      } else {
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          savedTransaction,
        ]);
      }

      setTitle("");
      setAmount("");
      setType("");
      setEditingIndex(null);
    } catch (error) {
      console.log("Error saving transaction:", error);
    }
  };

  //   {/* modifying the t/c state variable to add a new t/c */}
  //   if (editingIndex !== null) {
  //     setTransactions((prevTransactions) =>
  //       prevTransactions.map((transaction, index) =>
  //         index === editingIndex ? newTransaction : transaction,
  //       ),
  //     );
  //   } else {
  //     setTransactions((prevTransactions) => [
  //       ...prevTransactions,
  //       newTransaction,
  //     ]);
  //   }

  //   {
  //     /* To reset the form, we simply change those states back to their initial values. */
  //   }
  //   setTitle("");
  //   setAmount("");
  //   setType("");
  //   setEditingIndex(null);
  // };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/transactions/${id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete transaction");
      }

      setTransactions((prevTransactions) =>
        prevTransactions.filter((transaction) => transaction._id !== id),
      );
    } catch (error) {
      console.log("Error deleting transaction:", error);
    }
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
            {/* Title input */}
            <label>Title </label>
            <input
              type="text"
              placeholder=" e.g. Salary"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Amount input */}
          <div>
            <label>Amount </label>
            <input
              type="number" // but the value we receive (here as input) is initially treated as a string
              placeholder=" Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Type input */}
          <div>
            <label>Type </label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <br></br>

          {/* Submit button */}
          <button type="submit">
            {" "}
            {editingIndex !== null ? "Update Transaction" : "Add Transaction"}
          </button>

          {/* Cancel button */}
          {editingIndex !== null && (
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setAmount("");
                setType("income");
                setEditingIndex(null);
              }}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <input
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mt-6" style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("Income")}>Income</button>
          <button onClick={() => setFilter("Expense")}>Expense</button>
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

                <button onClick={() => handleDelete(transaction._id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Transactions;
