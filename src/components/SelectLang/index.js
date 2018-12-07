import React, { PureComponent } from 'react'
import { Dropdown, Menu,Icon } from 'antd'
import { setLocale, getLocale, FormattedMessage } from 'umi/locale';
const MenuItem = Menu.Item;


class SelectLang extends PureComponent {

    /**设置语言 */
    changLang = ({ key }) => {
        setLocale(key)
    }

    render() {
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
                <a href="#">
                    <FormattedMessage id="navbar.lang" />
                    <Icon type="caret-down" />
                </a>
            </Dropdown>
        )
    }
}

export default SelectLang;