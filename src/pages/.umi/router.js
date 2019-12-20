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
import RendererWrapper0 from '/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux, dynamic as _dvaDynamic } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/user/setting',
    redirect: '/user/setting/base',
    exact: true,
  },
  {
    path: '/',
    redirect: '/home',
    exact: true,
  },
  {
    path: '/login',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../User/Login'),
          LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
            .default,
        })
      : require('../User/Login').default,
    exact: true,
  },
  {
    path: '/',
    component: __IS_BROWSER
      ? _dvaDynamic({
          component: () => import('../../layouts/BasicLayout'),
          LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
            .default,
        })
      : require('../../layouts/BasicLayout').default,
    routes: [
      {
        path: '/home',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../Home'),
              LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                .default,
            })
          : require('../Home').default,
        exact: true,
      },
      {
        path: '/user/setting',
        component: __IS_BROWSER
          ? _dvaDynamic({
              component: () => import('../User/Setting/Index'),
              LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                .default,
            })
          : require('../User/Setting/Index').default,
        routes: [
          {
            path: '/user/setting/base',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../User/Setting/Base'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../User/Setting/Base').default,
            exact: true,
          },
          {
            path: '/user/setting/security',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../User/Setting/Security'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../User/Setting/Security').default,
            exact: true,
          },
          {
            path: '/user/setting/personalization',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  component: () => import('../User/Setting/Personalization'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../User/Setting/Personalization').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/system',
        name: 'system',
        routes: [
          {
            path: '/system/user',
            name: 'user',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/organization.js').then(
                      m => {
                        return { namespace: 'organization', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/resource.js').then(
                      m => {
                        return { namespace: 'resource', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/user.js').then(
                      m => {
                        return { namespace: 'user', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../System/User'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/User').default,
            exact: true,
          },
          {
            path: '/system/role',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/organization.js').then(
                      m => {
                        return { namespace: 'organization', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/resource.js').then(
                      m => {
                        return { namespace: 'resource', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/user.js').then(
                      m => {
                        return { namespace: 'user', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../System/Role'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/Role').default,
            exact: true,
          },
          {
            path: '/system/menu',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/organization.js').then(
                      m => {
                        return { namespace: 'organization', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/resource.js').then(
                      m => {
                        return { namespace: 'resource', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/user.js').then(
                      m => {
                        return { namespace: 'user', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../System/Menu'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/Menu').default,
            exact: true,
          },
          {
            path: '/system/organization',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/organization.js').then(
                      m => {
                        return { namespace: 'organization', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/resource.js').then(
                      m => {
                        return { namespace: 'resource', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/user.js').then(
                      m => {
                        return { namespace: 'user', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../System/Organization'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/Organization').default,
            exact: true,
          },
          {
            path: '/system/resource',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/organization.js').then(
                      m => {
                        return { namespace: 'organization', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/resource.js').then(
                      m => {
                        return { namespace: 'resource', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/role.js').then(
                      m => {
                        return { namespace: 'role', ...m.default };
                      },
                    ),
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/user.js').then(
                      m => {
                        return { namespace: 'user', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../System/Resource'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../System/Resource').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        path: '/face_recognition',
        name: 'face_recognition',
        routes: [
          {
            path: '/face_recognition/face',
            name: 'face',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/FaceRecognition/models/face.js').then(
                      m => {
                        return { namespace: 'face', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../FaceRecognition/Face'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../FaceRecognition/Face').default,
            exact: true,
          },
          {
            path: '/face_recognition/recognize',
            name: 'recognize',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/FaceRecognition/models/face.js').then(
                      m => {
                        return { namespace: 'face', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../FaceRecognition/Recognize'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../FaceRecognition/Recognize').default,
            exact: true,
          },
          {
            path: '/face_recognition/album',
            name: 'album',
            component: __IS_BROWSER
              ? _dvaDynamic({
                  app: require('@tmp/dva').getApp(),
                  models: () => [
                    import('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/FaceRecognition/models/face.js').then(
                      m => {
                        return { namespace: 'face', ...m.default };
                      },
                    ),
                  ],
                  component: () => import('../FaceRecognition/Album'),
                  LoadingComponent: require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/components/PageLoading/index')
                    .default,
                })
              : require('../FaceRecognition/Album').default,
            exact: true,
          },
          {
            component: () =>
              React.createElement(
                require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
                  .default,
                { pagesPath: 'src/pages', hasRoutesInConfig: true },
              ),
          },
        ],
      },
      {
        component: () =>
          React.createElement(
            require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: true },
          ),
      },
    ],
  },
  {
    component: () =>
      React.createElement(
        require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
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
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
