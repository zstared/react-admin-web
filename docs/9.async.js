(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{HoQt:function(e,t,a){e.exports=a.p+"static/banner.afbce68c.svg"},Y5yc:function(e,t,a){"use strict";var M=a("oWcC"),u=a("eVuz");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("14J3");var l=M(a("BMrR"));a("+L6B");var g=M(a("2/Rp"));a("sRBo");var i=M(a("kaz8"));a("5NDa");var L=M(a("5rEg"));a("Pwec");var N=M(a("CtXQ"));a("jCWc");var r=M(a("kPKH"));a("y8nQ");var n=M(a("Vl3Y"));a("Znn+");var j,I,c,s=M(a("ZTPi")),T=u(a("q1tI")),d=M(a("w2qy")),y=a("LLXN"),o=a("WXbf"),E=M(a("mxmt")),D=M(a("HoQt")),m=M(a("bfXr")),A=a("+n12"),f=s.default.TabPane,C=n.default.Item,z=(j=(0,o.connect)(e=>{var t=e.loading;return{submitting:t.effects["oauth/login"]}}),j((c=class extends T.PureComponent{constructor(){super(...arguments),this.state={user_name:localStorage.getItem("user_name"),password:localStorage.getItem("password")?(0,A.decryptData)(localStorage.getItem("password"),"zhengxinhong"):""},this.login=(()=>{var e=this.props,t=e.dispatch,a=e.form.validateFields;a((e,a)=>{e||t({type:"oauth/login",payload:a})})})}render(){var e=this.props,t=e.submitting,a=e.form.getFieldDecorator;return T.default.createElement("div",{className:d.default.container},T.default.createElement("div",{className:d.default.header},T.default.createElement("div",{className:d.default.container},T.default.createElement("div",{className:d.default.logo},T.default.createElement("img",{src:E.default}),T.default.createElement("span",{className:d.default.title},"React+Koa \u540e\u53f0\u7ba1\u7406\u7cfb\u7edf")),T.default.createElement("div",{className:d.default.toolbar},T.default.createElement(m.default,null)))),T.default.createElement("div",{className:d.default.content},T.default.createElement(l.default,null,T.default.createElement(r.default,{span:13,offset:2,className:d.default.banner},T.default.createElement("img",{src:D.default}),T.default.createElement("p",null,T.default.createElement(y.FormattedMessage,{id:"login.slogan"}))),T.default.createElement(r.default,{span:9},T.default.createElement("div",{className:d.default.loginTab},T.default.createElement(s.default,null,T.default.createElement(f,{tab:(0,y.formatMessage)({id:"login.tab-account"}),key:"1"},T.default.createElement(n.default,{className:"login-form",ref:"loginForm"},T.default.createElement(C,null,a("user_name",{initialValue:this.state.user_name,rules:[{required:!0,message:(0,y.formatMessage)({id:"validation.username.required"})}]})(T.default.createElement(L.default,{size:"large",prefix:T.default.createElement(N.default,{type:"user",style:{color:"rgba(0,0,0,.25)"}}),placeholder:(0,y.formatMessage)({id:"login.placeholder.username"})+":admin/testA"}))),T.default.createElement(C,null,a("password",{initialValue:this.state.password,rules:[{required:!0,message:(0,y.formatMessage)({id:"validation.password.required"})}]})(T.default.createElement(L.default,{size:"large",prefix:T.default.createElement(N.default,{type:"lock",style:{color:"rgba(0,0,0,.25)"}}),type:"password",placeholder:(0,y.formatMessage)({id:"login.placeholder.password"})+":admin/abc123456",onPressEnter:this.login}))),T.default.createElement(C,{style:{marginBottom:"0"}},a("remember",{valuePropName:"checked",initialValue:!0})(T.default.createElement(i.default,null,T.default.createElement(y.FormattedMessage,{id:"login.remember-me"}))),T.default.createElement(g.default,{size:"large",type:"primary",onClick:this.login,loading:t,style:{width:"100%",marginTop:"10px"}},T.default.createElement(y.FormattedMessage,{id:"login.btn.login"}))))),T.default.createElement(f,{tab:(0,y.formatMessage)({id:"login.tab-qrcode"}),key:"2"})))))),T.default.createElement("div",{className:d.default.footer},T.default.createElement("div",{className:d.default.links},T.default.createElement("a",{href:"https://react.docschina.org/",target:"_blank"},"React"),T.default.createElement("a",{href:"https://ant.design/index-cn",target:"_blank"},"Ant Design"),T.default.createElement("a",{href:"https://preview.pro.ant.design/user/login",target:"_blank"},"Ant Design Pro"),T.default.createElement("a",{href:"https://umijs.org/",target:"_blank"},"UmiJS"),T.default.createElement("a",{href:"https://www.csdn.net",target:"_blank"},"CSDN")),T.default.createElement("div",{className:d.default.copyright},"Copyright  2018 \xa9 zhengxinhong")))}},I=c))||I),x=n.default.create()(z);t.default=x},bfXr:function(e,t,a){"use strict";var M=a("eVuz"),u=a("oWcC");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("qVdP");var l=u(a("jsC+"));a("Pwec");var g=u(a("CtXQ"));a("lUTK");var i=u(a("BvKs")),L=M(a("q1tI")),N=u(a("TSYQ")),r=a("LLXN"),n=i.default.Item;class j extends L.PureComponent{constructor(){super(...arguments),this.changLang=(e=>{var t=e.key;(0,r.setLocale)(t)})}render(){var e=this.props,t=e.className,a=e.type,M=(0,r.getLocale)(),u=L.default.createElement(i.default,{onClick:this.changLang,selectedKeys:[M]},L.default.createElement(n,{key:"zh-CN"}," \ud83c\udde8\ud83c\uddf3 \u7b80\u4f53\u4e2d\u6587"),L.default.createElement(n,{key:"zh-TW"}," \ud83c\udded\ud83c\uddf0 \u7e41\u9ad4\u4e2d\u6587"),L.default.createElement(n,{key:"en-US"}," \ud83c\uddec\ud83c\udde7 English"));return L.default.createElement(l.default,{overlay:u},"icon"==a?L.default.createElement("span",{className:(0,N.default)(t)},L.default.createElement(g.default,{type:"global",style:{fontSize:"20px"}})):L.default.createElement("a",{href:"#"},L.default.createElement(r.FormattedMessage,{id:"app.lang"}),L.default.createElement(g.default,{type:"caret-down"})))}}var I=j;t.default=I},mxmt:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTQ1ODA4NTAxMTY4IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYzNTkiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDUxMS44bS04MCAwYTgwIDgwIDAgMSAwIDE2MCAwIDgwIDgwIDAgMSAwLTE2MCAwWiIgZmlsbD0iI0ZBNTQxQyIgcC1pZD0iNjM2MCI+PC9wYXRoPjxwYXRoIGQ9Ik05NjAuNSA1MTEuOGMwLTYyLjgtNzMuOC0xMTcuMi0xODguNS0xNTAuMSAyOC45LTExNS44IDE4LjctMjA2LjktMzUuNy0yMzguMy01NC41LTMxLjQtMTM4LjUgNS4zLTIyNC4zIDg4LjItODUuOC04Mi45LTE2OS44LTExOS42LTIyNC4zLTg4LjItNTQuNCAzMS40LTY0LjYgMTIyLjYtMzUuNyAyMzguM0MxMzcuMyAzOTQuNiA2My41IDQ0OSA2My41IDUxMS44UzEzNy4zIDYyOSAyNTIgNjYxLjljLTI4LjkgMTE1LjctMTguNyAyMDYuOSAzNS43IDIzOC4zIDEzLjQgNy44IDI4LjYgMTEuNiA0NS4yIDExLjYgMzkuNyAwIDg3LjgtMjEuOCAxNDAtNjQuMiAxMy0xMC42IDI2LjEtMjIuNiAzOS4xLTM1LjIgMTMgMTIuNiAyNi4xIDI0LjYgMzkuMSAzNS4yIDUyLjIgNDIuNCAxMDAuMiA2NC4yIDE0MCA2NC4yIDE2LjYgMCAzMS44LTMuOCA0NS4yLTExLjYgNTQuNC0zMS40IDY0LjYtMTIyLjUgMzUuNy0yMzguMyAxMTQuNy0zMi45IDE4OC41LTg3LjMgMTg4LjUtMTUwLjF6TTcxNi44IDE1Ny4yYzM1LjMgMjAuNCA0Mi43IDk0LjMgMTcuNiAxOTQuOC0zNi43LTguNC03Ni43LTE0LjctMTE5LjMtMTguNi0yNC43LTM0LjktNTAuMi02Ni40LTc1LjgtOTQgNTkuMi01Ny4zIDExNC4yLTg4LjQgMTUyLTg4LjQgOS42LTAuMSAxOC4yIDIgMjUuNSA2LjJ6TTYzNyA1ODRjLTEzLjggMjQtMjguNCA0Ny00My4zIDY5LTI2LjEgMi01My4zIDMuMS04MS43IDMuMS0yOC4zIDAtNTUuNS0xLjEtODEuNi0zLjEtMTUtMjItMjkuNS00NS4xLTQzLjMtNjktMTQuMS0yNC41LTI2LjctNDguNi0zOC4xLTcyLjIgMTEuNC0yMy42IDI0LTQ3LjcgMzguMS03Mi4yIDE0LjEtMjQuNSAyOC43LTQ3LjQgNDMuNC02OS4xIDI2LjEtMiA1My4zLTMuMSA4MS42LTMuMSAyOC4zIDAgNTUuNSAxLjEgODEuNiAzLjEgMTQuNyAyMS42IDI5LjMgNDQuNiA0My40IDY5IDE0LjEgMjQuNSAyNi43IDQ4LjYgMzguMSA3Mi4yLTExLjUgMjMuNy0yNC4xIDQ3LjgtMzguMiA3Mi4zeiBtNTguOC0yNi40YzExLjIgMjYuNiAyMC40IDUyLjEgMjggNzYuNS0yNC45IDUuNi01MS43IDEwLjQtODAuMyAxNCA5LjMtMTQuNSAxOC40LTI5LjMgMjcuMy00NC42IDguOC0xNS40IDE3LjEtMzAuNyAyNS00NS45ek01MTIgNzU2LjVjLTE3LjctMTkuMi0zNS4xLTQwLjEtNTIuMi02Mi42IDE3LjEgMC44IDM0LjUgMS4zIDUyLjIgMS4zIDE3LjcgMCAzNS4xLTAuNSA1Mi4yLTEuMy0xNy4xIDIyLjUtMzQuNSA0My40LTUyLjIgNjIuNnpNMzgwLjUgNjQ4LjFjLTI4LjYtMy42LTU1LjMtOC40LTgwLjMtMTQgNy42LTI0LjQgMTYuOC00OS45IDI4LTc2LjUgNy45IDE1LjIgMTYuMSAzMC41IDI1IDQ1LjkgOC45IDE1LjIgMTggMzAgMjcuMyA0NC42ek0zMjguMiA0NjZjLTExLjItMjYuNi0yMC40LTUyLjEtMjgtNzYuNSAyNC45LTUuNiA1MS42LTEwLjQgODAuMi0xNC05LjIgMTQuNC0xOC40IDI5LjItMjcuMiA0NC42LTguOCAxNS40LTE3LjEgMzAuNy0yNSA0NS45ek01MTIgMjY3LjFjMTcuMyAxOC43IDM0LjggMzkuOCA1Mi4xIDYyLjctMTcuMS0wLjgtMzQuNC0xLjMtNTIuMS0xLjMtMTcuNyAwLTM1IDAuNS01Mi4xIDEuMyAxNy4zLTIyLjkgMzQuOC00NCA1Mi4xLTYyLjd6IG0xNTguNyAxNTNjLTguOS0xNS4zLTE4LTMwLjEtMjcuMi00NC42IDI4LjYgMy42IDU1LjMgOC40IDgwLjIgMTQtNy42IDI0LjQtMTYuOCA0OS45LTI4IDc2LjUtNy44LTE1LjItMTYuMS0zMC41LTI1LTQ1Ljl6TTMwNy4yIDE1Ny4yYzcuMi00LjIgMTUuOC02LjIgMjUuNi02LjIgMzcuOCAwIDkyLjcgMzEuMSAxNTEuOSA4OC40LTI1LjYgMjcuNi01MS4xIDU5LjItNzUuOCA5NC00Mi41IDMuOS04Mi42IDEwLjItMTE5LjMgMTguNi0yNS4xLTEwMC42LTE3LjYtMTc0LjUgMTcuNi0xOTQuOHpNMTAyLjUgNTExLjhjMC00MC44IDYwLjMtODQuMiAxNjAtMTEyLjYgMTEuMSAzNiAyNS42IDczLjggNDMuNSAxMTIuNi0xNy44IDM4LjgtMzIuNCA3Ni42LTQzLjUgMTEyLjYtOTkuNy0yOC40LTE2MC03MS45LTE2MC0xMTIuNnogbTM0NS44IDMwNS41Yy01OS43IDQ4LjUtMTExLjEgNjYuNC0xNDEuMSA0OS4yLTM1LjMtMjAuNC00Mi43LTk0LjMtMTcuNi0xOTQuOCAzNi43IDguNCA3Ni43IDE0LjcgMTE5LjMgMTguNiAyNC40IDM0LjUgNDkuOSA2Ni4xIDc1LjggOTQuMi0xMi4xIDExLjctMjQuMiAyMi45LTM2LjQgMzIuOHogbTI2OC41IDQ5LjJjLTI5LjkgMTcuMy04MS40LTAuNi0xNDEuMS00OS4yLTEyLjEtOS45LTI0LjMtMjEuMS0zNi41LTMyLjggMjYtMjguMSA1MS40LTU5LjcgNzUuOC05NC4yIDQyLjUtMy45IDgyLjYtMTAuMiAxMTkuMy0xOC43IDI1LjIgMTAwLjYgMTcuNyAxNzQuNS0xNy41IDE5NC45eiBtNDQuOC0yNDIuMWMtMTEuMS0zNi0yNS42LTczLjgtNDMuNS0xMTIuNiAxNy44LTM4LjggMzIuNC03Ni42IDQzLjUtMTEyLjYgOTkuNyAyOC41IDE2MCA3MS45IDE2MCAxMTIuNi0wLjEgNDAuNy02MC40IDg0LjItMTYwIDExMi42eiIgZmlsbD0iI0ZBNTQxQyIgcC1pZD0iNjM2MSI+PC9wYXRoPjwvc3ZnPg=="},w2qy:function(e,t,a){e.exports={container:"zxh-pages-user-login-container",header:"zxh-pages-user-login-header",logo:"zxh-pages-user-login-logo",title:"zxh-pages-user-login-title",toolbar:"zxh-pages-user-login-toolbar",content:"zxh-pages-user-login-content",banner:"zxh-pages-user-login-banner",loginTab:"zxh-pages-user-login-loginTab",footer:"zxh-pages-user-login-footer",links:"zxh-pages-user-login-links",copyright:"zxh-pages-user-login-copyright"}}}]);