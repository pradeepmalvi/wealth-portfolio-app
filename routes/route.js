const express = require("express");
const {
  // auth
  userRegister,
  userLogin,
  // incomes CRUD
  getIncomeByUser,
  incomeAdd,
  incomeDelete,
  // expenses CRUD
  getExpenseByUser,
  expenseAdd,
  expenseDelete,
  // summary
  getSummaryReport
} = require("../controllers/controller");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/users/register").post(userRegister);
router.route("/users/login").post(userLogin);

// Income Routes
router.route("/income/all").post(authenticate, getIncomeByUser);
router.route("/income/add").post(authenticate, incomeAdd);
router.route("/income/delete/:incomeId").delete(authenticate, incomeDelete);

// Expense Routes
router.route("/expense/all").post(authenticate, getExpenseByUser);
router.route("/expense/add").post(authenticate, expenseAdd);
router.route("/expense/delete/:expenseId").delete(authenticate, expenseDelete);

// Summary Routes
router.route("/summary").post(authenticate, getSummaryReport);

module.exports = router;
