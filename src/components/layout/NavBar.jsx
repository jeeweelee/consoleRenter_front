import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top w-100">
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
          <span className="store-color">Jia's Console Renter</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/browse-consoles"}>
                Browse all consoles
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                Admin
              </NavLink>
            </li>
          </ul>

          <ul className="d-flex navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to={"/find-renting"}>
                Find My Renting
              </NavLink>
            </li>


          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
