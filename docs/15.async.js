(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[15],{yjQL:function(e,t,a){"use strict";var l=a("TqRt"),i=a("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("+L6B");var d=l(a("2/Rp"));a("P2fV");var n=l(a("NJEC"));a("/zsF");var s=l(a("PArb"));a("+BJd");var r=l(a("mr32"));a("miYZ");var o=l(a("tsqr")),u=l(a("MVZn"));a("2qtc");var m=l(a("kLXV"));a("giR+");var f=l(a("fyUT"));a("5NDa");var p=l(a("5rEg"));a("OaEy");var c=l(a("2fM7")),h=l(a("pVnL"));a("nRaC");var g=l(a("5RzL"));a("Pwec");var y=l(a("CtXQ")),E=l(a("o0o1")),b=l(a("yXPU"));a("y8nQ");var v,M,V,_,C,z,F=l(a("Vl3Y")),x=i(a("q1tI")),I=l(a("/L/i")),w=a("LLXN"),L=a("Hg0r"),k=a("+n12"),T=a("Yfch"),O=a("MJpP"),S=(v=F.default.create(),v((V=class extends x.PureComponent{constructor(){var e;super(...arguments),e=this,this.state={parent_type:"",type:""},this.handleOk=(()=>{var e=this.props,t=e.form,a=e.handleSave;t.validateFieldsAndScroll((e,t)=>{e||(t.parent_id=t.parent_id?t.parent_id:0,t.sort_no=t.sort_no?t.sort_no:1,a(t))})}),this.handleexistOrganization=function(){var t=(0,b.default)(E.default.mark(function t(a,l,i){var d,n,s,r,o,u,m,f;return E.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return d=e.props,n=d.editInfo,s=d.form,r=s.getFieldValue("parent_id"),o={name:l,parent_id:r||0},n&&(o.id=n.id),t.next=6,(0,O.existOrganization)(o);case 6:u=t.sent,m=u.code,f=u.data,!m&&f.exist&&i((0,w.formatMessage)({id:"validation.name.existed"})),i();case 11:case"end":return t.stop()}},t)}));return function(e,a,l){return t.apply(this,arguments)}}(),this.handleChangeType=(e=>{this.setState({type:e})}),this.handleTreeChange=((e,t,a)=>{var l=a.triggerNode;this.setState({parent_type:l?l.props.type:"",type:""}),this.props.form.setFieldsValue({type:""})}),this.initTree=(e=>{this.setState({parent_type:e||""}),this.handleChangeType(this.props.form.getFieldValue("type"))})}componentDidMount(){this.props.triggerRef(this)}render(){var e=this.props,t=e.form.getFieldDecorator,a=e.handleModalVisible,l=e.modalVisible,i=e.editInfo,d=e.dropList,n=e.mode,s=e.parent_id,r=this.state,o=(r.type,r.parent_type),u={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:14}}};return x.default.createElement(m.default,{destroyOnClose:!0,title:x.default.createElement("span",null,n?x.default.createElement("span",null,x.default.createElement(y.default,{type:"plus"})," ",x.default.createElement(w.FormattedMessage,{id:"system.organization.modal.add"})):x.default.createElement("span",null,x.default.createElement(y.default,{type:"edit"})," ",x.default.createElement(w.FormattedMessage,{id:"system.organization.modal.edit"}))),visible:l,onOk:this.handleOk,onCancel:()=>a()},x.default.createElement(F.default,null,x.default.createElement(F.default.Item,(0,h.default)({},u,{label:(0,w.formatMessage)({id:"label.upper"})}),t("parent_id",{initialValue:n?s:i.parent_id,validateFirst:!0,rules:[]})(x.default.createElement(g.default,{disabled:!n,treeDefaultExpandAll:!0,dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:d,onChange:this.handleTreeChange}))),x.default.createElement(F.default.Item,(0,h.default)({},u,{label:(0,w.formatMessage)({id:"label.type"})}),t("type",{initialValue:n?"":i.type,rules:[{required:!0,message:(0,w.formatMessage)({id:"validation.type.required"})}]})(x.default.createElement(c.default,{disabled:!n,onChange:this.handleChangeType},1==o||2==o?x.default.createElement(c.default.Option,{value:2},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.area"})):null,1==o||2==o?x.default.createElement(c.default.Option,{value:3},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.subcompany"})):null,x.default.createElement(c.default.Option,{value:4},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.department"})),x.default.createElement(c.default.Option,{value:5},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.team"}))))),x.default.createElement(F.default.Item,(0,h.default)({},u,{label:(0,w.formatMessage)({id:"label.name"})}),t("name",{initialValue:n?"":i.name,validateFirst:!0,rules:[{required:!0,whitespace:!1,message:(0,w.formatMessage)({id:"validation.name.required"})},{pattern:T.regTitle,message:(0,w.formatMessage)({id:"validation.name"})},{validator:this.handleexistOrganization}]})(x.default.createElement(p.default,null))),x.default.createElement(F.default.Item,(0,h.default)({},u,{label:(0,w.formatMessage)({id:"label.name-short"})}),t("name_short",{initialValue:n?"":i.name_short})(x.default.createElement(p.default,null))),x.default.createElement(F.default.Item,(0,h.default)({},u,{label:(0,w.formatMessage)({id:"label.sort"})}),t("sort_no",{initialValue:n?"":i.sort_no})(x.default.createElement(f.default,{min:0,step:1,style:{width:"100%"}})))))}},M=V))||M),D=(_=(0,L.connect)(e=>{var t=e.organization,a=e.loading;return{data:t.data,dropList:t.dropList,loading:a.effects["organization/getList"]}}),_((z=class extends x.PureComponent{constructor(){super(...arguments),this.state={sortedInfo:{},filteredInfo:{},modalVisible:!1,modalVisible:!1,modalMode:!0,editInfo:{},parent_id:""},this.initDropList=(()=>{var e=this.props.dispatch;e({type:"organization/getDropList"})}),this.handleChange=((e,t)=>{this.setState({sortedInfo:(0,u.default)({},e),filteredInfo:(0,u.default)({},t)})}),this.handleDelete=(e=>{var t=this.props.dispatch;t({type:"organization/delete",payload:{id:e},callback:()=>{o.default.success((0,w.formatMessage)({id:"msg.deleted"}))}})}),this.handleModalVisible=(e=>{this.setState({modalVisible:!this.state.modalVisible})}),this.handleCreate=((e,t)=>{this.setState({parent_id:e||"",modalMode:!0,modalVisible:!this.state.modalVisible},()=>{this.child.initTree(t)})}),this.handleEdit=(e=>{this.setState({modalMode:!1,editInfo:e,modalVisible:!this.state.modalVisible},()=>{var t=e.type;this.child.initTree(3==t?2:1)})}),this.handleSave=(e=>{var t=this.props.dispatch,a=this.state,l=a.modalMode,i=a.editInfo;t({type:l?"organization/create":"organization/update",payload:l?e:Object.assign(e,{id:i.id}),callback:()=>{this.setState({modalVisible:!1,modalVisible:!1}),o.default.success(l?(0,w.formatMessage)({id:"msg.created"}):(0,w.formatMessage)({id:"msg.updated"})),this.initDropList()}})}),this.bindRef=(e=>{this.child=e})}componentDidMount(){this.initDropList()}render(){var e=this.props,t=e.data,a=e.loading,l=e.dropList,i=(this.state.sortedInfo,[{title:(0,w.formatMessage)({id:"label.name"}),key:"name",dataIndex:"name",fixed:!0,width:300},{title:(0,w.formatMessage)({id:"label.name-short"}),key:"name_short",dataIndex:"name_short",fixed:!0,width:200},{title:(0,w.formatMessage)({id:"label.type"}),key:"type",dataIndex:"type",width:140,render:e=>x.default.createElement("span",null,1==e?x.default.createElement(r.default,{color:"orange"},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.company"})):2==e?x.default.createElement(r.default,{color:"green"},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.area"})):3==e?x.default.createElement(r.default,{color:"orange"},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.subcompany"})):x.default.createElement(r.default,{color:"blue"},x.default.createElement(w.FormattedMessage,{id:"system.organization.type.department"})))},{title:(0,w.formatMessage)({id:"label.create-time"}),key:"create_time",dataIndex:"create_time",render:e=>x.default.createElement("span",null,(0,k.formatTime)(e))},{title:(0,w.formatMessage)({id:"label.operation"}),key:"operation",fixed:"right",width:200,render:(e,t)=>x.default.createElement("div",null,x.default.createElement("span",null,5!=t.type?x.default.createElement("span",null,x.default.createElement("a",{onClick:()=>this.handleCreate(t.id,t.type)},x.default.createElement(y.default,{type:"plus"})," ",x.default.createElement(w.FormattedMessage,{id:"system.organization.button.add"})),x.default.createElement(s.default,{type:"vertical"})):null,x.default.createElement("a",{onClick:()=>this.handleEdit(t)},x.default.createElement(y.default,{type:"edit"})," ",x.default.createElement(w.FormattedMessage,{id:"label.edit"})),1!=t.type?x.default.createElement("span",null,x.default.createElement(s.default,{type:"vertical"}),x.default.createElement(n.default,{placement:"topRight",icon:x.default.createElement(y.default,{type:"question-circle",className:"danger"}),okText:(0,w.formatMessage)({id:"button.yes"}),cancelText:(0,w.formatMessage)({id:"button.no"}),title:(0,w.formatMessage)({id:"system.organization.delete.prompt"}),onConfirm:()=>this.handleDelete(t.id)},x.default.createElement("a",null,x.default.createElement(y.default,{type:"delete"})," ",x.default.createElement(w.FormattedMessage,{id:"label.delete"})))):null))}]),o=x.default.createElement(x.default.Fragment,null,x.default.createElement(d.default,{type:"primary",icon:"plus",onClick:()=>this.handleCreate("","")},x.default.createElement(w.FormattedMessage,{id:"button.add"}))),u={mode:this.state.modalMode,parent_id:this.state.parent_id,editInfo:this.state.editInfo,modalVisible:this.state.modalVisible,handleModalVisible:this.handleModalVisible,handleSave:this.handleSave,dropList:l,triggerRef:this.bindRef};return x.default.createElement(x.Fragment,null,x.default.createElement(I.default,{loading:a,url:"organization/getList",isTree:!0,data:t,columns:i,buttons:o,rowKey:"id",onChange:this.handleChange}),x.default.createElement(S,u))}},C=z))||C),R=D;t.default=R}}]);