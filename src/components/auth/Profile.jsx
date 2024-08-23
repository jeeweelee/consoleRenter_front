import React, { useEffect, useState } from "react";
import { deleteUser, getUser } from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId, token]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      try {
        const response = await deleteUser(userId, token);
        setMessage(response.data);
        localStorage.clear();
        navigate("/");
        window.location.reload();
      } catch (error) {
        setErrorMessage(error.response?.data || "An error occurred.");
      }
    }
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-success">{message}</p>}
      <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
        <h4 className="card-title text-center">User Information</h4>
        <div className="card-body">
          <div className="card-text">
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <button className="btn btn-danger" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
