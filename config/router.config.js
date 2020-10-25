export default [
    { path: '/login', component: './User/Login' },
    {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
            { path: '/', redirect: '/home' },
            { path: '/home', component: './Home' },
            {
                path: '/user/setting',
                component: './User/Setting/Index',
                routes: [
                    { path: '/user/setting', redirect: '/user/setting/base' },
                    { path: '/user/setting/base', component: './User/Setting/Base' },
                    { path: '/user/setting/security', component: './User/Setting/Security' },
                    { path: '/user/setting/personalization', component: './User/Setting/Personalization' },
                ]
            },
            {
                path: '/system',
                name: 'system',
                routes: [
                    { path: '/system/user', name: 'user', component: './System/User' },
                    { path: '/system/role', component: './System/Role' },
                    { path: '/system/menu', component: './System/Menu' },
                    { path: '/system/organization', component: './System/Organization' },
                    { path: '/system/resource', component: './System/Resource' },
                ]
            },
            {
                path: '/face_recognition',
                name: 'face_recognition',
                routes: [
                    { path: '/face_recognition/face', name: 'face', component: './FaceRecognition/Face' },
                    { path: '/face_recognition/recognize', name: 'recognize', component: './FaceRecognition/Recognize' },
                    { path: '/face_recognition/album', name: 'album', component: './FaceRecognition/Album' },
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