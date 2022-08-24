import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./Loader";

export default function InputForm({ type, onClose, getSummary }) {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userAccess, setUserAccess] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("wealth_user"));
    if (userDetails) {
      setUserAccess(userDetails);
    }
  }, []);

  const onInputChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

    error && setError(false);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!parseInt(values.amount)) {
      setError("Please enter valid amount!");
      return false;
    }

    setLoading(true);

    const user = userAccess;
    const headers = {
      Authorization: `Bearer ${user.token}`
    };

    const dateString = new Date(values.date);
    const data = {
      user: userAccess.id,
      name: values.name,
      date: dateString.toISOString(),
      amount: parseInt(values.amount)
    };

    try {
      axios
        .post(`http://localhost:5000/api/${type}/add`, data, { headers })
        .then(res => {
          setLoading(false);
          getSummary();
          onClose();
        });
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="date"
          className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
          id="date"
          placeholder={`Enter ${type}`}
          value={values.date}
          name="date"
          onChange={onInputChange}
          required
        />
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
          id="name"
          placeholder={`Enter ${type}`}
          value={values.name}
          name="name"
          onChange={onInputChange}
          required
        />
        <input
          type="text"
          className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
          id="amount"
          placeholder="Enter amount"
          value={values.amount}
          name="amount"
          onChange={onInputChange}
          required
        />
        {loading ? (
          <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-8 py-3 mb-2">
            <Loader width={"w-4"} />
          </button>
        ) : (
          <button
            type="submit"
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2 mb-2"
          >
            {loading ? <Loader width={"w-4"} /> : "Add"}
          </button>
        )}
      </div>
      {error && (
        <div
          class="p-3 text-sm bg-red-200 text-red-700 rounded mt-3 transition duration-150 ease-in-out"
          role="alert"
        >
          {error}
        </div>
      )}
    </form>
  );
}
