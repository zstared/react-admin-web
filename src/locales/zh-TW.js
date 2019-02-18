import login from './zh-TW/login'
import menu from './zh-TW/menu'
import component from './zh-TW/component'
import common from './zh-TW/common'
import setting from './zh-TW/setting'
export default{
    "app.lang":'選擇語言',
    "app.no-data":'暫無數據',
    "home.account.setting":'個人設置',
    "home.account.logout":"退出登錄",
    "home.notification.all":'所有',
    "home.notification.all.empty":"你已處理完所有提醒事項",
    "home.notification.notice":'通知',
    "home.notification.notice.empty":"你已查看所有通知",
    "home.notification.message":'消息',
    "home.notification.message.empty":"你已讀完所有消息",
    "home.notification.event":'待辦',
    "home.notification.event.empty":"你已完成所有待辦",
    "home.notification.clear":"清空",
    "home.notification.cleared":"已清空",
    'home.theme.pagestyle': '整體風格設置',
    'home.theme.pagestyle.dark': '暗色菜單風格',
    'home.theme.pagestyle.light': '亮色菜單風格',
    'home.theme.themecolor': '主題色',
    'home.theme.themecolor.dust': '薄暮',
    'home.theme.themecolor.volcano': '火山',
    'home.theme.themecolor.sunset': '日暮',
    'home.theme.themecolor.cyan': '明青',
    'home.theme.themecolor.green': '極光綠',
    'home.theme.themecolor.daybreak': '拂曉藍（默認）',
    'home.theme.themecolor.geekblue': '極客藍',
    'home.theme.themecolor.purple': '醬紫',
    ...common,
    ...login,
    ...menu,
    ...component,
    ...setting
}