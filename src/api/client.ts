// src/api/client.ts (FULL CODE)

import axios from 'axios';

// Buat instance Axios
const client = axios.create({
  baseURL: 'https://todolistbeformentee-production.up.railway.app', // Ganti dengan URL API backend Anda
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;