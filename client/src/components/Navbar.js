import React, { useState, useEffect } from "react";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";

export default function Navbar() {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [userAccess, setUserAccess] = useState(false);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("wealth_user"));
    if (userDetails) {
      setUserAccess(userDetails);
    }
  }, []);

  const onLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <nav class="bg-teal-500 text-gray-800 fixed top-0 left-0 right-0 w-full flex flex-wrap items-center justify-between px-3 py-2 font-bold shadow-lg navbar navbar-expand-lg navbar-light">
        <span className="uppercase">Wealth App</span>
        <span>
          {userAccess ? (
            <>
              <span className="mr-5">
                Welcome back!,{" "}
                <span className="uppercase"> {userAccess.name}</span>
              </span>
              <button
                type="submit"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2"
                onClick={onLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="submit"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2"
                onClick={() => setLoginModal(true)}
              >
                Login
              </button>
              <button
                type="submit"
                class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2 ml-3"
                onClick={() => setRegisterModal(true)}
              >
                Register
              </button>
            </>
          )}
        </span>
      </nav>
      <LoginModal
        modalIsOpen={loginModal}
        onClose={() => setLoginModal(false)}
      />
      <RegisterModal
        modalIsOpen={registerModal}
        onClose={() => setRegisterModal(false)}
      />
    </>
  );
}
