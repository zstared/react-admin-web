import React, { PureComponent } from 'react';
import TablePage from '../../components/TablePage'
import { Button, Dropdown, Menu, Icon, Input, Select } from 'antd';
import {connect} from 'dva'
const getDataSouce = () => {
    let data = []
    for (let i = 1; i <= 100; i++) {
        data.push({
            key: i,
            user_name: '张三',
            mobile: i,
            mail: '阿里大夏T1楼',
            state:'男',
            state:'',
            create_time:''
        })
    }
    return data;
}

const columns = [{
    title: '姓名',
    dataIndex: 'user_name',
}, {
    title: '手机号码',
    dataIndex: 'mobile',
}, {
    title: '邮箱',
    dataIndex: 'mail',
}, {
    title: '性别',
    dataIndex: 'sex',
}, {
    title: '状态',
    dataIndex: 'state',
}, {
    title: '创建时间',
    dataIndex: 'create_time',
}];

@connect(({user,loading})=>({
    list:user.list,
    loading:loading.models.user
}))
class User extends PureComponent {


    render() {
        //let data = getDataSouce();
        const {list,loading}=this.props;
        const menu = (
            <Menu >
                <Menu.Item key="1">操作按钮</Menu.Item>
                <Menu.Item key="2">操作按钮</Menu.Item>
                <Menu.Item key="3">操作按钮</Menu.Item>
            </Menu>
        );
        const buttons = (
            <React.Fragment>
                <Button type="primary" icon="plus">新增</Button>
                <Button style={{ marginLeft: 8 }} icon="download">导出</Button>
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                        更多 <Icon type="down" />
                    </Button>
                </Dropdown>
            </React.Fragment>
        )
        return (
            <TablePage loading={loading} url="user/getList" list={list} columns={columns} buttons={buttons} >
                <TablePage.QueryItem label="用户名">
                    <Input placeholder="请输入" />
                </TablePage.QueryItem>
                <TablePage.QueryItem label="状态">
                    <Select placeholder="请选择" allowClear>
                        <Select.Option value="0">正常</Select.Option>
                        <Select.Option value="1">禁用</Select.Option>
                        <Select.Option value="2">注销</Select.Option>
                    </Select>
                </TablePage.QueryItem>
                <TablePage.QueryItem label="是否内置">
                    <Select placeholder="请选择" allowClear>
                        <Select.Option value="1">是</Select.Option>
                        <Select.Option value="0">否</Select.Option>
                    </Select>
                </TablePage.QueryItem>
                <TablePage.QueryItem label="用户名">
                    <Input placeholder="请输入" />
                </TablePage.QueryItem>
                <TablePage.QueryItem label="状态">
                    <Select placeholder="请选择" allowClear>
                        <Select.Option value="0">正常</Select.Option>
                        <Select.Option value="1">禁用</Select.Option>
                        <Select.Option value="2">注销</Select.Option>
                    </Select>
                </TablePage.QueryItem>
            </TablePage>
        )
    }
}

export default User;