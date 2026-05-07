import axios from 'axios';

const api = axios.create({ 
    baseURL: 'https://sopt-server.p-e.kr',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;