import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title'
import Header from './Header'
import SideMenu from './SiderMenu'
import NavBar from './NavBar'
import Breadcrumb from './Breadcrumb'
import { connect } from 'dva'
import styles from './BasicLayout.less'
const { Content } = Layout

@connect(({ app }) => ({
    collapsed: app.collapsed,
    theme: app.siderStyle,
    navStyle: app.navStyle,
    menuData: app.menuData,
    navActiveKey: app.navActiveKey,
    breadcrumbList: app.breadcrumbList,
    currentUser: app.currentUser
}))
class BasicLayout extends PureComponent {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'app/getMenus'
        })
        dispatch({
            type: 'app/getCurrentUser'
        })
    }

    /**侧边栏折叠/收缩*/
    toggleCollapsed = (collapsed) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'app/toggleCollapsed',
            payload: collapsed
        })
    }

    getLayoutStyle = () => {
        const { collapsed } = this.props;
        return {
            paddingLeft: collapsed ? '80px' : '268px',
        }
    }

    //获取页面标题
    getPageTitle = () => {
        const {breadcrumbList} = this.props;
        if(breadcrumbList&&breadcrumbList.length>0){
            const page=breadcrumbList.pop();
            return page.name+" - "+'Management Sys'
        }
        return 'Management Sys'
    }

    render() {
        const children = this.props.children;
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <Layout className={styles.layout} style={{ ...this.getLayoutStyle() }}>
                    <SideMenu {...this.props} onCollapse={this.toggleCollapsed}></SideMenu>
                    <Layout>
                        <Header {...this.props} onCollapse={this.toggleCollapsed} ></Header>
                        {this.props.navStyle === "breadcrumb" ? <Breadcrumb {...this.props} /> : <NavBar />}
                        <Content style={{ padding: '12px 12px 0', overflow: 'initial' }}>{children}</Content>
                    </Layout>
                </Layout>
            </DocumentTitle>
        )
    }
}

export default BasicLayout