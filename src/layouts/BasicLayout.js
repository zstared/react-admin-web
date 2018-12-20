import React, { PureComponent, Suspense } from 'react';
import PageLoading from '../components/PageLoading'
import { Layout } from 'antd';
import Header from './Header'
import SideMenu from './SiderMenu'
import { connect } from 'dva'
import styles from './BasicLayout.less'

//const SideMenu = React.lazy(() => import('./SiderMenu'))
const { Content } = Layout

@connect(({ app }) => ({
    collapsed: app.collapsed,
    theme:app.siderStyle
}))
class BasicLayout extends PureComponent {

    constructor(props) {
        super(props)
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

    render() {
        const children = this.props.children;
        return (
            <Layout className={styles.layout} style={{ ...this.getLayoutStyle() }}>
                
                    <SideMenu {...this.props} onCollapse={this.toggleCollapsed}></SideMenu>
               
                <Layout>
                    <Header  {...this.props} onCollapse={this.toggleCollapsed} ></Header>
                    <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>{children}</Content>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout