import {configureStore} from "@reduxjs/toolkit";
import {users} from './reducers/users'
import {homeInfo} from "./reducers/homeInfo";
import {loginImage} from "./reducers/loginImage";
import {massagers} from "./reducers/massagers";
import {works} from "./reducers/works";

const root = {
    users,
    homeInfo,
    loginImage,
    massagers,
    works
}

export const store = configureStore({reducer: root})
