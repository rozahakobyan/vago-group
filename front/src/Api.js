import axios from 'axios';
import Account from "./helpers/Account";

const { REACT_APP_API_URL } = process.env;

const api = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use((config) => {
    const token = Account.getToken()
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        Account.deleteStrong()
        window.location.href = '/'
    }
    return Promise.reject(error);
});

export class Api {
    static login(arg) {
        return api.post('/users/login', arg);
    }

    static register(arg) {
        return api.post('/users/register', arg);
    }

    static profile() {
        return api.get('/users/profile');
    }

    static sendEmailForgotPassword(email) {
        return api.post('/users/send-password-recovery-code', email);
    }

    static sendCodeForgotPassword(code) {
        return api.post('/users/validate-password-recovery-code', code);
    }

    static updateForgotPassword(password) {
        return api.post('/users/password-update', password);
    }
}
