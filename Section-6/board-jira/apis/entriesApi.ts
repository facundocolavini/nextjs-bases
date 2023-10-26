import axios from 'axios';

const entriesApi = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default entriesApi;