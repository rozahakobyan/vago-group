import {MdConstruction, MdDashboard} from "react-icons/md";
import {FaFacebookMessenger, FaRegRegistered, FaServicestack, FaUsers} from "react-icons/fa";
import {BiBuilding, BiPackage} from "react-icons/bi";
import {AiOutlineTeam} from "react-icons/ai";
import {IoIosContacts, IoIosHelpCircle, IoIosSettings} from "react-icons/io";
import {GiPriceTag} from "react-icons/gi";
import {FcServices} from "react-icons/fc";
import {GrProjects, GrServices} from "react-icons/gr";

export default [
    {
        id: 1,
        name: 'Dashboard',
        Icon: MdDashboard,
        path: '/',
        renderItem: true
    },
    {
        id: 2,
        name: 'Information',
        Icon: FaRegRegistered,
        openIcon: true,
        renderItem: true,
        path: 'information',
        subMenu: [
            {
                id: 2_1,
                title: "Add New Information",
                path: "add-new-information",
            },
            {
                id: 2_2,
                title: "Add New Login Image",
                path: "add-new-login-image",
            },
            {
                id: 2_3,
                title: "Login Image",
                path: "login-image",
            },
            {
                id: 2_4,
                title: "Add New History",
                path: "add-new-history",
            },
            {
                id: 2_5,
                title: "Histories",
                path: "histories",
            },
            {
                id: 2_6,
                title: "Add New Gallery",
                path: "add-new-gallery",
            },
            {
                id: 2_7,
                title: "Galleries",
                path: "galleries",
            },
        ]
    },
    {
        id: 3,
        name: 'Massagers',
        Icon: FaFacebookMessenger,
        openIcon: true,
        renderItem: true,
        path: 'massagers',
        subMenu: [
            {
                id: 3_1,
                title: "Add New Massagers",
                path: "add-new-massagers",
            }
        ]
    },
    {
        id: 4,
        name: 'Works',
        path: 'works',
        Icon: BiBuilding,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 4_1,
                title: "Add New Works",
                path: "add-new-works",
            },
        ]
    },
    {
        id: 5,
        name: 'Products',
        path: 'products',
        Icon: MdConstruction,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 5_1,
                title: "Add New Projects",
                path: "add-new-products",
            },
        ]
    },
    {
        id: 6,
        name: 'Partners',
        path: 'partners',
        Icon: AiOutlineTeam,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 6_1,
                title: "Add New Histories",
                path: "add-new-partners",
            },
        ]
    },
    {
        id: 7,
        name: 'Contacts',
        path: 'contacts',
        Icon: IoIosContacts,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 7_1,
                title: "Add New Contacts",
                path: "add-new-contacts",
            },
        ]
    },
    {
        id: 8,
        name: 'Prices',
        path: 'prices',
        Icon: GiPriceTag,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 8_1,
                title: "Add New prices",
                path: "add-new-prices",
            },
        ]
    },
    {
        id: 9,
        name: 'Packages',
        path: 'packages',
        Icon: BiPackage,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 9_1,
                title: "Add New Packages",
                path: "add-new-packages",
            },
        ]
    },
    {
        id: 10,
        name: 'Services',
        path: 'services',
        Icon: GrServices,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 9_1,
                title: "Add New Histories",
                path: "add-new-services",
            },
        ]
    },
    {
        id: 11,
        name: 'Projects',
        path: 'projects',
        Icon: GrProjects,
        openIcon: true,
        renderItem: true,
        subMenu: [
            {
                id: 11_1,
                title: "Add New Projects",
                path: "add-new-projects",
            },
        ]
    },
    {
        id: 88,
        name: 'Users',
        Icon: FaUsers,
        path: "/users/1",
        renderItem: true,
    },
    {
        id: 99,
        name: 'Settings',
        Icon: IoIosSettings,
        path: "settings",
        renderItem: true,
    },
    {
        id: 111,
        name: 'Help',
        Icon: IoIosHelpCircle,
        path: "help",
        renderItem: true,
    },
]