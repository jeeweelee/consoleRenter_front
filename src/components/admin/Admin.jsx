import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="container mt-5 ">
      <h2 className="container mb-4">Welcome to the Admin Panel</h2>
      <hr></hr>
      <Link to={"/existing-consoles"}>Manage Consoles</Link>
      <Link to={"/existing-renting"}>Manage Renting</Link>
    </section>
  );
};

export default Admin;
