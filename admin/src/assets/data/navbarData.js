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
        path: "/admin/home",
    },
    {
        id: 2,
        name: 'Destination',
        Icon: DestinationIcon,
        openIcon: true,
        active: false,
        subMenu: [
            {
                id: 2_1,
                title: "All Destination",
                path: "/all-destination",
                active: false,
            },
            {
                id: 2_2,
                title: "Add new Destination",
                path: "/add-new-destination",
                active: false,
            }
        ]
    },
    {
        id: 3,
        name: 'Tour',
        Icon: TourIcon ,
        title:"tour",
        openIcon: true,
        active: false,
        subMenu: [
            {
                id: 3_1,
                title: "All tours",
                path: "/all-tours/1",
                active: false,
            },
            {
                id: 3_2,
                title: "Add new tour",
                path: "/add-new-tour",
                active: false,
            },
            {
                id: 3_3,
                title: "All categories",
                path: "/all-categories",
                active: false,
            },
            {
                id: 3_4,
                title: "Add new categories",
                path: "/add-new-categories",
                active: false,
            }
        ]
    },
    {
        id: 4,
        name: 'Services',
        Icon: ServicesIcon ,
        openIcon: true,
        title:"services",
        active: false,
        subMenu: [
            {
                id: 4_4,
                name: "Message",
                Icon: MessageIcon,
                path: "/messages",
                active: false,
            },
        ]
    },
    {
        id: 5,
        name: 'Hotels',
        title: "hotels",
        Icon: HotelsIcon,
        active: false,
        path: "/hotels",
    },
    {
        id: 6,
        name: 'Food',
        title: "food",
        Icon: FoodIcon,
        active: false,
        path: "/food",
    },
    {
        id: 7,
        name: 'Cars',
        title: "cars",
        Icon: CarsIcon,
        active: false,
        path: "/cars",
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
