import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'project',
                title: 'Statistics',
                type: 'item',
                icon: 'dashboard',
                url: '/apps/dashboards/project'
            },

            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },

            {
                id: 'categories',
                title: 'Categories',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/categories'
            },
            {
                id: 'sub-categories',
                title: 'Sub Categories',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/sub-categories'
            },
            {
                id: 'types',
                title: 'Types',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/types'
            },
            {
                id: 'cities',
                title: 'Cities',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/countries'
            },
            {
                id: 'banner',
                title: 'Banner',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/banners'
            },
            {
                id: 'advantages',
                title: 'Mission Vision',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/advantages'
            },
            {
                id: 'costs',
                title: 'Costs',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/costs'
            },

            {
                id: 'users',
                title: 'Users',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/users'
            },
            {
                id: 'suppliers',
                title: 'Couriers',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/couriers'
            },
            {
                id: 'ecommerce',
                title: 'E_Commerce',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/ecommerce'
            },
            {
                id: 'orders',
                title: 'Orders',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/orders/0'
            },
            {
                id: 'accounts',
                title: 'Accounts',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/accounts'
            },
            {
                id: 'content',
                title: 'Content',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/content'
            },
            {
                id: 'home-content',
                title: 'Home Content',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/home-content'
            },
            {
                id: 'feedback',
                title: 'Contact Website',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/contact-us'
            },
            {
                id: 'Subscriptions',
                title: 'Subscriptions',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/subscriptions'
            },
            {
                id: 'contacts Landing Page',
                title: 'Contacts Landing Page',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/feedbacks'
            },
        ]
    }
];


export const navigationSup: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            // {
            //     id: 'project',
            //     title: 'Statistics',
            //     type: 'item',
            //     icon: 'dashboard',
            //     url: '/apps/dashboards/project'
            // },

            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },

            {
                id: 'shipments',
                title: 'Shipments',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/shipments'
            },
            {
                id: 'drivers',
                title: 'Drivers',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/drivers'
            },

        ]
    }
];

export const navigationCommerce: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            // {
            //     id: 'project',
            //     title: 'Statistics',
            //     type: 'item',
            //     icon: 'dashboard',
            //     url: '/apps/dashboards/project'
            // },

            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },

            {
                id: 'shipments',
                title: 'New Shipment',
                type: 'item',
                icon: 'dashboard',
                url: '/pages/new-shipment'
            },


        ]
    }
];


