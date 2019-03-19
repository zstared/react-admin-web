import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});

app.model({ namespace: 'app', ...(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/models/app.js').default) });
app.model({ namespace: 'auth', ...(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/models/auth.js').default) });
app.model({ namespace: 'resource', ...(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/resource.js').default) });
app.model({ namespace: 'role', ...(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/role.js').default) });
app.model({ namespace: 'user', ...(require('/Users/bruce.zheng/Desktop/test/koa/xinhong-web/src/pages/System/models/user.js').default) });
