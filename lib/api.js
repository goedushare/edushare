// lib/api.js
import axios from 'axios';

const API_KEY = process.env.GEMINI_API_KEY; // Use environment variable for security
const BASE_URL = 'https://gemini.googleapis.com/v1'; // Replace with the actual base URL for Gemini API

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export default api;
