import "./StudentProfileHeader.css";
import { useEffect, useState } from "react";

function StudentProfileHeader({ name, role, onLogout }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="student-profile-header">
      <div className="student-profile-header__identity">
        <div className="student-profile-header__avatar">{initial}</div>
        <div className="student-profile-header__text">
          <div className="student-profile-header__name">{name}</div>
          <div className="student-profile-header__role">{role}</div>
        </div>
      </div>

      <div className="student-profile-header__meta">
        <div className="student-profile-header__datetime">
          <span className="student-profile-header__date">
            {currentDate.toLocaleDateString(undefined, {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="student-profile-header__time">
            {currentDate.toLocaleTimeString(undefined, {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <button
          className="student-profile-header__logout-btn"
          onClick={onLogout}
        >
          <span aria-hidden="true">⏻</span>
          Logout
        </button>
      </div>
    </div>
  );
}

export default StudentProfileHeader;