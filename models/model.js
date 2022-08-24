const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const IncomeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User"
    },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true }
  },
  { timestamps: true }
);

const ExpenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User"
    },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true }
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
const Income = mongoose.model("Income", IncomeSchema);
const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = {
  User,
  Income,
  Expense
};
