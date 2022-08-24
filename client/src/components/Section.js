import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import AddIncomeModal from "../modals/AddIncomeModal";
import AddExpenseModal from "../modals/AddExpenseModal";
import moment from "moment";
import DatePopover from "./DatePopover";

export default function Section() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [incomeModal, setIncomeModal] = useState(false);
  const [expenseModal, setExpenseModal] = useState(false);
  const [userAccess, setUserAccess] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(new Date().getFullYear(), 0, 1),
    endDate: new Date(new Date().getFullYear(), 11, 31)
  });

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("wealth_user"));
    if (userDetails) {
      setUserAccess(userDetails);
    }

    getSummary(userDetails);
  }, []);

  useEffect(() => {
    getSummary();
  }, [dates]);

  const getSummary = async userDetails => {
    const user = userAccess || userDetails;
    setLoading(true);

    try {
      const headers = {
        Authorization: `Bearer ${user.token}`
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/summary",
        dates,
        {
          headers
        }
      );
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const remove = async (id, type) => {
    const user = userAccess;
    const headers = {
      Authorization: `Bearer ${user.token}`
    };
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/${type}/delete/${id}`, {
        headers
      });
      setLoading(false);
      getSummary();
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onSelectDate = dates => {
    const startDate = new Date(dates.startDate);
    const endDate = new Date(dates.endDate);
    const date = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    getSummary(userAccess, date);
    setDates(date);
  };

  return (
    <>
      <>
        <div className="bg-gray-200 px-10 py-10 flex justify-between">
          <>
            <DatePopover
              dates={dates}
              onSelectDate={onSelectDate}
              isPopoverOpen={isPopoverOpen}
              setIsPopoverOpen={(value, dates) =>
                setIsPopoverOpen(value, dates)
              }
            />
          </>
          <div className="bg-gray-200 flex justify-between items-start">
            <a class="block px-10 text-center ml-5 py-2 max-w-sm bg-white rounded-sm border border-white-200 shadow-sm">
              <h5 class="text-2xl font-bold tracking-tight text-gray-900">
                &#8377; {data?.balance}
              </h5>
              <p class="font-normal text-gray-400">Balance</p>
            </a>
            <a class="block px-10 text-center ml-5 py-2 max-w-sm bg-white rounded-sm border border-white-200 shadow-sm">
              <h5 class="text-2xl font-bold tracking-tight text-green-500">
                &#8377; {data?.incomeTotal}
              </h5>
              <p class="font-normal text-gray-400">Income</p>
            </a>
            <a class="block px-10 text-center ml-5 py-2 max-w-sm bg-white rounded-sm border border-white-200 shadow-sm">
              <h5 class="text-2xl font-bold tracking-tight text-red-500">
                &#8377; {data?.expenseTotal}
              </h5>
              <p class="font-normal text-gray-400">Expenses</p>
            </a>
          </div>
        </div>

        {loading ? (
          <div className="bg-gray-200 px-10 py-10 flex justify-center min-h-[60vh]">
            <Loader width={"w-10"} />
          </div>
        ) : (
          <div className="bg-gray-200 px-10 flex min-h-[60vh]">
            <div className="w-full mr-5">
              <div className="flex justify-between">
                <h5 class="text-2xl mb-2 font-bold tracking-tight text-gray-900">
                  Income
                </h5>
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 mb-2"
                  onClick={() => setIncomeModal(true)}
                >
                  Add Income
                </button>
              </div>

              <ul className="text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200 bg-white-700">
                {data?.income?.length > 0 ? (
                  data?.income.map((income, key) => (
                    <li
                      key={key}
                      className="py-2 px-4 w-full rounded-t-lg border-b border-white-200 flex justify-between"
                    >
                      <div className="flex">
                        <div className="mr-5 text-gray-500 min-w-[100px]">
                          {moment(income.date).format("DD MMM YYYY")}
                        </div>
                        |
                        <span className="uppercase font-bold ml-10">
                          {income.name}
                        </span>
                      </div>
                      <span>
                        <span className="text-green-500 font-bold mr-10">
                          &#8377; {income.amount}
                        </span>
                        <i
                          class="fas fa-times"
                          onClick={() => remove(income._id, "income")}
                        ></i>
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="py-2 px-4 w-full uppercase rounded-t-lg border-b border-white-200 flex justify-between">
                    No Data Available
                  </li>
                )}
              </ul>
            </div>
            <div className="w-full ml-5">
              <div className="flex justify-between">
                <h5 class="text-2xl mb-2 font-bold tracking-tight text-gray-900">
                  Expenses
                </h5>
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 mb-2"
                  onClick={() => setExpenseModal(true)}
                >
                  Add Expense
                </button>
              </div>

              <ul className="text-sm font-medium text-gray-900 bg-white rounded-sm border border-gray-200 bg-white-700">
                {data?.expense?.length > 0 ? (
                  data?.expense.map((expense, key) => (
                    <li
                      key={key}
                      className="py-2 px-4 w-full rounded-t-lg border-b border-white-200 flex justify-between"
                    >
                      <div className="flex">
                        <div className="mr-5 text-gray-500 min-w-[100px]">
                          {moment(expense.date).format("DD MMM YYYY")}
                        </div>
                        |
                        <span className="uppercase font-bold ml-10">
                          {expense.name}
                        </span>
                      </div>
                      <span>
                        <span className="text-red-500 font-bold mr-10">
                          &#8377; {expense.amount}
                        </span>
                        <i
                          class="fas fa-times"
                          onClick={() => remove(expense._id, "expense")}
                        ></i>
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="py-2 px-4 w-full uppercase rounded-t-lg border-b border-white-200 flex justify-between">
                    No Data Available
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
        <AddIncomeModal
          modalIsOpen={incomeModal}
          onClose={() => setIncomeModal(false)}
          getSummary={getSummary}
        />
        <AddExpenseModal
          modalIsOpen={expenseModal}
          onClose={() => setExpenseModal(false)}
          getSummary={getSummary}
        />
      </>
    </>
  );
}
