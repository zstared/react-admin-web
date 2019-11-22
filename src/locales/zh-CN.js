import login from './zh-CN/login'
import menu from './zh-CN/menu'
import component from './zh-CN/component'
import common from './zh-CN/common'
import setting from './zh-CN/setting'
import message from './zh-CN/message'
import system from './zh-CN/system'
import face_recognition from './zh-CN/face_recognition'
export default{
    "app.lang":'选择语言',
    "app.no-data":'暂无数据',
    "home.account.setting":'个人设置',
    "home.account.logout":"退出登录",
    "home.notification.all":'所有',
    "home.notification.all.empty":"你已处理完所有提醒事项",
    "home.notification.notice":'通知',
    "home.notification.notice.empty":"你已查看所有通知",
    "home.notification.message":'消息',
    "home.notification.message.empty":"您已读完所有消息",
    "home.notification.event":'待办',
    "home.notification.event.empty":"你已完成所有待办",
    "home.notification.clear":"清空",
    "home.notification.cleared":"已清空",
    'home.theme.pagestyle': '整体风格设置',
    'home.theme.pagestyle.dark': '暗色菜单风格',
    'home.theme.pagestyle.light': '亮色菜单风格',
    'home.theme.themecolor': '主题色',
    'home.theme.themecolor.dust': '薄暮',
    'home.theme.themecolor.volcano': '火山',
    'home.theme.themecolor.sunset': '日暮',
    'home.theme.themecolor.cyan': '明青',
    'home.theme.themecolor.green': '极光绿',
    'home.theme.themecolor.daybreak': '拂晓蓝（默认）',
    'home.theme.themecolor.geekblue': '极客蓝',
    'home.theme.themecolor.purple': '酱紫',
    ...common,
    ...message,
    ...login,
    ...menu,
    ...component,
    ...setting,
    ...system,
    ...face_recognition
}