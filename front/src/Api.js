import axios from 'axios';
import {Account} from "./helpers/Account";

export const API_URL = 'http://localhost:4001/'
const api = axios.create({
    baseURL: 'http://127.0.0.1:4001'
})
api.interceptors.request.use((config) => {
    const token = Account.getTokenStrong()
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
        Account.removeStrong()
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

    static activateUser(params) {
        return api.post('/users/activate', params);
    }
    
    static homeInfoList() {
        return api.get('/home-info/list');
    }

    static loginImageList(data = {}) {
        return api.get('/login-image/list', {params: data});
    }

    static massagerList() {
        return api.get('/massagers/list');
    }

    static worksList(data = {}) {
        return api.get('/works/list', {params: data});
    }

    static productsList() {
        return api.get('/products/list');
    }

    static partnersList() {
        return api.get('/partners/list');
    }

    static contactsList() {
        return api.get('/contacts/list');
    }

    static pricesList(data = {}) {
        return api.get('/prices/list', {params: data});
    }

    static packagesList(data = {}) {
        return api.get('/packages/list', {params: data});
    }
}
