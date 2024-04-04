import axios from "axios";
import {Account} from "./helpers/account";

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
        return api.put("/users/profile-update", payload, {
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
}


