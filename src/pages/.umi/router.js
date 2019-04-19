import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/.umi/LocaleWrapper.jsx'

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
    "component": dynamic({ loader: () => import('../User/Login'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
    "exact": true
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
    "routes": [
      {
        "path": "/home",
        "component": dynamic({ loader: () => import('../Home'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
        "exact": true
      },
      {
        "path": "/user/setting",
        "component": dynamic({ loader: () => import('../User/Setting/Index'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
        "routes": [
          {
            "path": "/user/setting/base",
            "component": dynamic({ loader: () => import('../User/Setting/Base'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/user/setting/security",
            "component": dynamic({ loader: () => import('../User/Setting/Security'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/user/setting/personalization",
            "component": dynamic({ loader: () => import('../User/Setting/Personalization'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
            "component": dynamic({ loader: () => import('../System/User'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/system/role",
            "component": dynamic({ loader: () => import('../System/Role'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/system/menu",
            "component": dynamic({ loader: () => import('../System/Menu'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "path": "/system/resource",
            "component": dynamic({ loader: () => import('../System/Resource'), loading: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index').default }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": () => React.createElement(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
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
