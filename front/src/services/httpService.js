import Axios from 'axios';

const BASE_URL = import.meta.env.DEV ?
    '//localhost:3000/'
    : '//localhost:3001/'

var axios = Axios.create({
    withCredentials: false
});

// axios.interceptors.request.use(function (config) {
//     const token = sessionStorage.getItem('token');
//     config.headers.session = token;
//     return config;
// });

export default {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    },

}

async function ajax(endpoint, method = 'get', data = null) {
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        // if (err.response && err.response.status === 401) {
        //     // window.location.href = 'http://a806-2-54-188-169.ngrok.io/login'
        // }
        throw err;
    }
}
