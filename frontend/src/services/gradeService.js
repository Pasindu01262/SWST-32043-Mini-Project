import axios from 'axios';
   const API = 'http://localhost:5000/api/grades';

   export const getAllGrades = () => axios.get(API);
   export const addGrade = (data) => axios.post(API, data);
   export const updateGrade = (id, data) => axios.put(`${API}/${id}`, data);
   export const deleteGrade = (id) => axios.delete(`${API}/${id}`);
   export const getGradesByRegNo = (regNo) => axios.get(`${API}/my/${regNo}`);
