import React from "react";
import { Link } from "react-router-dom";

const Logout = ({ setIsLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    setIsLoggedIn(false); // Update the state in NavBar to reflect the logged-out status
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <li>
      <Link className="dropdown-item" to="#" onClick={handleLogout}>
        Logout
      </Link>
    </li>
  );
};

export default Logout;
