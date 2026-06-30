import "./header.css";

function PageHeader({ title, onBack }) {
  return (
    <div className="page-header">
      <h1 className="page-header__title">{title}</h1>
      <button className="page-header__back-btn" onClick={onBack}>
        Back to dashboard
      </button>
    </div>
  );
}

export default PageHeader;