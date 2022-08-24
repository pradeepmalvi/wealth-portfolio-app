const { User, Income, Expense } = require("../models/model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    let encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: encryptedPassword
    });

    res.json({
      status: true,
      message: "User registered successfully!",
      data: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.json({ status: false, message: "User already exist!" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      res.json({
        status: true,
        message: "Loggedin successfully!",
        data: {
          id: user._id,
          email: user.email,
          name: user.name,
          token: generateToken(user._id)
        }
      });
    } else {
      res.json({ status: false, message: "Invalid Password" });
    }
  } else {
    res.json({ status: false, message: "User not found!" });
  }
};

const getIncomeByUser = async (req, res) => {
  const user = req.user;
  const income = await Income.find({ user });

  if (income) {
    res.json({
      status: true,
      data: income
    });
  } else {
    res.json({ status: false, message: "Data not found!" });
  }
};

const incomeAdd = async (req, res) => {
  const { user, date, name, amount } = req.body;
  try {
    const income = await Income.create({
      user,
      name,
      amount,
      date
    });
    res.json({ status: true, data: income });
  } catch (error) {
    res.json({ status: false, message: "Something went wrong!" });
  }
};

const incomeDelete = async (req, res) => {
  try {
    const { incomeId } = req.params;
    const income = await Income.findById({ _id: incomeId });

    if (income) {
      await income.delete();
      res.json({ status: true, message: "Income removed" });
    } else {
      res.status(404);
      res.json({ status: false, message: "Income not found" });
    }
  } catch (error) {
    res.json({ status: false, message: "Something went wrong!" });
  }
};

const getExpenseByUser = async (req, res) => {
  const user = req.user;
  const expense = await Expense.find({ user });

  if (expense) {
    res.json({
      status: true,
      data: expense
    });
  } else {
    res.json({ status: false, message: "Data not found!" });
  }
};

const expenseAdd = async (req, res) => {
  const { user, name, amount, date } = req.body;
  try {
    const expense = await Expense.create({
      user,
      name,
      amount,
      date
    });
    res.json({ status: true, data: expense });
  } catch (error) {
    res.json({ status: false, message: "Something went wrong!" });
  }
};

const expenseDelete = async (req, res) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById({ _id: expenseId });

    if (expense) {
      await expense.delete();
      res.json({ status: true, message: "Expense removed" });
    } else {
      res.status(404);
      res.json({ status: false, message: "Expense not found" });
    }
  } catch (error) {
    res.json({ status: false, message: "Something went wrong!" });
  }
};

const getSummaryReport = async (req, res) => {
  const user = req.user;

  const defaultStartDate = new Date(new Date().getFullYear(), 0, 1);
  const defaultEndDate = new Date(new Date().getFullYear(), 11, 31);

  const { startDate, endDate } = req.body;

  const expense = await Expense.find({
    user,
    date: {
      $gte: startDate || defaultStartDate.toISOString(),
      $lte: endDate || defaultEndDate.toISOString()
    }
  });

  const income = await Income.find({
    user,
    date: {
      $gte: startDate || defaultStartDate.toISOString(),
      $lte: endDate || defaultEndDate.toISOString()
    }
  });

  const incomeTotal =
    income.length > 0
      ? income.map(i => i.amount).reduce((sum, amount) => (sum = sum + amount))
      : 0;
  const expenseTotal =
    expense.length > 0
      ? expense.map(i => i.amount).reduce((sum, amount) => (sum = sum + amount))
      : 0;
  const balance = incomeTotal - expenseTotal;

  if (expense) {
    res.json({
      status: true,
      balance,
      incomeTotal,
      expenseTotal,
      income,
      expense
    });
  } else {
    res.json({ status: false, message: "Data not found!" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  getIncomeByUser,
  incomeAdd,
  incomeDelete,
  getExpenseByUser,
  expenseAdd,
  expenseDelete,
  getSummaryReport
};
