import "./header.css";
import { IoCaretBackOutline } from "react-icons/io5";

function PageHeader({ title, onBack, studentID, buttonText = "Back to dashboard" }) {
  return (
    <div className="page-header">
      <div className="page-header__info">
        <h1 className="page-header__title">{title}</h1>
        {studentID && (
          <p className="page-header__student-id">Student ID: {studentID}</p>
        )}
      </div>
      <button className="page-header__back-btn" onClick={onBack}>
        <span className="page-header__back-icon" aria-hidden="true"><IoCaretBackOutline/></span>
        {buttonText}
      </button>
    </div>
  );
}

export default PageHeader;