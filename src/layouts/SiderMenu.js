import React, { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd'
import className from 'classnames'
import Link from 'umi/link'
import styles from './SiderMenu.less'
import logo from '../assets/react.svg'
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const menuData = [
    {
        resource_id: 1, resource_name: '系统管理', path: '', children: [
            { resource_id: 2, resource_name: '用户管理', path: '/system/user', permission: [''] },
            { resource_id: 3, resource_name: '角色管理', path: '/system/role' },
            { resource_id: 4, resource_name: '菜单权限', path: '/system/resource' },
        ]
    }
]
class SiderMenu extends PureComponent {
    constructor(props) {
        super(props)
    }


    render() {
        const { collapsed, onCollapse,theme } = this.props;
        return (
            <Sider className={className(styles.sider, styles.fixSiderbar,{[styles.light]:theme==='light'})}
                width={268} collapsible trigger={null}
                theme={theme}
                collapsed={collapsed} breakpoint="lg" onCollapse={onCollapse} >
                <div className={styles.logo} id="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>Management Sys</h1>
                    </Link>
                </div>
                <Menu theme={theme} mode="inline" >
                    <Menu.Item><Link to="/home"><Icon type="home" /><span>工作台</span></Link></Menu.Item>
                    <SubMenu title={<span><Icon type="setting" className={styles.icon} /><span>系统管理</span></span>}>
                        <Menu.Item><Link to="/system/user">用户管理</Link></Menu.Item>
                        <Menu.Item><Link to="/system/role">角色管理</Link></Menu.Item>
                        <Menu.Item><Link to="/system/resource">资源管理</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default SiderMenu;