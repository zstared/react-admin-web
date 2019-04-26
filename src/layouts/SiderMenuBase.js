import React, { PureComponent } from 'react'
import { Menu, Icon } from 'antd';
import { FormattedMessage } from 'umi/locale'
import Link from 'umi/link'
import { isUrl } from '@/utils/utils';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

/**获取图标 */
const getIcon = icon => {
    if (typeof icon === 'string' && isUrl(icon)) {
        return <img src={icon} alt="icon" style={{ width: '14px', marginRight: '10px' }} />;
    }
    if (typeof icon === 'string' && icon) {
        return <Icon className="anticon"  type={icon} /> ;
    }
    return icon;
};

class SiderBaseMenu extends PureComponent {

    /**获取菜单项 */
    getNavMenuItems = (menuData) => {
        if (!menuData) {
            return []
        } else {
            return menuData.map(item => this.getSubMenuOrItem(item))
        }
    }

    /**获取本地化菜单名 */
    getLocaleName = (locale) => {
        return <FormattedMessage id={`menu.${locale}`} />
    }

    /**获取目录菜单或子菜单 */
    getSubMenuOrItem = item => {
        if (item.resource_type != 3) {
            if (item.children && item.children.length > 0&&item.resource_type!=2) {
                const { name, icon, path, children, locale } = item
                return (
                    <SubMenu title={icon ? (<span>{getIcon(icon)}<span>{this.getLocaleName(locale)}</span></span>) : (name)} key={locale}>
                        {this.getNavMenuItems(children)}
                    </SubMenu>
                )
            }
            return <MenuItem key={item.path}>{this.getMenuItemPath(item)}</MenuItem>
        } return null;
    }

    /**获取链接菜单 */
    getMenuItemPath = (item) => {
        const { name, locale, path } = item;
        const icon = getIcon(item.icon);

        if (/^https?:\/\//.test(path)) {
            return (
                <a href={path} target='_bank'>
                    {icon}
                    <span>{this.getLocaleName(locale)}</span>
                </a>
            );
        }
        const { location } = this.props;
        return (
            <Link
                to={path}
                replace={path === location.pathname}
                state={{ title: 'abc' }}
            >
                {icon}
                <span>{this.getLocaleName(locale)}</span>
            </Link>
        )
    }

    //获取初始打开的菜单目录
    getOpenKeys = (activeKey) => {
        if (activeKey) {
            return [activeKey.split('/').slice(0, -1).join('/')]
        }
        return []
    }

    render() {
        const { theme, mode, menuData, navActiveKey } = this.props;
        return (
            <Menu theme={theme} mode={mode} selectedKeys={[navActiveKey]}  >
                {this.getNavMenuItems(menuData)}
            </Menu>
        )
    }
}



export default SiderBaseMenu