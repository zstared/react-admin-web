import React from 'react';
import {
  Router as DefaultRouter,
  Route,
  Switch,
  StaticRouter,
} from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@@/history';

const Router = DefaultRouter;

const routes = [
  {
    path: '/',
    redirect: '/home',
    exact: true,
  },
  {
    path: '/login',
    component: require('../User/Login').default,
    exact: true,
  },
  {
    path: '/',
    component: require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/home',
        component: require('../Home').default,
        exact: true,
      },
      {
        path: '/system',
        name: 'system',
        routes: [
          {
            path: '/system/user',
            name: 'user',
            component: require('../System/User').default,
            exact: true,
          },
          {
            path: '/system/role',
            component: require('../System/Role').default,
            exact: true,
          },
          {
            path: '/system/menu',
            component: require('../System/Menu').default,
            exact: true,
          },
          {
            path: '/system/resource',
            component: require('../System/Resource').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/bruce.zheng/Desktop/test/koa/mes-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/production',
        name: 'production',
        routes: [
          {
            path: '/production/order',
            name: 'order',
            component: require('../Production/Order').default,
            exact: true,
          },
          {
            path: '/production/inventory',
            name: 'inventory',
            component: require('../Production/Inventory').default,
            exact: true,
          },
          {
            path: '/production/purchase',
            name: 'purchase',
            component: require('../Production/Purchase').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/bruce.zheng/Desktop/test/koa/mes-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/bruce.zheng/Desktop/test/koa/mes-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/bruce.zheng/Desktop/test/koa/mes-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: true },
      ),
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return <Router history={history}>{renderRoutes(routes, props)}</Router>;
  }
}
