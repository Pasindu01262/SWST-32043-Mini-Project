import React from "react";
import "./successRegister.css";
import { FiCheckCircle } from "react-icons/fi";

function SuccessCard({ isOpen, onClose, enrolledCourses, msg }) {
    if (!isOpen) return null;

    return (
        <div className="success-popup-overlay">
            <div className="success-popup-content">

                <button
                    className="success-close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="success-icon">
                    <FiCheckCircle />
                </div>

                <p className="success">{msg}</p>

                {enrolledCourses && enrolledCourses.length > 0 && (
                    <div className="success-course-list">
                        {enrolledCourses.map((course) => (
                            <div key={course._id} className="course_card2">
                                <div className="details_card2">
                                    <p className="credits2">{course.courseCode}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SuccessCard;