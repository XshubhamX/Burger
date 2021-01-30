import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-c467d-default-rtdb.firebaseio.com/'
});

export default instance;