import React from "react";
import "./CoursCard.css";

function CourseCard({ isOpen, onClose, course_id }) {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">

                <button
                    className="close-btn"
                    onClick={onClose}
                >
                    ✕
                </button>

                {course_id.map((course) => (
                    <div key={course._id} className="course_card2">
                        <h3>{course.courseCode}</h3>
                        <p className="name2">{course.courseName}</p>
                        <div className="details_card2">
                            <p className="credits2">Credits: {course.credits}</p>
                            <p className="level2">{course.level}</p>
                            <p className="semester2">{course.semester}</p>
                        </div>  
                    </div>
                ))}

            </div>
        </div>
    );
}

export default CourseCard;