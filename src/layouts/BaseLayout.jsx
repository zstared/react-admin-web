import React from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Icon } from 'antd';
import styled from 'styled-components';
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const MenuItem = Menu.Item;

const HeaderWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 16px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
`;

const BaseLayout = ({ children }) => {
    const userMenu = (
        <Menu>
            <MenuItem key='logout'>
                <Icon type='logout' /> 退出登录
            </MenuItem>
        </Menu>
    );

    return (
        <Layout>
            <Sider
                collapsible
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}></Sider>
            <Layout>
                <Header>
                    <HeaderWrapper>
                        <Breadcrumb
                            style={{ margin: '16px 0', flex: '1 1 0%' }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>Order</Breadcrumb.Item>
                        </Breadcrumb>
                        <div>
                            <Dropdown overlay={userMenu} className=''>
                                <UserOutlined />
                            </Dropdown>
                        </div>
                    </HeaderWrapper>
                </Header>
                <Content>{children}</Content>
            </Layout>
        </Layout>
    );
};

export default BaseLayout;
