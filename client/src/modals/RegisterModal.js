import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Loader from "../components/Loader";

const customStyles = {
  content: {
    width: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export default function RegisterModal({ modalIsOpen, onClose }) {
  const [values, setValues] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onInputChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

    error && setError(false);
  };
  const onSubmit = e => {
    e.preventDefault();

    const { name, email, password, cpassword } = values;

    if (password.length <= 5) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (password !== cpassword) {
      setError("Password should be same!");
      return false;
    }

    setLoading(true);

    const data = {
      name,
      email,
      password
    };

    try {
      axios.post(`http://localhost:5000/api/users/register`, data).then(res => {
        setLoading(false);
        console.log("data", res.data);
        if (res.data.status) {
          onClose();
          localStorage.setItem("wealth_user", JSON.stringify(res.data.data));
          window.location.reload();
        } else {
          setError(res.data.message);
        }
      });
    } catch (error) {
      // console.log("data", error.response);
      setLoading(false);
    }
  };

  function closeModal() {
    setValues({});
    onClose();
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="flex justify-between mb-5">
            <h5 class="text-2xl mb-2 font-bold tracking-tight text-gray-900">
              Register
            </h5>
            <button className="text-black-100" onClick={closeModal}>
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={onSubmit}>
            <div>
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
                id="name"
                placeholder={`Enter name`}
                value={values.name}
                name="name"
                onChange={onInputChange}
                required
              />
              <input
                type="email"
                className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
                id="email"
                placeholder={`Enter email`}
                value={values.email}
                name="email"
                onChange={onInputChange}
                required
              />
              <input
                type="password"
                className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
                id="password"
                placeholder="Enter password"
                value={values.password}
                name="password"
                onChange={onInputChange}
                required
              />
              <input
                type="password"
                className="form-control block w-full px-3 py-1.5 mb-3 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-900 focus:outline-none"
                id="cpassword"
                placeholder="Enter confirm password"
                value={values.cpassword}
                name="cpassword"
                onChange={onInputChange}
                required
              />

              {loading ? (
                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-10 py-3 mb-2">
                  <Loader width={"w-4"} />
                </button>
              ) : (
                <button
                  type="submit"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2 mb-2"
                >
                  {loading ? <Loader width={"w-4"} /> : "Submit"}
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
        </div>
      </Modal>
    </div>
  );
}
