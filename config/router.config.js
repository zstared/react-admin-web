export default [
    { path: '/login', component: './User/Login' },
    {
        path: '/', component: '../layouts/BasicLayout', routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: './Home' },
            { path: '/user/setting', name: 'setting', component: './User/Setting' },
            {
                path: '/system', name: 'system', routes: [
                    { path: '/system/user', name: 'user', component: './System/User' },
                    { path: '/system/role', component: './System/Role' },
                    { path: '/system/resource', component: './System/Resource' },
                ]
            }
        ]
    }
];