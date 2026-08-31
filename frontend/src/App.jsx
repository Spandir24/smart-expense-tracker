import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <Dashboard />
        <Transactions />
      </main>
    </>
  );
}

export default App;
