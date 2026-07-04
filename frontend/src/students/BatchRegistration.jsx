import React, { useState } from 'react';
import axios from 'axios';
import './BatchRegistration.css';

const BatchRegistration = () => {
    const [formData, setFormData] = useState({
        batch: '',
        academicYear: '',
        currentYearLevel: '',
        currentSemester: '',
        registrationOpen: false
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggle = () => {
        setFormData({ ...formData, registrationOpen: !formData.registrationOpen });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        try {
            const payload = {
                ...formData,
                batch: Number(formData.batch)
            };

            await axios.post('http://localhost:5000/api/batch/register', payload);

            setSuccess('Batch progress created successfully!');
            setFormData({
                batch: '',
                academicYear: '',
                currentYearLevel: '',
                currentSemester: '',
                registrationOpen: false
            });
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while saving batch progress.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="batch-container">
            <div className="batch-box">
                <h2>Add Batch Progress</h2>

                {error && <p className="batch-message batch-message--error">{error}</p>}
                {success && <p className="batch-message batch-message--success">{success}</p>}

                <form onSubmit={handleSubmit} className="batch-form">
                    <div className="form-group">
                        <label>Batch</label>
                        <input
                            type="number"
                            name="batch"
                            value={formData.batch}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 2023"
                        />
                    </div>

                    <div className="form-group">
                        <label>Academic Year</label>
                        <input
                            type="text"
                            name="academicYear"
                            value={formData.academicYear}
                            onChange={handleChange}
                            required
                            placeholder="e.g. 2025/2026"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Current Year Level</label>
                            <input
                                type="text"
                                name="currentYearLevel"
                                value={formData.currentYearLevel}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Year 2"
                            />
                        </div>

                        <div className="form-group">
                            <label>Current Semester</label>
                            <input
                                type="text"
                                name="currentSemester"
                                value={formData.currentSemester}
                                onChange={handleChange}
                                required
                                placeholder="e.g. Semester 1"
                            />
                        </div>
                    </div>

                    <div className="form-group form-group--toggle">
                        <label>Registration Open</label>
                        <button
                            type="button"
                            className={`toggle-switch ${formData.registrationOpen ? 'toggle-switch--on' : ''}`}
                            onClick={handleToggle}
                            aria-pressed={formData.registrationOpen}
                        >
                            <span className="toggle-switch__knob" />
                        </button>
                    </div>

                    <button type="submit" className="batch-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save Batch Progress'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BatchRegistration;