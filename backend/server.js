const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");

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


app.get("/api/transactions", async (req, res) => {
  try {
    const transactions = await Transaction.find();

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
    });
  }
});


app.post("/api/transactions", async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);

    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create transaction",
      error: error.message,
    });
  }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
