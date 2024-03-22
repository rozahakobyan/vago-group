import { ReactComponent as DashboardIcon } from "../icon/dashboard.svg";
import { ReactComponent as DestinationIcon } from "../icon/destination.svg";
import { ReactComponent as TourIcon } from "../icon/tour.svg";
import { ReactComponent as ServicesIcon } from "../icon/service.svg";
import { ReactComponent as HotelsIcon } from "../icon/hotels.svg";
import { ReactComponent as FoodIcon } from "../icon/food.svg";
import { ReactComponent as CarsIcon } from "../icon/cars.svg";
import { ReactComponent as MessageIcon } from "../icon/messages.svg";
import { ReactComponent as SettingsIcon } from "../icon/settings.svg";
import { ReactComponent as HelpIcon } from "../icon/help.svg";
import { ReactComponent as LogOutIcon } from "../icon/logOut.svg";
import { ReactComponent as UsersIcon } from "../icon/users.svg";

export default [
    {
        id: 1,
        name: 'Dashboard',
        title: "dashboard",
        Icon: DashboardIcon,
        active: true,
        path: "/admin/dashboard",
    },
    {
        id: 2,
        name: 'Information',
        Icon: DestinationIcon,
        openIcon: true,
        active: false,
        subMenu: [
            {
                id: 2_1,
                title: "All Home Info",
                path: "/admin/all-info",
                active: false,
            },
            {
                id: 2_2,
                title: "Login Image",
                path: "/admin/login-image",
                active: false,
            },
            {
                id: 3_3,
                title: "Massagers",
                path: "/admin/massagers",
                active: false,
            }
        ]
    },
    {
        id: 8,
        name: 'Users',
        Icon: UsersIcon,
        title: "users",
        active: false,
        path: "/all-users",
    },
    {
        id: 9,
        name: 'Settings',
        title: "settings",
        Icon: SettingsIcon,
        active: false,
        path: "/settings",
    },
    {
        id: 10,
        name: 'Help',
        title: "help",
        Icon: HelpIcon,
        active: false,
        path: "/help",
    },
    {
        id: 22,
        name: "Log Out",
        Icon: LogOutIcon ,
        title:"logout"
    },
]
