import axios from 'axios';

// API base URL - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8808/api/';

// Create an axios instance with default headers
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// apiClient.interceptors.request.use(config => {
//   if (this.sessionId && config.url.includes(this.endpoint)) {
//     config.headers['X-Session-ID'] = this.sessionId;
//   }
//   return config;
// });

export default apiClient;