import React, { PureComponent } from 'react';
import { Layout, Avatar, Dropdown, Menu, Icon } from 'antd';
import Link from 'umi/link';
import { FormattedMessage } from 'umi/locale';
import SelectLang from '../components/SelectLang'
import Notification from './Notification'
import styles from './Header.less'
import avatar from '../assets/avatar.svg'
const { Header } = Layout
const MenuItem = Menu.Item


   
class HeaderContent extends PureComponent {

    /**侧边栏折叠/展开 */
    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed)
    }

    render() {
        const { collapsed,currentUser } = this.props;
        const userMenu = (
            <Menu onClick={this.changLang}>
                <MenuItem key="setting">
                    <Link to="/user/setting">
                        <Icon type="setting" /> <FormattedMessage id='home.account.setting' />
                    </Link>
                </MenuItem>
                <Menu.Divider />
                <MenuItem key="logout">
                    <Link to="/login">
                        <Icon type="logout" /> <FormattedMessage id='home.account.logout' />
                    </Link>
                </MenuItem>
            </Menu>
        )

        return (
            <Header style={{ padding: 0 }}>
                <div className={styles.header}>
                    <Icon
                        className={styles.trigger}
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                    <div className={styles.right}>
                        <a className={styles.action} href="https://github.com/zstared/react-admin-web" target="_blank" ><Icon type="github" /></a>
                        <SelectLang className={styles.action} type="icon" />
                        <Notification className={styles.action}></Notification>
                        <Dropdown overlay={userMenu} className={`${styles.action} ${styles.account}`} >
                            <span>
                                <Avatar className={styles.avatar} src={avatar} ></Avatar>
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