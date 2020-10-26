import React, { PureComponent } from 'react';
import { Tabs, Icon } from 'antd';
import { FormattedMessage,history } from 'umi';
import { connect } from 'dva';
import styles from './NavBar.less';
const TabPane = Tabs.TabPane;

@connect(({ app }) => ({
    navs: app.navs,
    navActiveKey: app.navActiveKey ? app.navActiveKey : '/home',
}))
class NavBar extends PureComponent {
    onChange = (activeKey) => {
        history.push(activeKey);
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    /**关闭导航菜单 */
    remove = (removeKey) => {
        let { navs, dispatch, navActiveKey } = this.props;
        let activeKey = navActiveKey;
        let removeIndex;
        navs.forEach((nav, i) => {
            if (nav.path === removeKey) {
                removeIndex = i;
            }
        });
        let new_navs = navs.filter((nav) => nav.path !== removeKey);
        if (activeKey == removeKey) {
            if (removeIndex == 0) {
                activeKey = '/home';
            } else {
                activeKey = navs[removeIndex - 1].path;
            }
        }
        history.push(activeKey);
        dispatch({
            type: 'app/removeNav',
            payload: new_navs,
        });
    };

    render() {
        const { navs, navActiveKey } = this.props;
        return (
            <div className={styles.navbar}>
                <Tabs
                    type='editable-card'
                    hideAdd={true}
                    onEdit={this.onEdit}
                    onChange={this.onChange}
                    activeKey={navActiveKey}
                    tabBarStyle={{ margin: 0 }}>
                    <TabPane
                        tab={
                            <span>
                                <Icon type='home'></Icon>
                                <FormattedMessage id='menu.home' />
                            </span>
                        }
                        key='/home'
                        closable={false}></TabPane>
                    {navs.map((nav) => (
                        <TabPane tab={nav.name} key={nav.path}></TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

export default NavBar;
