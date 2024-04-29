import {configureStore} from "@reduxjs/toolkit";
import {users} from './reducers/users'
import {homeInfo} from "./reducers/homeInfo";
import {loginImage} from "./reducers/loginImage";
import {massagers} from "./reducers/massagers";
import {works} from "./reducers/works";
import {products} from "./reducers/products";
import {partners} from "./reducers/partners";
import {contacts} from "./reducers/contacts";
import {prices} from "./reducers/prices";
import {packages} from "./reducers/packages";
import {services} from "./reducers/services";
import {histories} from "./reducers/histories";

const root = {
    users,
    homeInfo,
    loginImage,
    massagers,
    works, 
    products,
    partners,
    contacts,
    prices,
    packages,
    services,
    histories,
}

export const store = configureStore({reducer: root})
