(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[10],{CNDm:function(e,t,a){"use strict";var r=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.detect=l,t.matching=u,t.getPageList=d,t.getFaceSprite=p;var n=r(a("o0o1")),c=r(a("yXPU")),s=r(a("t3Un"));function l(e){return i.apply(this,arguments)}function i(){return i=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.default.post("/face_recognition/recognize/detect",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)})),i.apply(this,arguments)}function u(e){return o.apply(this,arguments)}function o(){return o=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.default.post("/face_recognition/recognize/matching",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)})),o.apply(this,arguments)}function d(e){return f.apply(this,arguments)}function f(){return f=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.default.get("/face_recognition/recognize/pageList",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)})),f.apply(this,arguments)}function p(e){return m.apply(this,arguments)}function m(){return m=(0,c.default)(n.default.mark(function e(t){return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.default.get("/face_recognition/recognize/sprite",t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)})),m.apply(this,arguments)}},Ksme:function(e,t,a){"use strict";var r=a("284h"),n=a("TqRt");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("2qtc");var c=n(a("kLXV"));a("+L6B");var s=n(a("2/Rp"));a("OaEy");var l=n(a("2fM7"));a("sRBo");var i=n(a("kaz8"));a("MXD1");var u=n(a("CFYs"));a("+BJd");var o=n(a("mr32")),d=n(a("o0o1")),f=n(a("yXPU")),p=r(a("q1tI")),m=n(a("uBsN")),h=n(a("Wa0w")),g=a("CNDm"),_=.4,v=.5,x=.6;class w extends p.PureComponent{constructor(){var e;super(...arguments),e=this,this.state={fileCode:"",face_sprite_imgs:[],type_id:0,face_url:"",page_index:1,page_size:20,rows:[],is_more:!0,next_rows:[],face_count:0,is_loading:!1,progress_per:0,similarity:0,matchs:[],detect_url:"",mark_checked:!0,match_modal:!1,match_data:{}},this.handleChange=(e=>{this.setState({fileCode:e.length>0?e[0].code:"",matchs:[],detect_url:e.length>0?e[0].url:""})}),this.initMatchigState=(0,f.default)(d.default.mark(function t(){return d.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise(t=>{e.setState({page_index:1,rows:[],is_more:!0,next_rows:[],is_loading:!0},()=>{t()})}));case 1:case"end":return t.stop()}},t)})),this.matching=(0,f.default)(d.default.mark(function t(){var a,r,n,c,s,l,i,u,o,f,p,m,h,_,v,w,z,k,y,E,b,S,C;return d.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=Date.now(),e.setState({is_loading:!0,progress_per:1}),t.next=4,(0,g.detect)({file_code:e.state.fileCode});case 4:if(r=t.sent,n=r.code,r.data,!n){t.next=10;break}return e.setState({is_loading:!1,progress_per:0}),t.abrupt("return");case 10:return t.next=12,e.initMatchigState();case 12:return c=e.state.is_more,t.prev=13,t.next=16,e.getPageList();case 16:t.next=21;break;case 18:t.prev=18,t.t0=t["catch"](13),c=!1;case 21:s=0,l=[];case 23:if(!c){t.next=79;break}t.prev=24,i=e.state,u=i.rows,o=i.is_more,f=i.next_rows,p=i.count,m=i.mark_checked,console.log(o),h=u.concat(f),_=0;case 29:if(!(_<h.length)){t.next=71;break}if(0==_&&o){e.state.rows.splice(0,u.length);try{e.getPageList()}catch(e){c=!1}}s++,v=!0,w=!1,z=void 0,t.prev=35,k=h[_].file_info[Symbol.iterator]();case 37:if(v=(y=k.next()).done){t.next=54;break}return E=y.value,e.setState({progress_per:Math.floor(s/p*100)}),t.next=42,(0,g.matching)({face_code:E.code,face_id:h[_].id});case 42:if(b=t.sent,S=b.data,C=b.code,C){t.next=49;break}S.label&&(console.log(E.src),e.setState({similarity:Math.round(100*(1-S.distance)),face_url:m?E.faceSrc:E.src}),x-S.distance>0&&(S.url=E.src,l.push(S))),t.next=51;break;case 49:return e.setState({is_more:!1}),t.abrupt("break",54);case 51:v=!0,t.next=37;break;case 54:t.next=60;break;case 56:t.prev=56,t.t1=t["catch"](35),w=!0,z=t.t1;case 60:t.prev=60,t.prev=61,v||null==k.return||k.return();case 63:if(t.prev=63,!w){t.next=66;break}throw z;case 66:return t.finish(63);case 67:return t.finish(60);case 68:_++,t.next=29;break;case 71:c=o,t.next=77;break;case 74:t.prev=74,t.t2=t["catch"](24),e.setState({is_more:!1});case 77:t.next=23;break;case 79:l.sort((e,t)=>{return e.distance-t.distance}),l.length>3&&l.splice(3),e.setState({is_loading:!1,progress_per:0,similarity:0,matchs:l}),e.handleTypeChange(e.state.type_id),console.log("time:"+(Date.now()-a));case 84:case"end":return t.stop()}},t,null,[[13,18],[24,74],[35,56,60,68],[61,,63,67]])})),this.getPageList=function(){var t=(0,f.default)(d.default.mark(function t(a){var r,n,c,s,l,i,u;return d.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=e.state,n=r.page_index,c=r.page_size,s=r.type_id,t.next=3,(0,g.getPageList)({page_index:n,page_size:c,type_id:s});case 3:return l=t.sent,i=l.code,u=l.data,t.abrupt("return",new Promise((t,r)=>{if(i)r();else{var n=u.rows,c=u.is_more,s=u.page_index,l=u.count,o={count:l,is_more:c,page_index:s+1};a?o.next_rows=n:o.rows=n,e.setState(o,()=>{t()})}}));case 7:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),this.handleTypeChange=function(){var t=(0,f.default)(d.default.mark(function t(a){var r;return d.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:r=e.state.face_sprite_imgs.find(e=>e.id==a),e.setState({type_id:a,face_url:r?r.url:""});case 2:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}(),this.handleMarkChange=(e=>{this.setState({mark_checked:e.target.checked})}),this.handleOpenMatch=(e=>{this.setState({match_modal:!0,match_data:e})}),this.handleModalVisible=(()=>{this.setState({match_modal:!1})})}componentWillMount(){var e=this;return(0,f.default)(d.default.mark(function t(){var a,r;return d.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,g.getFaceSprite)();case 2:a=t.sent,r=a.data,e.setState({face_url:r.length>0?r[0].url+"?time="+Date.now():"",face_sprite_imgs:r,type_id:r.length>0?r[0].id:""});case 5:case"end":return t.stop()}},t)}))()}renderTag(e){var t=Math.round(100*(1-e)*100)/100+"%";return _-e>0?p.default.createElement(o.default,{color:"green"}," ",t," "):v-e>0?p.default.createElement(o.default,{color:"orange"}," ",t," "):p.default.createElement(o.default,{color:"red"}," ",t," ")}render(){var e=this.state,t=e.fileCode,a=e.face_url,r=e.is_loading,n=e.progress_per,o=e.similarity,d=e.matchs,f=e.detect_url,g=e.face_sprite_imgs,_=e.type_id,v=e.mark_checked,x=e.match_data;return p.default.createElement("div",{className:h.default.wrapper},p.default.createElement("div",{className:h.default.row},p.default.createElement("div",{className:h.default.columnRight},p.default.createElement("div",{className:h.default.title}," \u8bc6\u522b\u7167\u7247 ")," ",p.default.createElement(m.default,{maxLimit:1,data:{is_static:!0,is_compress:!0},onChange:this.handleChange})," ",p.default.createElement("div",{className:h.default.match})," ")," ",p.default.createElement("div",{className:h.default.columnCenter},p.default.createElement("div",{style:{fontSize:"16px",marginBottom:"20px"}},"VS ")," ",p.default.createElement(u.default,{type:"circle",strokeColor:{"0%":"#108ee9","100%":"#87d068"},percent:o})," ",p.default.createElement("div",{style:{fontSize:"16px",marginTop:"20px"}},"\u76f8\u4f3c\u5ea6 ")," ")," ",p.default.createElement("div",{className:h.default.columnLeft},p.default.createElement("div",{className:h.default.title},p.default.createElement(i.default,{checked:v,onChange:this.handleMarkChange}," \u8138\u6807 ")," ",p.default.createElement("span",null," \u4eba\u8138\u5e93 ")," ",p.default.createElement(l.default,{disabled:!!r,onChange:this.handleTypeChange,value:_,className:h.default.typeSelect,size:"small"},p.default.createElement(l.default.Option,{value:""},"\u6240\u6709 ")," ",g.map((e,t)=>{return p.default.createElement(l.default.Option,{key:t,value:e.id}," ",e.type_name," ")})," ")," ")," ",p.default.createElement("div",{className:h.default.faceWrapper}," ",""!=a?p.default.createElement("img",{className:h.default.face,src:a}):null)," ",n>0?p.default.createElement(u.default,{size:"small",className:h.default.progress,percent:n,status:"active",showInfo:!1}):null," ")," "),p.default.createElement("div",{className:h.default.button},p.default.createElement(s.default,{size:"large",type:"primary",disabled:!(t&&!r),onClick:()=>this.matching()},"\u5f00\u59cb\u6bd4\u5bf9 ")," ")," ",d.length>0?p.default.createElement("div",null,p.default.createElement("div",{className:h.default.matchsTitle}," \u5bf9\u6bd4\u7ed3\u679c ")," ",p.default.createElement("div",{className:h.default.matchs}," ",d.map((e,t)=>{Math.round(100*(1-e.distance)*100);return p.default.createElement("div",{key:t,className:h.default.match},p.default.createElement("img",{src:f})," ",p.default.createElement("div",{className:h.default.result},p.default.createElement("div",{className:h.default.resultInfo},p.default.createElement("span",null," ",e.label," ")," ",this.renderTag(e.distance)," ")," ",p.default.createElement(s.default,{size:"small",type:"primary",onClick:()=>this.handleOpenMatch(e)}," \u67e5\u770b ")," ")," ",p.default.createElement("img",{src:e.url})," ")})," ")," "):null," ",p.default.createElement(c.default,{width:"800px",title:null,visible:this.state.match_modal,footer:null,onCancel:this.handleModalVisible},p.default.createElement("div",{className:h.default.matchModal},p.default.createElement("img",{src:f})," ",p.default.createElement("div",{className:h.default.result},p.default.createElement("div",{className:h.default.resultInfo},p.default.createElement("span",null," ",x.label," ")," ",this.renderTag(x.distance)," ")," ")," ",p.default.createElement("img",{src:x.url})," ")," ")," ")}}t.default=w},Wa0w:function(e,t,a){e.exports={wrapper:"zxh-pages-face-recognition-recognize-wrapper",row:"zxh-pages-face-recognition-recognize-row",columnCenter:"zxh-pages-face-recognition-recognize-columnCenter",columnRight:"zxh-pages-face-recognition-recognize-columnRight",columnLeft:"zxh-pages-face-recognition-recognize-columnLeft",faceWrapper:"zxh-pages-face-recognition-recognize-faceWrapper",face:"zxh-pages-face-recognition-recognize-face",matchsTitle:"zxh-pages-face-recognition-recognize-matchsTitle",matchs:"zxh-pages-face-recognition-recognize-matchs",match:"zxh-pages-face-recognition-recognize-match",result:"zxh-pages-face-recognition-recognize-result",resultInfo:"zxh-pages-face-recognition-recognize-resultInfo",progress:"zxh-pages-face-recognition-recognize-progress",title:"zxh-pages-face-recognition-recognize-title",typeSelect:"zxh-pages-face-recognition-recognize-typeSelect",button:"zxh-pages-face-recognition-recognize-button",matchModal:"zxh-pages-face-recognition-recognize-matchModal"}}}]);