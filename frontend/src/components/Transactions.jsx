function Transactions() {
  return (
    <section className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Transactions</h2>

        <button className="bg-gray-900 text-white px-4 py-2 rounded-lg">
          Add Transaction
        </button>
      </div>

      <div className="bg-white p-6 border rounded-xl shadow-sm">
        <form>
          <div>
            <label>Title</label>
            <input type="text" placeholder=" e.g. Salary" />
          </div>

          <div>
            <label>Amount</label>
            <input type="number" placeholder="Enter amount" />
          </div>

          <div>
            <label>Type</label>
            <select>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <button type="submit">Add Transaction</button>
        </form>
      </div>
    </section>
  );
}

export default Transactions;
