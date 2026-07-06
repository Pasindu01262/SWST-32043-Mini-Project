import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/header';
import './BatchRegistration.css';

const initialFormState = {
    batch: '',
    academicYear: '',
    currentYearLevel: '',
    currentSemester: '',
    registrationOpen: false
};

const BatchRegistration = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [batches, setBatches] = useState([]);
    const [isLoadingBatches, setIsLoadingBatches] = useState(true);
    const [editingBatch, setEditingBatch] = useState(null); // holds the batch number currently being edited, or null

    const fetchBatches = async () => {
        setIsLoadingBatches(true);
        try {
            const res = await axios.get('http://localhost:5000/api/batch/getalldetails');
            setBatches(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load batch details.');
        } finally {
            setIsLoadingBatches(false);
        }
    };

    useEffect(() => {
        fetchBatches();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleToggle = () => {
        setFormData({ ...formData, registrationOpen: !formData.registrationOpen });
    };

    const handleEditClick = (batchItem) => {
        setEditingBatch(batchItem.batch);
        setFormData({
            batch: batchItem.batch,
            academicYear: batchItem.academicYear,
            currentYearLevel: batchItem.currentYearLevel,
            currentSemester: batchItem.currentSemester,
            registrationOpen: batchItem.registrationOpen
        });
        setError('');
        setSuccess('');
    };

    const handleCancelEdit = () => {
        setEditingBatch(null);
        setFormData(initialFormState);
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        const payload = {
            ...formData,
            batch: Number(formData.batch)
        };

        try {
            if (editingBatch !== null) {
                // Update existing batch
                await axios.put(`http://localhost:5000/api/batch/updateBatch/${editingBatch}`, payload);
                setSuccess('Batch progress updated successfully!');
                setEditingBatch(null);
            } else {
                // Create new batch
                await axios.post('http://localhost:5000/api/batch/register', payload);
                setSuccess('Batch progress created successfully!');
            }

            setFormData(initialFormState);
            fetchBatches(); // refresh the list after create/update
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred while saving batch progress.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="batch-container">
            
            <div className="batch-box">
                <h2>{editingBatch !== null ? `Edit Batch ${editingBatch}` : 'Add Batch Progress'}</h2>

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
                            disabled={editingBatch !== null} // batch is the lookup key, don't let it change mid-edit
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

                    <div className="batch-form-actions">
                        <button type="submit" className="batch-submit-btn" disabled={isSubmitting}>
                            {isSubmitting
                                ? 'Saving...'
                                : editingBatch !== null
                                ? 'Update Batch Progress'
                                : 'Save Batch Progress'}
                        </button>

                        {editingBatch !== null && (
                            <button
                                type="button"
                                className="batch-cancel-btn"
                                onClick={handleCancelEdit}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="batch-box batch-list-box">
                <h2>All Batches</h2>

                {isLoadingBatches ? (
                    <p className="batch-loading">Loading batches...</p>
                ) : batches.length === 0 ? (
                    <p className="batch-loading">No batch records found.</p>
                ) : (
                    <table className="batch-table">
                        <thead>
                            <tr>
                                <th>Batch</th>
                                <th>Academic Year</th>
                                <th>Year Level</th>
                                <th>Semester</th>
                                <th>Reg. Open</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.map((b) => (
                                <tr key={b._id || b.batch}>
                                    <td>{b.batch}</td>
                                    <td>{b.academicYear}</td>
                                    <td>{b.currentYearLevel}</td>
                                    <td>{b.currentSemester}</td>
                                    <td>
                                        <span
                                            className={`batch-status-pill ${
                                                b.registrationOpen ? 'batch-status-pill--open' : ''
                                            }`}
                                        >
                                            {b.registrationOpen ? 'Open' : 'Closed'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="batch-edit-btn"
                                            onClick={() => handleEditClick(b)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default BatchRegistration;