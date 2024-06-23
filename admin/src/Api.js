import axios from "axios";
import {Account} from "./helpers/account";

export const API_URL = 'https://localhost:4001'
const api = axios.create({
    baseURL: API_URL,
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
    static login(payload) {
        return api.post("/users/admin-login", payload)
    }

    static profile() {
        return api.get("/users/profile")
    }

    static forgetSendEmail(payload) {
        return api.post("/users/send-password-recovery-code", payload)
    }

    static verificationEmailCode(payload) {
        return api.post("/users/validate-password-recovery-code", payload)
    }

    static forgetPassword(payload) {
        return api.post("/users/password-update", payload)
    }

    static updateProfile(payload) {
        const {id, role, ...data} = payload;
        return api.put(`/users/profile-update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    static forgetPasswordProfile(payload) {
        return api.put("/users/update-password", payload)
    }

    static usersList(params) {
        return api.get('/users/get-users', {params});
    }

    static usersDelete(id) {
        return api.delete(`/users/delete/${id}`);
    }

    static usersUpdate(payload) {
        const {updateItem: {id, ...data}} = payload;
        return api.put(`/users/update/${id}`, data);
    }

    static usersFindById(id) {
        return api.get(`/users/find-user-by-id/${id}`);
    }

    static bannerAdd(data = {}) {
        return api.post('/banner/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static bannerList() {
        return api.get('/banner/list');
    }

    static bannerDelete(id) {
        return api.delete(`/banner/delete/${id}`);
    }

    static bannerUpdate(arg = {}) {
        const {id, isActive, translationId, createdAt, updatedAt, ...data} = arg;

        return api.put(`/banner/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static loginImageAdd(data = {}) {
        return api.post('/login-image/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static loginImageList() {
        return api.get('/login-image/list');
    }

    static loginImageDelete(id) {
        return api.delete(`/login-image/delete/${id}`);
    }

    static loginImageUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;

        return api.put(`/login-image/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static massagerAdd(data = {}) {
        return api.post('/massagers/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static massagerList() {
        return api.get('/massagers/list');
    }

    static massagerDelete(id) {
        return api.delete(`/massagers/delete/${id}`);
    }

    static massagerUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;
        return api.put(`/massagers/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static worksAdd(data = {}) {
        return api.post('/works/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static worksList(data = {}) {
        return api.get('/works/list', {params: data});
    }

    static worksDelete(id) {
        return api.delete(`/works/delete/${id}`);
    }

    static schedulesDelete(id) {
        return api.delete(`/works/delete-schedule/${id}`);
    }

    static worksUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, translationId, schedules, ...data} = arg;

        return api.put(`/works/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    
    static productsAdd(data = {}) {
        return api.post('/products/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static productsList() {
        return api.get('/products/list');
    }

    static productsDelete(id) {
        return api.delete(`/products/delete/${id}`);
    }

    static productsUpdate(arg) {
        const {id, isActive, createdAt, products, translationId, updatedAt, ...data} = arg;

        return api.put(`/products/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static partnersAdd(data = {}) {
        return api.post('/partners/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static partnersList() {
        return api.get('/partners/list');
    }

    static partnersDelete(id) {
        return api.delete(`/partners/delete/${id}`);
    }

    static partnersUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;

        return api.put(`/partners/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static contactsAdd(data = {}) {
        console.log(data);
        return api.post('/contacts/add', data);
    }

    static contactsList(data = {}) {
        return api.get('/contacts/list', data);
    }

    static contactsDelete(id) {
        return api.delete(`/contacts/delete/${id}`);
    }
    static contactsPathDelete(id) {
        return api.delete(`/contacts/delete-path/${id}`);
    }

    static contactsUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, massagersList, ...data} = arg;

        return api.put(`/contacts/update/${id}`, data);
    }

    static pricesAdd(data = {}) {
        return api.post('/prices/add', data);
    }

    static pricesList() {
        return api.get('/prices/list');
    }

    static pricesDelete(id) {
        return api.delete(`/prices/delete/${id}`);
    }

    static pricesUpdate(arg) {
        const {id, isActive, translationId, createdAt, updatedAt, ...data} = arg;

        return api.put(`/prices/update/${id}`, data);
    }

    static packagesAdd(data = {}) {
        return api.post('/packages/add', data);
    }

    static packagesList() {
        return api.get('/packages/list');
    }

    static packagesDelete(id) {
        return api.delete(`/packages/delete/${id}`);
    }

    static packagesUpdate(arg) {
        const {id, isActive, translationId, createdAt, updatedAt, ...data} = arg;

        return api.put(`/packages/update/${id}`, data);
    }

    static servicesAdd(data = {}) {
        return api.post('/services/add', data);
    }

    static servicesList() {
        return api.get('/services/list');
    }

    static servicesDelete(id) {
        return api.delete(`/services/delete/${id}`);
    }

    static servicesUpdate(arg) {
        const {id, isActive, translationId, createdAt, updatedAt, ...data} = arg;

        return api.put(`/services/update/${id}`, data);
    }

    static historiesAdd(data = {}) {
        return api.post('/histories/add', data);
    }

    static historiesList() {
        return api.get('/histories/list');
    }

    static historiesDelete(id) {
        return api.delete(`/histories/delete/${id}`);
    }

    static historiesUpdate(arg) {
        const {id, isActive, translationId, createdAt, updatedAt, ...data} = arg;

        return api.put(`/histories/update/${id}`, data);
    }

    static projectsAdd(data = {}) {
        return api.post('/projects/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static projectsList(data = {}) {
        return api.get('/projects/list', {params: data});
    }

    static projectsDelete(id) {
        return api.delete(`/projects/delete/${id}`);
    }

    static projectsUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;

        return api.put(`/projects/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static galleriesAdd(data = {}) {
        return api.post('/galleries/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static galleriesList(data = {}) {
        return api.get('/galleries/list', {params: data});
    }

    static galleriesDelete(id) {
        return api.delete(`/galleries/delete/${id}`);
    }

    static galleriesUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;

        return api.put(`/galleries/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static videoPathsAdd(data = {}) {
        return api.post('/video-path/add', data);
    }

    static videoPathsList() {
        return api.get('/video-path/list');
    }

    static videoPathsDelete(id) {
        return api.delete(`/video-path/delete/${id}`);
    }

    static videoPathsUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;

        return api.put(`/video-path/update/${id}`, data);
    }

    static minimalPricesAdd(data = {}) {
        return api.post('/minimal-prices/add', data);
    }

    static minimalPricesList() {
        return api.get('/minimal-prices/list');
    }

    static minimalPricesDelete(id) {
        return api.delete(`/minimal-prices/delete/${id}`);
    }

    static minimalPricesUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;

        return api.put(`/minimal-prices/update/${id}`, data);
    }

    static carsAdd(data = {}) {
        return api.post('/cars/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static carsList(data = {}) {
        return api.get('/cars/list', {params: data});
    }

    static carsDelete(id) {
        return api.delete(`/cars/delete/${id}`);
    }

    static carsUpdate(arg) {
        const {id, isActive, createdAt, updatedAt, ...data} = arg;

        return api.put(`/cars/update/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
}


