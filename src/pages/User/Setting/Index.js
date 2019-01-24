import React, { PureComponent } from 'react'
import { Menu } from 'antd';
import CustomPage from '@/components/CustomPage'
import styles from './Index.less'
import Link from 'umi/link'
import { FormattedMessage } from 'umi/locale'
class Setting extends PureComponent {

    /**菜单切换 */
    handleClick=()=>{
        
    }

    render() {
        const { children,location } = this.props;
        return (
            <CustomPage>
                <div className={styles.setting}>
                    <Menu mode="inline" style={{ width: 240 }} defaultSelectedKeys={[location.pathname]} >
                        <Menu.Item key="/user/setting/base"><Link to="/user/setting/base"><FormattedMessage id="menu.setting.base"/></Link></Menu.Item>
                        <Menu.Item key="/user/setting/security"><Link to="/user/setting/security"><FormattedMessage id="menu.setting.security"/></Link></Menu.Item>
                        <Menu.Item key="/user/setting/personalization"><Link to="/user/setting/personalization"><FormattedMessage id="menu.setting.personalization"/></Link></Menu.Item>
                    </Menu>
                    <div className={styles.content} >{ children }</div>
                </div>
            </CustomPage>
        )
    }
}
export default Setting;