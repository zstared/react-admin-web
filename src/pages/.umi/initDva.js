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

app.model({ namespace: 'app', ...(require('F:/Project-xinhong/react-admin-web/src/models/app.js').default) });
app.model({ namespace: 'oauth', ...(require('F:/Project-xinhong/react-admin-web/src/models/oauth.js').default) });
