import React from "react";
import "./CoursCard.css";

function CourseCard({ isOpen, onClose, course_id }) {
    if (!isOpen) return null;

    return (
        <div className="popup-overlay2">
            <div className="popup-content2">

                <button
                    className="close-btn2"
                    onClick={onClose}
                >
                    ✕
                </button>

                {course_id.map((course) => (
                    <div key={course._id} className="course_card2">
                        <h3>{course.courseCode}</h3>
                        <p className="name3">{course.courseName}</p>
                        <div className="details_card3">
                            <p className="credits3">Credits: {course.credits}</p>
                            <p className="level3">{course.level}</p>
                            <p className="semester3">{course.semester}</p>
                        </div>  
                    </div>
                ))}

            </div>
        </div>
    );
}

export default CourseCard;