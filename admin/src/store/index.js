import {configureStore} from "@reduxjs/toolkit";
import {users} from './reducers/users'
import {banner} from "./reducers/banner";
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
import {projects} from "./reducers/projects";
import {galleries} from "./reducers/galleries";
import {videoPath} from "./reducers/videoPath";
import {minimalPrices} from "./reducers/minimalPrices";
import {cars} from "./reducers/cars";
import {ourAdvantages} from "./reducers/ourAdvantages";
import {ourAdvantagesTaxi} from "./reducers/ourAdvantagesTaxi";

const root = {
    users,
    banner,
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
    projects,
    galleries,
    videoPath,
    minimalPrices,
    cars,
    ourAdvantages,
    ourAdvantagesTaxi,
}

export const store = configureStore({reducer: root})
