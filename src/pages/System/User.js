import React, { PureComponent, Fragment } from 'react';
import TablePage from '../../components/TablePage'
import { Button, Dropdown, Menu, Icon, Input, Select, Tag, Divider, Popconfirm, Form, Modal,Radio } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatMessage, FormattedMessage } from 'umi/locale'
import { connect } from 'dva'
import { formatTime } from '../../utils/utils'
import {regName,regNameEn,regPhone,regAccount} from '../../utils/validate'


@Form.create()
class CreateForm extends PureComponent {

    handleOk = () => {
        const {form,handleCreate}=this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            handleCreate(fieldsValue);
        })
    }

    render() {
        const { form: { getFieldDecorator }, handleModalVisible, modalVisible } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <Modal
                destroyOnClose
                title="新增用户"
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={handleModalVisible}
            >
                <Form>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.account' })}>
                        {getFieldDecorator('user_name',{
                            rules:[
                                { required: true, whitespace: false, message: formatMessage({ id: 'validation.account.required' }) },
                                { max: 50, min: 1, pattern: regAccount, message: formatMessage({ id: 'validation.account' }) }
                            ]
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name' })}>
                        {getFieldDecorator('name_cn',{
                            rules:[
                                { required: true, whitespace: false, message: formatMessage({ id: 'validation.name.required' }) },
                                { max: 50, min: 1, pattern: regName, message: formatMessage({ id: 'validation.name' }) }
                            ]
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name-en' })}>
                        {getFieldDecorator('name_en',{
                            rules:[
                                { whitespace: true, message: formatMessage({ id: 'validation.name-en.required' }) },
                                { max: 50, min: 1, pattern: regNameEn, message: formatMessage({ id: 'validation.name-en' }) }
                            ]
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.sex' })}>
                        {getFieldDecorator('sex', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'validation.sex.required' }) },
                            ]
                        })(
                            <Radio.Group >
                                <Radio value={1}><FormattedMessage id="label.sex.male"/></Radio>
                                <Radio value={2}><FormattedMessage id="label.sex.female"/></Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.role' })}>
                        {getFieldDecorator('role', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'validation.role.required' }) },
                            ]
                        })(
                            <Select>
                               <Select.Option value={1}>角色一</Select.Option>
                               <Select.Option value={2}>角色二</Select.Option>
                               <Select.Option value={3}>角色三</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.phone' })}>
                        {getFieldDecorator('mobile', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'validation.phone.required' }) },
                                { pattern: regPhone, message: formatMessage({ id: 'validation.phone' }) }
                            ]
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.email' })}>
                        {getFieldDecorator('mail', {
                            rules: [{
                                type: 'email', message: formatMessage({ id: 'validation.email' })
                            }]
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}


@connect(({ user, loading }) => ({
    data: user.data,
    loading: loading.effects['user/getList']
}))
class User extends PureComponent {

    state = {
        sortedInfo: {},//排序信息
        filteredInfo: {},//筛选信息
        modalVisible: false,
    }

    /**表格排序、筛选变化时触发 */
    handleChange = (sorter, filters) => {
        this.setState({
            sortedInfo: { ...sorter },
            filteredInfo: { ...filters }
        })
    }

    /**删除用户 */
    handleDelete = (user_id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/delete',
            payload: { user_id }
        })
    }

    /**禁用或启用用户 */
    handleChangeState = (user_id, state) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/updateState',
            payload: { user_id, state: state ? 0 : 1 }
        })
    }

    /**弹框状态 */
    handleModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible
        })
    }

    /**新增用户 */
    handleCreate = (fieldsValue) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/create',
            payload: fieldsValue
        })
    }
    
    /**修改用户 */
    handleUpdate = (fieldsValue) => {
        console.log(fieldsValue)
    }

    render() {
        const { data, loading } = this.props;
        const { sortedInfo } = this.state;
        const columns = [{
            title: '账号',
            key: 'user_name',
            dataIndex: 'user_name',
            fixed: true,
            width: 200,
        }, {
            title: '中文名',
            key: 'name_cn',
            dataIndex: 'name_cn',
            fixed: true,
            width: 120,
        }, {
            title: '英文名',
            key: 'name_en',
            dataIndex: 'name_en',
            width: 180,
        }, {
            title: '手机号码',
            key: 'mobile',
            dataIndex: 'mobile',
            width: 180,
        }, {
            title: '邮箱',
            key: 'mail',
            dataIndex: 'mail',
            width: 200,
        }, {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'sex' && sortedInfo.order,
            width: 100,
            // filters: [
            //     { text: '男', value: 1 },
            //     { text: '女', value: 2 },
            // ],
            // filteredValue: filteredInfo.sex || null,
            // filterMultiple:false,
            render: (text) => (<span>{text == 1 ? <FontAwesomeIcon icon="male" size="lg" color="#0082f3" /> : <FontAwesomeIcon icon="female" size="lg" color="#f98c3d" />}</span>)
        }, {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
            width: 120,
            render: (text) => (<span>{text == 0 ? <Tag color="green">正常</Tag> : text == 1 ? <Tag color="red">已禁用</Tag> : <Tag color="grey">已删除</Tag>}</span>)
        }, {
            title: '创建时间',
            key: 'create_time',
            dataIndex: 'create_time',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
            width: 200,
            render: (text) => (<span>{formatTime(text)}</span>)
        }, {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record) => (
                <div>
                    {
                        record.state !== 2 && !record.is_system ?
                            <span>
                                <a href="javascript:;"><FontAwesomeIcon icon="edit" /> 编辑</a>
                                <Divider type="vertical" />
                                {
                                    record.state == 1 ?
                                        <a href="javascript:;" onClick={() => this.handleChangeState(record.user_id, record.state)} ><FontAwesomeIcon icon="unlock" /> 启用</a> :
                                        <a href="javascript:;" onClick={() => this.handleChangeState(record.user_id, record.state)} ><FontAwesomeIcon icon="lock" /> 禁用</a>
                                }
                                <Divider type="vertical" />
                                <Popconfirm placement="topRight"
                                    icon={<FontAwesomeIcon icon="question-circle" className="danger" />}
                                    okText={formatMessage({ id: 'button.yes' })}
                                    cancelText={formatMessage({ id: 'button.no' })}
                                    title="确定删除此用户吗？"
                                    onConfirm={() => this.handleDelete(record.user_id)}>
                                    <a href="javascript:;"><FontAwesomeIcon icon="times" /> 删除</a>
                                </Popconfirm>
                            </span> : null
                    }
                </div>
            )
        }];
        // const menu = (
        //     <Menu >
        //         <Menu.Item key="1">操作按钮</Menu.Item>
        //         <Menu.Item key="2">操作按钮</Menu.Item>
        //         <Menu.Item key="3">操作按钮</Menu.Item>
        //     </Menu>
        // );
        const buttons = (
            <React.Fragment>
                <Button type="primary" onClick={this.handleModalVisible} ><FontAwesomeIcon icon="user-plus" style={{ marginRight: '6px' }} /><FormattedMessage id="button.add" /></Button>
                {/** <Button style={{ marginLeft: 8 }} icon="download">导出</Button>
                <Dropdown overlay={menu}>
                    <Button style={{ marginLeft: 8 }}>
                        更多 <Icon type="down" />
                    </Button>
                </Dropdown> */}
            </React.Fragment>
        )
        const createProps = {
            modalVisible:this.state.modalVisible,
            handleModalVisible:this.handleModalVisible,
            handleCreate:this.handleCreate
        }
        return (
            <Fragment>
                <TablePage loading={loading} url="user/getList"
                    data={data} columns={columns} buttons={buttons} rowKey="user_id"
                    onChange={this.handleChange}
                >
                    <TablePage.QueryItem label="用户" name="user_name">
                        <Input placeholder="请输入" />
                    </TablePage.QueryItem>
                    <TablePage.QueryItem label="状态" name="state">
                        <Select placeholder="请选择" allowClear>
                            <Select.Option value="0">正常</Select.Option>
                            <Select.Option value="1">已禁用</Select.Option>
                            <Select.Option value="2">已删除</Select.Option>
                        </Select>
                    </TablePage.QueryItem>
                </TablePage>
                <CreateForm {...createProps} ></CreateForm>
            </Fragment>
        )
    }
}

export default User;