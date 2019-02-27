import React, { PureComponent } from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import SelectLang from '../components/SelectLang'
import Notification from './Notification'
import styles from './Header.less'
import avatar from '../assets/avatar.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const { Header } = Layout
const MenuItem = Menu.Item



class HeaderContent extends PureComponent {

    /**侧边栏折叠/展开 */
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed)
    }

    render() {
        const { collapsed, currentUser } = this.props;
        const userMenu = (
            <Menu onClick={this.changLang}>
                <MenuItem key="setting">
                    <Link to="/user/setting">
                        <FontAwesomeIcon icon="user-cog" /> <FormattedMessage id='home.account.setting' />
                    </Link>
                </MenuItem>
                <Menu.Divider />
                <MenuItem key="logout">
                    <Link to="/login">
                        <FontAwesomeIcon icon="sign-out-alt" /> <FormattedMessage id='home.account.logout' />
                    </Link>
                </MenuItem>
            </Menu>
        )

        return (
            <Header style={{ padding: 0 }}>
                <div className={styles.header}>
                    {
                        <span className={styles.trigger} onClick={this.toggle}>
                            <FontAwesomeIcon icon={collapsed ? 'indent' : 'outdent'} size="lg" />
                        </span>
                    }
                    {
                    // <span className={styles.nav}> <FontAwesomeIcon icon="home" size="lg" /></span>
                    // <span className={styles.nav}> <FontAwesomeIcon icon="cogs" size="lg" /> <span>后台管理</span></span>
                    // <span className={styles.nav}> <FontAwesomeIcon icon="sitemap" size="lg" /> <span>人力资源</span></span>
                    // <span className={styles.nav}> <FontAwesomeIcon icon="handshake" size="lg" /> <span>客户关系</span></span>
                    // <span className={styles.nav}> <FontAwesomeIcon icon="truck" size="lg" /> <span>进销存</span></span>
                    }
                    <div className={styles.right}>
                        <a className={styles.action} href="https://github.com/zstared/react-admin-web" target="_blank" ><FontAwesomeIcon icon={["fab","github"]} size="lg" /></a>
                        <SelectLang className={styles.action} type="icon" />
                        <Notification className={styles.action}></Notification>
                        <Dropdown overlay={userMenu} className={`${styles.action} ${styles.account}`} >
                            <span>
                                <Avatar className={styles.avatar} src={currentUser.avatar ? currentUser.avatar_file.thumbUrl : avatar} ></Avatar>
                                <span className={styles.name}>{currentUser.name_cn}</span>
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </Header>
        )
    }
}

export default HeaderContent;