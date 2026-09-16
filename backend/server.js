require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("./models/Transaction");
const app = express();

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://smart-expense-tracker-frontend-gg4k.onrender.com",
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS",
  );

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  next();
});

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

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
      error: error.message,
    });
  }
});

app.post("/api/transactions", async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);

    res.status(201).json(newTransaction);
  } catch (error) {
    console.log("Create transaction error:", error.message);

    res.status(400).json({
      message: "Failed to create transaction",
      error: error.message,
    });
  }
});

app.delete("/api/transactions/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json({
      message: "Transaction deleted successfully",
      transaction: deletedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete transaction",
      error: error.message,
    });
  }
});

app.patch("/api/transactions/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedTransaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(updatedTransaction);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update transaction",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
