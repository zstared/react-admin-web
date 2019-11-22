import login from './en-US/login'
import menu from './en-US/menu'
import component from './en-US/component'
import common from './en-US/common'
import setting from './en-US/setting'
import message from './en-US/message'
import system from './en-US/system'
import face_recognition from './en-US/face_recognition'
export default{
    "app.lang":'Languages',
    "app.no-data":'No Data',
    "home.account.setting":'Account Setting',
    "home.account.logout":"Logout",
    "home.notification.all":'All',
    "home.notification.all.empty":"You have processed all reminders.",
    "home.notification.notice":'Notification',
    "home.notification.notice.empty":"You have viewed all notifications.",
    "home.notification.message":'Message',
    "home.notification.message.empty":"You have viewed all messsages.",
    "home.notification.event":'Event',
    "home.notification.event.empty":"You have viewed all events.",
    "home.notification.clear":"Clear",
    "home.notification.cleared":"Cleared",
    'home.theme.pagestyle': 'Page style setting',
    'home.theme.pagestyle.dark': 'Dark style',
    'home.theme.pagestyle.light': 'Light style',
    'home.theme.themecolor': 'Theme Color',
    'home.theme.themecolor.dust': 'Dust Red',
    'home.theme.themecolor.volcano': 'Volcano',
    'home.theme.themecolor.sunset': 'Sunset Orange',
    'home.theme.themecolor.cyan': 'Cyan',
    'home.theme.themecolor.green': 'Polar Green',
    'home.theme.themecolor.daybreak': 'Daybreak Blue (default)',
    'home.theme.themecolor.geekblue': 'Geek Glue',
    'home.theme.themecolor.purple': 'Golden Purple',
    ...common,
    ...message,
    ...login,
    ...menu,
    ...component,
    ...setting,
    ...system,
    ...face_recognition
}