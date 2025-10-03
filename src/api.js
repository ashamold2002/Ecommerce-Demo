import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE || 'REACT_APP_API_BASE=https://e-commerce-backend-1-k2vm.onrender.com/api'
});

export default API;
