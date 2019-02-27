import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './Notification.less'
import { formatMessage, FormattedMessage } from 'umi/locale'
import { Badge, Popover, Tabs, List, Avatar, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import avatar from '../assets/avatar.svg'
const TabPane = Tabs.TabPane;

const data = [
    {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '你收到了 14 份新周报',
        datetime: '2017-08-09',
        type: '通知',
    }, {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '你推荐的 曲妮妮 已通过第三轮面试',
        datetime: '2017-08-08',
        type: '通知',
    }, {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '这种模板可以区分多种通知类型',
        datetime: '2017-08-07',
        read: true,
        type: '通知',
    },
    {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '标题三',
        read: false,
        description: '描述描述描述描述描述描述描述描述描述描述',
        datetime: '一天前',
        extra: ''
    },
    {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '标题三',
        read: false,
        description: '描述描述描述描述描述描述描述描述描述描述',
        datetime: '一天前',
        extra: ''
    },
    {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '标题三',
        read: false,
        description: '描述描述描述描述描述描述描述描述描述描述',
        datetime: '一天前',
        extra: ''
    },
    {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '标题三',
        read: false,
        description: '描述描述描述描述描述描述描述描述描述描述',
        datetime: '一天前',
        extra: ''
    },
    {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: '标题三',
        read: false,
        description: '描述描述描述描述描述描述描述描述描述描述',
        datetime: '一天前',
        extra: ''
    },
];

class Notification extends PureComponent {


    getNoticeList = (listData, typeInfo) => {
        const { emptyImage, emptyText } = typeInfo
        if (listData.length == 0) {
            return (
                <div className={styles.notFound}>
                    {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
                    <div>{emptyText}</div>
                </div>
            );
        }

        return (<div><List className={styles.list}
            dataSource={listData}
            renderItem={item => (
                <List.Item className={classNames(styles.item, { [styles.read]: item.read })}>
                    <List.Item.Meta
                        className={styles.meta}
                        avatar={<span className={styles.iconElement}><Avatar className={styles.avatar} src={avatar} /></span>}
                        title={
                            <div className={styles.title}>
                                {item.title}
                                <div className={styles.extra}>{item.extra}</div>
                            </div>
                        }
                        description={
                            <div>
                                <div className={styles.description} title={item.description}>
                                    {item.description}
                                </div>
                                <div className={styles.datetime}>{item.datetime}</div>
                            </div>
                        }
                    />
                </List.Item>
            )}></List>
            {
                listData.length > 0 && typeInfo.type != 'all' ? (
                    <div className={styles.clear}>
                        <FormattedMessage id="home.notification.clear" />{typeInfo.name}
                    </div>
                ) : null
            }

        </div>
        )
    }

    getNoticeContent = () => {
        const noticeData = data.slice(0, 4);
        const messageData = data.slice(0, 5);
        const eventData = data.slice(0, 6);
        return (

            <Tabs className={styles.tabs}>
                <TabPane tab={formatMessage({ id: 'home.notification.all' }) + (data.length > 0 ? `(${data.length})` : ``)} key="all">
                    {this.getNoticeList(data, {
                        type: 'all',
                        name: formatMessage({ id: 'home.notification.all' }),
                        emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
                        emptyText: formatMessage({ id: 'home.notification.all.empty' }),
                    })}
                </TabPane>
                <TabPane tab={formatMessage({ id: 'home.notification.notice' }) + (noticeData.length > 0 ? `(${noticeData.length})` : ``)} key="notice">
                    {this.getNoticeList(noticeData, {
                        type: 'notice',
                        name: formatMessage({ id: 'home.notification.notice' }),
                        emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
                        emptyText: formatMessage({ id: 'home.notification.notice.empty' }),
                    })}
                </TabPane>
                <TabPane tab={formatMessage({ id: 'home.notification.event' }) + (eventData.length > 0 ? `(${eventData.length})` : ``)} key="event">
                    {this.getNoticeList(eventData, {
                        type: 'event',
                        name: formatMessage({ id: 'home.notification.event' }),
                        emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg',
                        emptyText: formatMessage({ id: 'home.notification.event.empty' }),
                    })}
                </TabPane>
                <TabPane tab={formatMessage({ id: 'home.notification.message' }) + (messageData.length > 0 ? `(${messageData.length})` : ``)} key="message">
                    {this.getNoticeList(messageData, {
                        type: 'message',
                        name: formatMessage({ id: 'home.notification.message' }),
                        emptyImage: 'https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg',
                        emptyText: formatMessage({ id: 'home.notification.message.empty' }),
                    })}
                </TabPane>
            </Tabs>
        )
    }
    render() {
        const noticeContent = this.getNoticeContent();
        const { className } = this.props;
        return (
            <Popover className={className}
                placement="bottomRight" trigger="click"
                overlayClassName={styles.popover}
                content={noticeContent}
                popupAlign={{ offset: [0, -15] }}
            >
                <span>
                    <Badge count={8} overflowCount={99} ><FontAwesomeIcon icon="bell" size="lg" /></Badge>
                </span>
            </Popover>
        )
    }
}

Notification.propTypes = {
    "className": PropTypes.any,
}

export default Notification;