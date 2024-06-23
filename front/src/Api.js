import axios from 'axios';
import {Account} from "./helpers/Account";

export const API_URL = 'https://localhost:4001/'
const api = axios.create({
    baseURL: 'https://127.0.0.1:4001'
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

    static userSendMessage(data = {}) {
        return api.post('/users/send-message', data);
    }

    static userSendContactMessage(data = {}) {
        return api.post('/users/send-contact-message', data);
    }

    static activateUser(params) {
        return api.post('/users/activate', params);
    }

    static bannerList(data = {}) {
        return api.get('/banner/list', {params: data});
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

    static workGetById(id) {
        return api.get(`/works/get-by-id/${id}`);
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

    static servicesList(data = {}) {
        return api.get('/services/list', {params: data});
    }

    static historiesList(data = {}) {
        return api.get('/histories/list', {params: data});
    }

    static projectsList(data = {}) {
        return api.get('/projects/list', {params: data});
    }

    static projectsListToEnded(data = {}) {
        return api.get('/projects/list-to-ended', {params: data});
    }

    static projectsListToPending(data = {}) {
        return api.get('/projects/list-to-pending', {params: data});
    }

    static galleriesList(data = {}) {
        return api.get('/galleries/list', {params: data});
    }

    static videoPathsList(data = {}) {
        return api.get('/video-path/list', {params: data});
    }

    static minimalPricesList(data = {}) {
        return api.get('/minimal-prices/list', {params: data});
    }

    static carsList(data = {}) {
        return api.get('/cars/list', {params: data});
    }

    static ourAdvantagesList(data = {}) {
        return api.get('/our-advantages/list', {params: data});
    }

    static ourAdvantagesTaxiList(data = {}) {
        return api.get('/our-advantages-taxi/list', {params: data});
    }
}
