import {configureStore} from "@reduxjs/toolkit";
import {users} from './reducers/users'
import {homeInfo} from "./reducers/homeInfo";
import {loginImage} from "./reducers/loginImage";
import {massagers} from "./reducers/massagers";
import {works} from "./reducers/works";
import {products} from "./reducers/products";
import {partners} from "./reducers/partners";

const root = {
    users,
    homeInfo,
    loginImage,
    massagers,
    works, 
    products,
    partners
}

export const store = configureStore({reducer: root})
