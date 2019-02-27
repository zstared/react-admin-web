import React, { PureComponent } from 'react'
import { Dropdown, Menu } from 'antd'
import classNames from 'classnames'
import { setLocale, getLocale, formatMessage, FormattedMessage } from 'umi/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const MenuItem = Menu.Item;


class SelectLang extends PureComponent {

    /**设置语言 */
    changLang = ({ key }) => {
        setLocale(key)
    }

    render() {
        const { className, type } = this.props;
        const selectedLang = getLocale();
        const langMenu = (
            <Menu onClick={this.changLang} selectedKeys={[selectedLang]}>
                <MenuItem key="zh-CN"> 🇨🇳 简体中文</MenuItem>
                <MenuItem key="zh-TW"> 🇭🇰 繁體中文</MenuItem>
                <MenuItem key="en-US"> 🇬🇧 English</MenuItem>
            </Menu>
        )
        return (
            <Dropdown overlay={langMenu}>
                {type == "icon" ? (<span className={classNames(className)}>
                     <FontAwesomeIcon  icon="globe"  size="lg" />
                </span>) :
                    (<a href="#">
                        <FormattedMessage id="app.lang" />
                        <FontAwesomeIcon icon="caret-down" />
                    </a>)
                }
            </Dropdown>
        )
    }
}

export default SelectLang;