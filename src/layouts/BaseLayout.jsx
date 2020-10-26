import React, { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Icon } from 'antd';
import styled from 'styled-components';
import { UserOutlined, SettingOutlined, AppstoreOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'umi';

import logo from '../assets/images/logo.png'

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu

const Wrapper = styled.div`

  .content{
    display: flex;
    flex: auto;
    flex-direction: column;
    min-height: 0;
    background: #f0f2f5;
    overflow-x:hidden;

    .header{
    padding: 0px;
    height: 48px;
    line-height: 48px;
    width: 100%;
    z-index: 19;

    .header-content{
        overflow:hidden;
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 16px;
        background: #fff;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
  }
}

  

  .sider{
    overflow:auto;
    height: 100vh;
    position: fixed;
    left: 0;
    color:#fff;
    transition: background-color .3s;
    .ant-layout-sider-trigger{
        transition: background-color .3s;
    }
      .logo{
            position: relative;
            display: flex;
            align-items: center;
            padding: 16px;
            line-height: 32px;
            cursor: pointer;
            font-size:18px;
            font-weight:bold;
            .home{
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 32px;
                img {
                    display: inline-block;
                    height: 32px;
                    vertical-align: middle;
                    transition: height .2s;
                }
                .title{
                    display: inline-block;
                    height: 32px;
                    margin: 0 0 0 12px;
                    color: #fff;
                    font-weight: 600;
                    font-size: 18px;
                    line-height: 32px;
                    vertical-align: middle;
                    animation: fade-in;
                    animation-duration: .2s;
                }
            }
          
        }
  }

  
`

const BaseLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false)
    const [breadcrumb, setBreadcrumb] = useState([])

    const userMenu = (
        <Menu>
            <Menu.Item key='logout'>
                <Icon type='logout' /> 退出登录
            </Menu.Item>
        </Menu>
    );

    const menus = [
        {
            name: '生产管理',
            code: 'production',
            icon: <AppstoreOutlined />,
            children: [
                { name: "订单任务采购", code: "order", path: "/production/order" },
                { name: "库存安全", code: "inventory", path: "/production/inventory" },
                { name: "投料单生成采购", code: "purchase", path: "/production/purchase" },
            ]
        },
        {
            name: '系统管理',
            code: 'system',
            icon: <SettingOutlined />,
            children: [
                { name: "用户管理", code: "user", path: "/system/user" },
                { name: "角色管理", code: "role", path: "/system/role" },
                { name: "资源管理", code: "resource", path: "/system/resource" },
                { name: "日志管理", code: "log", path: "/system/log" },
            ]
        },
    ]

    //收缩 展开 侧边栏
    const handleCollapse = (val) => {
        setCollapsed(val)
    }

    //点击菜单项
    const handleMenuItemClick = (menu) => {
        const first = menu.keyPath[1];
        const second = menu.keyPath[0]

        const first_menu = menus.find(item => item.code == first)
        const second_menu = first_menu.children.find(item => item.code == second);

        setBreadcrumb([first_menu.name, second_menu.name])
    }

    return (
        <Wrapper>
            <Layout>
                <Sider
                    collapsible
                    className="sider"
                    onCollapse={handleCollapse}
                    collapsed={collapsed}
                    collapsedWidth={48}
                >
                    <div className="logo" style={{ padding: collapsed ? "16px 8px" : "" }} >
                        <Link className="home" to="/" onClick={() => setBreadcrumb([])}><img src={logo}></img> {collapsed ? "" : <span className="title">生产管理系统</span>}</Link>
                    </div>
                    <Menu theme="dark" mode="inline" style={{ width: '100%' }} onClick={handleMenuItemClick}>
                        {
                            menus.map(item => {
                                return <SubMenu key={item.code} icon={<AppstoreOutlined />} title={item.name}>
                                    {
                                        item.children.map(child => {
                                            return <Menu.Item key={child.code}> <Link to={child.path}>{child.name}</Link></Menu.Item>
                                        })
                                    }
                                </SubMenu>
                            })
                        }
                    </Menu>
                </Sider>
                <Layout style={{ marginLeft: collapsed ? "48px" : "200px" }} className="content">
                    <Header className="header">
                        <div className="header-content">
                            <Breadcrumb
                                style={{ margin: '16px 0', flex: '1 1 0%' }}>
                                {breadcrumb.length > 0 ? <Breadcrumb.Item >
                                    <Link to='/home' onClick={() => setBreadcrumb([])}>
                                        首页
                                    </Link>
                                </Breadcrumb.Item> : null}
                                {
                                    breadcrumb.map(bread => (
                                        <Breadcrumb.Item>{bread}</Breadcrumb.Item>
                                    ))
                                }

                            </Breadcrumb>
                            <div>
                                <Dropdown overlay={userMenu} className=''>
                                    <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
                                </Dropdown>
                            </div>
                        </div>
                    </Header>
                    <Content>{children}</Content>
                </Layout>
            </Layout>
        </Wrapper>
    );
};

export default BaseLayout;
