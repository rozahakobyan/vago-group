import axios from "axios";
import {Account} from "./helpers/account";

export const API_URL = 'http://localhost:4001'
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
        console.log(data)
        return api.put("/users/profile-update", data, {
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

    static addHomeInfo(data = {}) {
        return api.post('/home-info/add', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    static homeInfoList() {
        return api.get('/home-info/list');
    }

    static deleteHomeInfo(id) {
        return api.delete(`/home-info/delete/${id}`);
    }

    static updateHomeInfo(id, data = {}) {
        return api.put(`/home-info/update/${id}`, data, {
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
        const {id, isActive, createdAt, updatedAt, schedules, ...data} = arg;

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
        const {id, isActive, createdAt, products, updatedAt, ...data} = arg;

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
}


