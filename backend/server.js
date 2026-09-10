const express = require("express");
const mongoose = require("mongoose");

const app = express();
mongoose
  .connect(
    "mongodb+srv://pandirsana_db_user:DB_MongO24_AtLaS@smart-expense-cluster.vn0a7v7.mongodb.net/?appName=smart-expense-cluster",
  )
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

app.use(express.json());



app.get("/", (req, res) => {
  res.send("Backend is running!");
});


app.get("/api/transactions", (req, res) => {
  const transactions = [
    {
      title: "Salary",
      amount: 50000,
      type: "income",
    },
    {
      title: "Food",
      amount: 500,
      type: "expense",
    },
  ];

  res.json(transactions);
});

app.post("/api/transactions", (req, res) => {
  const newTransaction = req.body;

  console.log(newTransaction);

  res.json({
    message: "Transaction received",
    transaction: newTransaction,
  });
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
