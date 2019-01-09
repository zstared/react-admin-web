import React, { PureComponent } from 'react'
import { Menu } from 'antd';
import CustomPage from '@/components/CustomPage'
import styles from './Index.less'
import Link from 'umi/link'
class Setting extends PureComponent {

    /**菜单切换 */
    handleClick=()=>{
        
    }

    render() {
        const { children } = this.props;
        return (
            <CustomPage>
                <div className={styles.setting}>
                    <Menu mode="inline" style={{ width: 240 }} >
                        <Menu.Item key="base"><Link to="/user/setting/base">基本设置</Link></Menu.Item>
                        <Menu.Item><Link to="/user/setting/security">安全设置</Link></Menu.Item>
                        <Menu.Item><Link to="/user/setting/theme">主题风格</Link></Menu.Item>
                    </Menu>
                    <div className={styles.content} >{ children }</div>
                </div>
            </CustomPage>
        )
    }
}
export default Setting;