function Dashboard({ totalIncome, totalExpenses, balance }) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Balance</h3>

          <p className="text-3xl font-bold text-gray-900 mt-3">₹{balance}</p>

          <p className="text-sm text-gray-500 mt-2">Your current balance</p>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Income</h3>

          <p className="text-3xl font-bold text-green-600 mt-3">
            ₹{totalIncome}
          </p>

          <p className="text-sm text-gray-500 mt-2">Total money received</p>
        </div>

        <div className="bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Expenses</h3>

          <p className="text-3xl font-bold text-red-600 mt-3">
            ₹{totalExpenses}
          </p>

          <p className="text-sm text-gray-500 mt-2">Total money spent</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
