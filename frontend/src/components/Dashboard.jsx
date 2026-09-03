function Dashboard() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Balance</h3>
          <p className="text-2xl font-bold mt-2">₹0</p>
        </div>

        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Income</h3>
          <p className="text-2xl font-bold mt-2">₹0</p>
        </div>

        <div className="bg-white p-6 border rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm">Expenses</h3>
          <p className="text-2xl font-bold mt-2">₹0</p>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
