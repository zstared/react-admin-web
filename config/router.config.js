export default [
    { path: '/login', component: './User/Login' },
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: './Home' },
            {
                path: '/system',
                name: 'system',
                routes: [
                    { path: '/system/user', name: 'user', component: './System/User' },
                    { path: '/system/role', component: './System/Role' },
                    { path: '/system/menu', component: './System/Menu' },
                    { path: '/system/resource', component: './System/Resource' },
                ]
            },
            {
                path: '/production',
                name: 'production',
                routes: [
                    { path: '/production/order', name: 'order', component: './Production/Order' },
                    { path: '/production/inventory', name: 'inventory', component: './Production/Inventory' },
                    { path: '/production/purchase', name: 'purchase', component: './Production/Purchase' },
                ]
            }
        ]
    }
];