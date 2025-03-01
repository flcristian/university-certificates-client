import axios from 'axios';

const API_PORT = import.meta.env.VITE_API_PORT;
const API_VERSION = import.meta.env.VITE_API_VERSION;
const API_ADDRESS = import.meta.env.VITE_API_ADDRESS;
const BASE_URL = `http://${API_ADDRESS}:${API_PORT}/api/${API_VERSION}/`;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;