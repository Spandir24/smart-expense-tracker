import { useState } from "react";

function Transactions({ transactions, setTransactions }) {
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

    console.log("Transaction data:", transactionData);

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
      setType("income");
      setEditingIndex(null);
    } catch (error) {
      console.log("Error saving transaction:", error);
      alert(error.message);
    }
  };

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

  const cancelEdit = () => {
    setTitle("");
    setAmount("");
    setType("income");
    setEditingIndex(null);
  };

  return (
    <section className="mt-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Transactions</h2>

        <p className="mt-1 text-sm text-gray-500">
          Add and manage your income and expenses.
        </p>
      </div>

      {/* Transaction form */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-lg font-semibold text-gray-900">
          {editingIndex !== null ? "Edit Transaction" : "Add New Transaction"}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Title
              </label>

              <input
                type="text"
                placeholder="e.g. Salary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Amount
              </label>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              {editingIndex !== null ? "Update Transaction" : "Add Transaction"}
            </button>

            {editingIndex !== null && (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Search and filters */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "income"
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Income
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === "expense"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Expense
          </button>
        </div>
      </div>

      {/* Transaction list */}
      <div className="mt-6 space-y-3">
        {transactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="font-medium text-gray-700">No transactions yet.</p>

            <p className="mt-1 text-sm text-gray-500">
              Add your first transaction using the form above.
            </p>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center">
            <p className="font-medium text-gray-700">
              No matching transactions found.
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          filteredTransactions.map((transaction) => {
            const originalIndex = transactions.findIndex(
              (item) => item._id === transaction._id,
            );

            return (
              <div
                key={transaction._id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-semibold text-gray-900">
                    {transaction.title}
                  </p>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                      transaction.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}₹
                    {transaction.amount}
                  </p>

                  <button
                    onClick={() => handleEdit(originalIndex)}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}

export default Transactions;
