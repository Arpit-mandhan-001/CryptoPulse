import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { setCurrency } from "../Utils/currencySlice";
import { selectuser, setlogoutuser } from "../Utils/userSlice";
import { auth } from "../firebase";

const Nav = ({ openmodal, closemodal, modal }) => {
  const options = [
    { value: "usd", label: "USD" },
    { value: "inr", label: "INR" },
  ];

  const dispatch = useDispatch();
  const user = useSelector(selectuser);

  const handleCurrencyChange = (e) => {
    dispatch(setCurrency(e.value));
  };

  const handleLogout = (e) => {
    try {
      auth.signOut();
      dispatch(setlogoutuser());
    } catch (error) {
      alert(error.message);
    }
  };

  // Custom styles for React-Select to make it beautiful
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#1f2937", // Dark gray
      border: "1px solid #87CEEB", // Skyblue border
      borderRadius: "0.375rem", // Rounded
      boxShadow: state.isFocused ? "0 0 0 2px rgba(135, 206, 235, 0.5)" : "none", // Glow on focus
      color: "#FAF0E6", // Light text
      cursor: "pointer",
      transition: "all 0.3s ease",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1f2937",
      border: "1px solid #87CEEB",
      borderRadius: "0.375rem",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#87CEEB" : state.isFocused ? "#374151" : "transparent",
      color: state.isSelected ? "#000" : "#FAF0E6",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FAF0E6",
    }),
  };

  return (
    <nav className="bg-gradient-to-r from-black to-black p-4 top-0 w-full sticky z-50  transition-all duration-300">
      <ul className="flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="text-xl lg:text-2xl font-bold text-[#87CEEB] hover:text-[#5ABDE3] transform hover:scale-105 transition-transform duration-300"
        >
          CryptoPulse
        </Link>
        <div className="flex items-center gap-4">
          <Select
            options={options}
            defaultValue={options[1]}
            onChange={handleCurrencyChange}
            styles={customSelectStyles}
            className="w-24 lg:w-32 text-sm lg:text-base"
          />
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:shadow-md transition-all duration-300 text-sm lg:text-base"
            >
              🚪 Logout
            </button>
          ) : (
            <button
              onClick={openmodal}
              className="flex items-center gap-2 px-4 py-2 bg-[#87CEEB] text-black rounded-md hover:bg-[#5ABDE3] hover:shadow-md transition-all duration-300 text-sm lg:text-base"
            >
              🔑 Login
            </button>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
