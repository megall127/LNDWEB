import axios from 'axios';

const localHost = 'http://127.0.0.1:3333/api'
const prodTest = 'https://leandrotestes.git.digital/api'

const api = axios.create({
    baseURL: localHost,
  });

  api.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('@token');
  
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  
    return config;
  });





export default api;