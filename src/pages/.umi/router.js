import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from 'F:/Project-xinhong/react-admin-web/src/pages/.umi/LocaleWrapper.jsx'
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user/setting",
    "redirect": "/user/setting/base",
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/home",
    "exact": true
  },
  {
    "path": "/login",
    "component": _dvaDynamic({
  
  component: () => import('../User/Login'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
    "exact": true
  },
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import('../../layouts/BasicLayout'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
    "routes": [
      {
        "path": "/home",
        "component": _dvaDynamic({
  
  component: () => import('../Home'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
        "exact": true
      },
      {
        "path": "/user/setting",
        "component": _dvaDynamic({
  
  component: () => import('../User/Setting/Index'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
        "routes": [
          {
            "path": "/user/setting/base",
            "component": _dvaDynamic({
  
  component: () => import('../User/Setting/Base'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/user/setting/security",
            "component": _dvaDynamic({
  
  component: () => import('../User/Setting/Security'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/user/setting/personalization",
            "component": _dvaDynamic({
  
  component: () => import('../User/Setting/Personalization'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('F:/Project-xinhong/react-admin-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/system",
        "name": "system",
        "routes": [
          {
            "path": "/system/user",
            "name": "user",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/organization.js').then(m => { return { namespace: 'organization',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/resource.js').then(m => { return { namespace: 'resource',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/role.js').then(m => { return { namespace: 'role',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/user.js').then(m => { return { namespace: 'user',...m.default}})
],
  component: () => import('../System/User'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/system/role",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/organization.js').then(m => { return { namespace: 'organization',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/resource.js').then(m => { return { namespace: 'resource',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/role.js').then(m => { return { namespace: 'role',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/user.js').then(m => { return { namespace: 'user',...m.default}})
],
  component: () => import('../System/Role'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/system/menu",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/organization.js').then(m => { return { namespace: 'organization',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/resource.js').then(m => { return { namespace: 'resource',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/role.js').then(m => { return { namespace: 'role',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/user.js').then(m => { return { namespace: 'user',...m.default}})
],
  component: () => import('../System/Menu'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/system/organization",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/organization.js').then(m => { return { namespace: 'organization',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/resource.js').then(m => { return { namespace: 'resource',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/role.js').then(m => { return { namespace: 'role',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/user.js').then(m => { return { namespace: 'user',...m.default}})
],
  component: () => import('../System/Organization'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/system/resource",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/organization.js').then(m => { return { namespace: 'organization',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/resource.js').then(m => { return { namespace: 'resource',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/role.js').then(m => { return { namespace: 'role',...m.default}}),
  import('F:/Project-xinhong/react-admin-web/src/pages/System/models/user.js').then(m => { return { namespace: 'user',...m.default}})
],
  component: () => import('../System/Resource'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('F:/Project-xinhong/react-admin-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/face_recognition",
        "name": "face_recognition",
        "routes": [
          {
            "path": "/face_recognition/face",
            "name": "face",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/FaceRecognition/models/face.js').then(m => { return { namespace: 'face',...m.default}})
],
  component: () => import('../FaceRecognition/Face'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/face_recognition/recognize",
            "name": "recognize",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/FaceRecognition/models/face.js').then(m => { return { namespace: 'face',...m.default}})
],
  component: () => import('../FaceRecognition/Recognize'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/face_recognition/album",
            "name": "album",
            "component": _dvaDynamic({
  app: window.g_app,
models: () => [
  import('F:/Project-xinhong/react-admin-web/src/pages/FaceRecognition/models/face.js').then(m => { return { namespace: 'face',...m.default}})
],
  component: () => import('../FaceRecognition/Album'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('F:/Project-xinhong/react-admin-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/production",
        "name": "production",
        "routes": [
          {
            "path": "/production/order",
            "name": "order",
            "component": _dvaDynamic({
  
  component: () => import('../Production/Order'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/production/inventory",
            "name": "inventory",
            "component": _dvaDynamic({
  
  component: () => import('../Production/Inventory'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "path": "/production/purchase",
            "name": "purchase",
            "component": _dvaDynamic({
  
  component: () => import('../Production/Purchase'),
  LoadingComponent: require('F:/Project-xinhong/react-admin-web/src/components/PageLoading/index').default,
}),
            "exact": true
          },
          {
            "component": () => React.createElement(require('F:/Project-xinhong/react-admin-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('F:/Project-xinhong/react-admin-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('F:/Project-xinhong/react-admin-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
