import React from "react";
import { useNavigate } from "react-router-dom";
import "./buttonspage.css";

const LoginChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to MineSafe</h1>
      <button onClick={() => navigate("/workerlogin")}>Login as Worker</button>
      <button onClick={() => navigate("/managerlogin")}>Login as Manager</button>
    </div>
  );
};

export default LoginChoice;
