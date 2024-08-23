import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import AddConsole from "./components/console/AddConsole";
import ExistingConsoles from "./components/console/ExistingConsoles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditConsole from "./components/console/EditConsole";
import Home from "./components/home/Home";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";
import ConsoleListing from "./components/console/ConsoleListing";
import Admin from "./components/admin/Admin";
import Checkout from "./components/renting/Checkout";
import RentingSuccess from "./components/renting/RentingSuccess";
import Renting from "./components/renting/Renting";
import FindRenting from "./components/renting/FindRenting";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import RequireAuth from "./components/auth/RequireAuth";
import { AuthProvider } from "./components/auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* Wrap Router with AuthProvider */}
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-console/:consoleId" element={<EditConsole />} />
          <Route path="/existing-consoles" element={<ExistingConsoles />} />
          <Route path="/add-console" element={<AddConsole />} />
          <Route path="/rent-console/:consoleId" element={<Checkout />} />
          <Route path="/browse-consoles" element={<ConsoleListing />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <Admin />
              </RequireAuth>
            }
          />
          <Route path="/renting-success" element={<RentingSuccess />} />
          <Route path="/existing-renting" element={<Renting />} />
          <Route path="/find-renting" element={<FindRenting />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
      <Footer />
    </AuthProvider>
  );
}

export default App;
