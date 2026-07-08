import React from "react";
import "./DashboardCard.css";


function DashboardCard({ icon: Icon, title, buttonText, onClick }) {
  return (
    <div className="dashboard-card">
      <div className="icon-container">
        <Icon className="card-icon" />
      </div>

      <h3>{title}</h3>

      <button onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );
}

export default DashboardCard;