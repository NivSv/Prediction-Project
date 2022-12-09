import Axios from 'axios';

export const BASE_URL = import.meta.env.DEV ?
    'http://localhost:3000'
    : 'http//localhost:3001'

export const axios = Axios.create({
    withCredentials: false
});