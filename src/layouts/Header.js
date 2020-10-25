import React, { PureComponent } from 'react';
import { Layout, Avatar, Dropdown, Menu, Icon } from 'antd';
import { FormattedMessage } from 'umi/locale';
import SelectLang from '../components/SelectLang'
import Notification from './Notification'
import styles from './Header.less'
import avatar from '../assets/avatar.svg'
import router from 'umi/router';
const { Header } = Layout
const MenuItem = Menu.Item



class HeaderContent extends PureComponent {

    /**侧边栏折叠/展开 */
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed)
    }

    handleClick = (item) => {
        if (item.key === "logout") {
            const { dispatch } = this.props;
            dispatch({
                type: 'oauth/logout'
            })
        } else if (item.key === "setting") {
            router.push('/user/setting')
        }
    }

    render() {
        const { collapsed, currentUser } = this.props;
        const userMenu = (
            <Menu onClick={this.handleClick}>
                <MenuItem key="setting">
                    <Icon type="setting" /> <FormattedMessage id='home.account.setting' />
                </MenuItem>
                <Menu.Divider />
                <MenuItem key="logout">
                    <Icon type="logout" /> <FormattedMessage id='home.account.logout' />
                </MenuItem>
            </Menu>
        )

        return (
            <Header style={{ padding: 0 }}>
                <div className={styles.header}>
                    {
                        <span className={styles.trigger} onClick={this.toggle}>
                            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </span>
                    }
                    {
                        // <span className={styles.nav}> <Icon type="home" size="lg" /></span>
                        // <span className={styles.nav}> <Icon type="cogs" size="lg" /> <span>后台管理</span></span>
                        // <span className={styles.nav}> <Icon type="sitemap" size="lg" /> <span>人力资源</span></span>
                        // <span className={styles.nav}> <Icon type="handshake" size="lg" /> <span>客户关系</span></span>
                        // <span className={styles.nav}> <Icon type="truck" size="lg" /> <span>进销存</span></span>
                    }
                    <div className={styles.right}>
                        {/* <a className={styles.action} href="https://github.com/zstared/react-admin-web" target="_blank" ><Icon type="github" /></a> */}
                        {/* <SelectLang className={styles.action} type="icon" /> */}
                        {/* <Notification className={styles.action}></Notification> */}
                        {/* <Dropdown overlay={userMenu} className={`${styles.action} ${styles.account}`} >
                            <span>
                                <Avatar className={styles.avatar} src={currentUser.avatar_file ? currentUser.avatar_file.thumbUrl : avatar} ></Avatar>
                                <span className={styles.name}>{currentUser.name_cn}</span>
                            </span>
                        </Dropdown> */}
                        <div className={`${styles.action} ${styles.account}`}>
                            <span>
                                <Avatar className={styles.avatar} src={currentUser.avatar_file ? currentUser.avatar_file.thumbUrl : avatar} ></Avatar>
                                <span className={styles.name}>{currentUser.name_cn}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </Header>
        )
    }
}

export default HeaderContent;