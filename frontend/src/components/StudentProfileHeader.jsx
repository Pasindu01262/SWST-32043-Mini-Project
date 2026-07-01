import "./StudentProfileHeader.css";
import { useEffect, useState } from "react";
  
function StudentProfileHeader({name,role}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="page-header">
      <div className ="right_side">
        <div className="date">{currentDate.toLocaleDateString()}</div>
        <div className="profile_name">{name}</div>
        <div className="role">{role}</div>
      </div>
      <div className="left_side">logout</div>
    </div>
  );
}

export default StudentProfileHeader;