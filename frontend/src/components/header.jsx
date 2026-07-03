import "./header.css";

function PageHeader({ title, onBack, StudentID,buttonText = "Back to dashboard" }) {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      {StudentID && (
        <p className="page-header__student-id">Student ID: {StudentID}</p>
      )}
      <button className="page-header__back-btn" onClick={onBack}>
        {buttonText}
      </button>
    </div>
  );
}

export default PageHeader;