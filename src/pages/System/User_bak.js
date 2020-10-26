import React, { PureComponent, Fragment } from 'react';
import TablePage from '../../components/TablePage';
import {
    Button,
    Input,
    Select,
    Tag,
    Divider,
    Popconfirm,
    Form,
    Modal,
    Radio,
    Icon,
    message,
} from 'antd';
import { formatMessage, FormattedMessage } from 'umi';
import { connect } from 'dva';
import { formatTime } from '../../utils/utils';
import {
    regNameCn,
    regNameEn,
    regPhone,
    regAccount,
} from '../../utils/validate';
import { existAccount, existMobile } from '../../services/user';
import Permission from '../../components/Permission';


class UserForm extends PureComponent {
    //保存
    handleOk = () => {
        const { form, handleSave } = this.props;
        form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return;
            handleSave(fieldsValue);
        });
    };
    //验证账号是否已存在
    handleExistAccount = async (rule, value, callback) => {
        const { mode } = this.props;
        if (mode) {
            let { code, data } = await existAccount({ user_name: value });
            if (!code && data.exist) {
                callback(formatMessage({ id: 'validation.account.existed' }));
            }
        }
        callback();
    };

    //验证手机号是否已存在
    handleExistMobile = async (rule, value, callback) => {
        const { editInfo, mode } = this.props;
        const params = { mobile: value };
        if (!mode) params.id = editInfo.id;
        let { code, data } = await existMobile(params);
        if (!code && data.exist) {
            callback(formatMessage({ id: 'validation.mobile.existed' }));
        }
        callback();
    };

    render() {
        const {
            form: { getFieldDecorator },
            handleModalVisible,
            modalVisible,
            roleList,
            mode,
            editInfo,
        } = this.props;
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
                title={
                    mode ? (
                        <span>
                            <Icon type='user-plus'></Icon>{' '}
                            <FormattedMessage id='system.user.modal.add' />
                        </span>
                    ) : (
                        <span>
                            <Icon type='user-edit'></Icon>{' '}
                            <FormattedMessage id='system.user.modal.edit' />
                        </span>
                    )
                }
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={handleModalVisible}>
                <Form>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({ id: 'label.account' })}
                            name="user_name",
                            initialValue={!mode ? editInfo.user_name : ''},
                            validateFirst={true},
                            rules={ [
                                {
                                    required: true,
                                    whitespace: false,
                                    message: formatMessage({
                                        id: 'validation.account.required',
                                    }),
                                },
                                {
                                    pattern: regAccount,
                                    message: formatMessage({
                                        id: 'validation.account',
                                    }),
                                },
                                { validator: this.handleExistAccount },
                            ]}>
                        <Input disabled={!mode}></Input>)}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({ id: 'label.name-cn' })}>
                        {getFieldDecorator('name_cn', {
                            initialValue: !mode ? editInfo.name_cn : '',
                            rules: [
                                {
                                    required: true,
                                    whitespace: false,
                                    message: formatMessage({
                                        id: 'validation.name-cn.required',
                                    }),
                                },
                                {
                                    max: 50,
                                    min: 1,
                                    pattern: regNameCn,
                                    message: formatMessage({
                                        id: 'validation.name-cn',
                                    }),
                                },
                            ],
                        })(<Input></Input>)}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({ id: 'label.name-en' })}>
                        {getFieldDecorator('name_en', {
                            initialValue: !mode ? editInfo.name_en : '',
                            rules: [
                                {
                                    whitespace: true,
                                    message: formatMessage({
                                        id: 'validation.name-en.required',
                                    }),
                                },
                                {
                                    max: 50,
                                    min: 1,
                                    pattern: regNameEn,
                                    message: formatMessage({
                                        id: 'validation.name-en',
                                    }),
                                },
                            ],
                        })(<Input></Input>)}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({ id: 'label.sex' })}>
                        {getFieldDecorator('sex', {
                            initialValue: !mode ? editInfo.sex : '',
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'validation.sex.required',
                                    }),
                                },
                            ],
                        })(
                            <Radio.Group>
                                <Radio value={1}>
                                    <FormattedMessage id='label.sex.male' />
                                </Radio>
                                <Radio value={2}>
                                    <FormattedMessage id='label.sex.female' />
                                </Radio>
                            </Radio.Group>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({ id: 'label.role' })}>
                        {getFieldDecorator('role', {
                            initialValue: !mode
                                ? editInfo.role.map((item) => item.id)
                                : [],
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'validation.role.required',
                                    }),
                                },
                            ],
                        })(
                            <Select mode='multiple'>
                                {roleList.map((item) => (
                                    <Select.Option
                                        key={item.id}
                                        value={item.id}>
                                        {item.role_name}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({ id: 'label.mobile' })}>
                        {getFieldDecorator('mobile', {
                            initialValue: !mode ? editInfo.mobile : '',
                            validateFirst: true,
                            rules: [
                                {
                                    required: true,
                                    message: formatMessage({
                                        id: 'validation.mobile.required',
                                    }),
                                },
                                {
                                    pattern: regPhone,
                                    message: formatMessage({
                                        id: 'validation.mobile',
                                    }),
                                },
                                { validator: this.handleExistMobile },
                            ],
                        })(<Input></Input>)}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={formatMessage({ id: 'label.email' })}>
                        {getFieldDecorator('mail', {
                            initialValue: !mode ? editInfo.mail : '',
                            rules: [
                                {
                                    type: 'email',
                                    message: formatMessage({
                                        id: 'validation.email',
                                    }),
                                },
                            ],
                        })(<Input></Input>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

@connect(({ user, loading }) => ({
    data: user.data,
    roleList: user.roleList,
    permission: user.permission,
    loading: loading.effects['user/getList'],
}))
class User extends PureComponent {
    state = {
        sortedInfo: {}, //排序信息
        filteredInfo: {}, //筛选信息
        modalVisible: false,
        modalMode: true, //弹框模式 true-新增；false-编辑
        editInfo: {},
        permissionVisible: false,
    };

    componentDidMount() {
        this.initRoleDropList();
    }

    /**绑定子组件 */
    bindRef = (ref) => {
        this.child = ref;
    };

    initRoleDropList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/getRoleDropList',
        });
    };

    /**表格排序、筛选变化时触发 */
    handleChange = (sorter, filters) => {
        this.setState({
            sortedInfo: { ...sorter },
            filteredInfo: { ...filters },
        });
    };

    /**删除用户 */
    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/delete',
            payload: { id },
            callback: () => {
                message.success(formatMessage({ id: 'msg.deleted' }));
            },
        });
    };

    /**禁用或启用用户 */
    handleChangeState = (id, status) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/updateState',
            payload: { id, status: status ? 0 : 1 },
            callback: () => {
                message.success(
                    status
                        ? formatMessage({ id: 'msg.enabled' })
                        : formatMessage({ id: 'msg.disabled' })
                );
            },
        });
    };

    /**弹框状态 */
    handleModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    };

    /**打开弹框 model true-新增；false-编辑 */
    handleModalOpen = (mode) => {
        this.setState({
            modalMode: mode,
            modalVisible: !this.state.modalVisible,
        });
    };

    /**修改用户 */
    handleEdit = (fieldsValue) => {
        this.setState(
            {
                editInfo: fieldsValue,
            },
            () => {
                this.handleModalOpen(false);
            }
        );
    };

    /**保存(新增、编辑)用户 */
    handleSave = (fieldsValue) => {
        const { dispatch } = this.props;
        const { modalMode, editInfo } = this.state;

        dispatch({
            type: modalMode ? 'user/create' : 'user/update',
            payload: modalMode
                ? fieldsValue
                : Object.assign(fieldsValue, { id: editInfo.id }),
            callback: () => {
                this.setState({
                    modalVisible: false,
                });
                message.success(
                    modalMode
                        ? formatMessage({ id: 'msg.created' })
                        : formatMessage({ id: 'msg.updated' })
                );
            },
        });
    };

    handlePermissionModalVisiable = (id, callback) => {
        this.setState(
            {
                assignUserId: id ? id : '',
                permissionVisible: !this.state.permissionVisible,
            },
            () => {
                if (callback) callback();
            }
        );
    };

    /**
     * 分配权限
     */
    handleAssignPermissions = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/getPermission',
            payload: { id: id },
            callback: () => {
                this.handlePermissionModalVisiable(id, () => {
                    const { permission } = this.props;
                    this.child.setCheckedKeys(
                        permission.user.concat(permission.role),
                        permission.role
                    );
                });
            },
        });
    };

    /**保存权限 */
    handleSavePermission = (resource_ids) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/savePermission',
            payload: {
                id: this.state.assignUserId,
                resource_list: resource_ids,
            },
            callback: () => {
                message.success(formatMessage({ id: 'msg.saved' }));
                this.handlePermissionModalVisiable();
            },
        });
    };

    render() {
        const { data, roleList, loading } = this.props;
        const { sortedInfo } = this.state;
        const columns = [
            {
                title: formatMessage({ id: 'label.account' }),
                key: 'user_name',
                dataIndex: 'user_name',
                fixed: true,
                width: 200,
            },
            {
                title: formatMessage({ id: 'label.name-cn' }),
                key: 'name_cn',
                dataIndex: 'name_cn',
                fixed: true,
                width: 120,
            },
            {
                title: formatMessage({ id: 'label.name-en' }),
                key: 'name_en',
                dataIndex: 'name_en',
                width: 180,
            },
            {
                title: formatMessage({ id: 'label.status' }),
                key: 'status',
                dataIndex: 'status',
                sorter: true,
                sortOrder:
                    sortedInfo.columnKey === 'status' && sortedInfo.order,
                width: 120,
                render: (text) => (
                    <span>
                        {text == 0 ? (
                            <Tag color='green'>
                                <FormattedMessage id='label.status.normal' />
                            </Tag>
                        ) : text == 1 ? (
                            <Tag color='red'>
                                <FormattedMessage id='label.status.disabled' />
                            </Tag>
                        ) : (
                            <Tag color='grey'>
                                <FormattedMessage id='label.status.deleted' />
                            </Tag>
                        )}
                    </span>
                ),
            },
            {
                title: formatMessage({ id: 'label.mobile' }),
                key: 'mobile',
                dataIndex: 'mobile',
                width: 180,
            },
            {
                title: formatMessage({ id: 'label.role' }),
                key: 'role',
                dataIndex: 'role',
                width: 200,
                render: (text) => (
                    <span>
                        {text.map((item) => (
                            <Tag key={item.id}>{item.role_name}</Tag>
                        ))}
                    </span>
                ),
            },
            {
                title: formatMessage({ id: 'label.sex' }),
                key: 'sex',
                dataIndex: 'sex',
                sorter: true,
                sortOrder: sortedInfo.columnKey === 'sex' && sortedInfo.order,
                width: 120,
                render: (text) => (
                    <span>
                        {text == 1 ? (
                            <Icon type='male' size='lg' color='#0082f3' />
                        ) : (
                            <Icon type='female' size='lg' color='#f98c3d' />
                        )}
                    </span>
                ),
            },
            {
                title: formatMessage({ id: 'label.email' }),
                key: 'mail',
                dataIndex: 'mail',
                width: 200,
            },
            {
                title: formatMessage({ id: 'label.create-time' }),
                key: 'create_time',
                dataIndex: 'create_time',
                sorter: true,
                sortOrder:
                    sortedInfo.columnKey === 'create_time' && sortedInfo.order,
                width: 200,
                render: (text) => <span>{formatTime(text)}</span>,
            },
            {
                title: formatMessage({ id: 'label.operation' }),
                key: 'operation',
                fixed: 'right',
                width: 200,
                render: (text, record) => (
                    <div>
                        {record.status !== 2 && !record.is_system ? (
                            <span>
                                <a
                                    onClick={() =>
                                        this.handleAssignPermissions(record.id)
                                    }>
                                    <Icon type='safety' />{' '}
                                    <FormattedMessage id='label.permissions' />
                                </a>
                                <Divider type='vertical' />
                                <a onClick={() => this.handleEdit(record)}>
                                    <Icon type='edit' />{' '}
                                    <FormattedMessage id='label.edit' />
                                </a>
                                <Divider type='vertical' />
                                {record.status == 1 ? (
                                    <a
                                        onClick={() =>
                                            this.handleChangeState(
                                                record.id,
                                                record.status
                                            )
                                        }>
                                        <Icon type='unlock' />{' '}
                                        <FormattedMessage id='label.enable' />
                                    </a>
                                ) : (
                                    <a
                                        onClick={() =>
                                            this.handleChangeState(
                                                record.id,
                                                record.status
                                            )
                                        }>
                                        <Icon type='lock' />{' '}
                                        <FormattedMessage id='label.disable' />
                                    </a>
                                )}
                                <Divider type='vertical' />
                                <Popconfirm
                                    placement='topRight'
                                    icon={
                                        <Icon
                                            type='question-circle'
                                            className='danger'
                                        />
                                    }
                                    okText={formatMessage({ id: 'button.yes' })}
                                    cancelText={formatMessage({
                                        id: 'button.no',
                                    })}
                                    title={formatMessage({
                                        id: 'system.user.delete.prompt',
                                    })}
                                    onConfirm={() =>
                                        this.handleDelete(record.id)
                                    }>
                                    <a>
                                        <Icon type='delete' />{' '}
                                        <FormattedMessage id='label.delete' />
                                    </a>
                                </Popconfirm>
                            </span>
                        ) : null}
                    </div>
                ),
            },
        ];
        const buttons = (
            <React.Fragment>
                <Button
                    type='primary'
                    onClick={() => this.handleModalOpen(true)}>
                    <Icon type='plus' style={{ marginRight: '6px' }} />
                    <FormattedMessage id='button.add' />
                </Button>
            </React.Fragment>
        );
        const userFormProps = {
            mode: this.state.modalMode,
            editInfo: this.state.editInfo,
            roleList: roleList,
            modalVisible: this.state.modalVisible,
            handleModalVisible: this.handleModalVisible,
            handleSave: this.handleSave,
        };
        return (
            <Fragment>
                <TablePage
                    loading={loading}
                    url='user/getList'
                    data={data}
                    columns={columns}
                    buttons={buttons}
                    rowKey='id'
                    onChange={this.handleChange}>
                    <TablePage.QueryItem
                        label={formatMessage({ id: 'system.user' })}
                        name='user_name'>
                        <Input
                            placeholder={formatMessage({
                                id: 'system.user.placeholder.user',
                            })}
                        />
                    </TablePage.QueryItem>
                    <TablePage.QueryItem
                        label={<FormattedMessage id='label.status' />}
                        name='status'>
                        <Select
                            placeholder={
                                <FormattedMessage id='placeholder.select' />
                            }
                            allowClear>
                            <Select.Option value='0'>
                                <FormattedMessage id='label.status.normal'></FormattedMessage>
                            </Select.Option>
                            <Select.Option value='1'>
                                <FormattedMessage id='label.status.disabled'></FormattedMessage>
                            </Select.Option>
                            <Select.Option value='2'>
                                <FormattedMessage id='label.status.deleted'></FormattedMessage>
                            </Select.Option>
                        </Select>
                    </TablePage.QueryItem>
                </TablePage>
                <UserForm {...userFormProps}></UserForm>
                <Permission
                    modalVisible={this.state.permissionVisible}
                    handleModalVisible={this.handlePermissionModalVisiable}
                    triggerRef={this.bindRef}
                    handleSave={this.handleSavePermission}></Permission>
            </Fragment>
        );
    }
}

export default User;
