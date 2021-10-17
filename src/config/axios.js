import axios from 'axios';

const token = localStorage.getItem('user');

const a = axios.create({
    baseURL: 'https://mosala.herokuapp.com/api',
});

// const a = axios.create({
//     baseURL: 'http://localhost:5500/api',
// });

a.defaults.headers.common['Authorization'] = typeof token === "string" ? token.length > 0 ? "Bearer " + token : null : null;

export default a;