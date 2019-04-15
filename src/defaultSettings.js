module.exports = {
  api_url: 'http://47.112.194.62:8081',

  siderStyle: localStorage.getItem('siderStyle') ? localStorage.getItem('siderStyle') : 'light', //侧边栏风格 dark light
  navStyle: localStorage.getItem('navStyle') ? localStorage.getItem('navStyle') : 'breadcrumb', //导航类型  breadcrumb-面包屑 nav-导航栏,
  colorWeak: localStorage.getItem('colorWeak') ? localStorage.getItem('colorWeak') : false, //色弱模式
};


// color: '#F5222D',//薄暮
// color: '#FA541C',//火山
// color: '#FAAD14',//日暮
// color: '#13C2C2',//明青
// color: '#52C41A',//极光绿
// color: '#1890FF',//拂晓蓝（默认）
// color: '#2F54EB',//极客蓝
// color: '#722ED1',//酱紫