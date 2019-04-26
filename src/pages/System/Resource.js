import React, { PureComponent, Fragment } from 'react';
import TablePage from '../../components/TablePage'
import { Button, Input, Select, Tag, Divider, Popconfirm, Form, Modal, TreeSelect, InputNumber,Icon, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale'
import { connect } from 'dva'
import { formatTime } from '../../utils/utils'
import { regTitle, regCode } from '../../utils/validate'
import { existResource, existResourceCode } from '../../services/resource'

@Form.create()
class ResourceForm extends PureComponent {

    state = {
        parent_type: '',//上级资源类型
        type: '',//资源类型
    }

    //保存
    handleOk = () => {
        const { form, handleSave } = this.props;
        form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return;
            fieldsValue.parent_id = fieldsValue.parent_id ? fieldsValue.parent_id : 0;
            fieldsValue.sort_no = fieldsValue.sort_no ? fieldsValue.sort_no : 1;
            handleSave(fieldsValue);
        })
    }
    //验证资源名称是否已存在 
    handleExistResource = async (rule, value, callback) => {
        const { editInfo, form } = this.props;
        let parent_id = form.getFieldValue('parent_id')
        const params = { resource_name: value, parent_id: parent_id ? parent_id : 0 };
        if (editInfo) params.id = editInfo.id;
        let { code, data } = await existResource(params);
        if (!code && data.exist) {
            callback(formatMessage({ id: 'validation.name.existed' }))
        }
        callback()
    }

    //验证资源编码是否已存在 
    handleExistResourceCode = async (rule, value, callback) => {
        const { editInfo, form } = this.props;
        let parent_id = form.getFieldValue('parent_id')
        const params = { resource_code: value, parent_id: parent_id ? parent_id : 0 };
        if (editInfo) params.id = editInfo.id;
        let { code, data } = await existResourceCode(params);
        if (!code && data.exist) {
            callback(formatMessage({ id: 'validation.code.existed' }))
        }
        callback()
    }

    //资源类型切换
    handleChangeType = (value) => {
        this.setState({
            type: value,
        })
    }

    //上级资源切换
    handleTreeChange = (value, label, extra) => {
        const { triggerNode } = extra
        this.setState({
            parent_type: triggerNode ? triggerNode.props.resource_type : '',
            type: '',
        })
        this.props.form.setFieldsValue({
            resource_type: ''
        })
    }
    
    //初始
    initTree = (type) => {
        this.setState({
            parent_type: type ? type : '',
        })
        this.handleChangeType(this.props.form.getFieldValue('resource_type'))
    }

    componentDidMount() {
        this.props.triggerRef(this)
    }

    render() {
        const { form: { getFieldDecorator }, handleModalVisible, modalVisible, editInfo, dropList, mode, parent_id } = this.props;
        const { type, parent_type } = this.state;
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
                    <span>{mode ? <span><Icon type="plus"></Icon> <FormattedMessage id="system.resource.modal.add" /></span> :
                        <span><Icon type="edit"></Icon> <FormattedMessage id="system.resource.modal.edit" /></span>}</span>}
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={() => handleModalVisible()}
            >
                <Form>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.upper' })}>
                        {getFieldDecorator('parent_id', {
                            initialValue: mode ? parent_id : editInfo.parent_id,
                            validateFirst: true,
                            rules: []
                        })(
                            <TreeSelect disabled={!mode}
                                treeDefaultExpandAll
                                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                                treeData={dropList}
                                onChange={this.handleTreeChange}>
                            </TreeSelect>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name' })}>
                        {getFieldDecorator('resource_name', {
                            initialValue: mode ? '' : editInfo.resource_name,
                            validateFirst: true,
                            rules: [
                                { required: true, whitespace: false, message: formatMessage({ id: 'validation.name.required' }) },
                                { pattern: regTitle, message: formatMessage({ id: 'validation.name' }) },
                                { validator: this.handleExistResource }
                            ]
                        })(
                            <Input ></Input>
                        )}
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.type' })}>
                        {getFieldDecorator('resource_type', {
                            initialValue: mode ? '' : editInfo.resource_type,
                            rules: [
                                { required: true, message: formatMessage({ id: 'validation.type.required' }) },
                            ]
                        })(
                            <Select disabled={!mode} onChange={this.handleChangeType} >
                                {parent_type == 1 || parent_type == '' ? <Select.Option value={1}><FormattedMessage id="system.resource.type.module" /></Select.Option> : null}
                                {parent_type == 1 || parent_type == '' ? <Select.Option value={2}><FormattedMessage id="system.resource.type.menu" /></Select.Option> : null}
                                {parent_type == 2 ? <Select.Option value={3}><FormattedMessage id="system.resource.type.permission" /></Select.Option> : null}
                                {parent_type == 3 ? <Select.Option value={4}><FormattedMessage id="system.resource.type.api" /></Select.Option> : null}
                            </Select>
                        )}
                    </Form.Item>
                    {
                        type == 1 || type == 2 || type == 3  ?
                            <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.code' })}>
                                {getFieldDecorator('resource_code', {
                                    initialValue: mode ? '' : editInfo.resource_code,
                                    rules: [
                                        { required: true, whitespace: false, message: formatMessage({ id: 'validation.code.required' }) },
                                        { max: 50, min: 1, pattern: regCode, message: formatMessage({ id: 'validation.code' }) },
                                        { validator: this.handleExistResourceCode }
                                    ]
                                })(
                                    <Input></Input>
                                )}
                            </Form.Item> : null
                    }
                    {
                        type == 2 || type == 4 ?
                            <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.path' })}>
                                {getFieldDecorator('path', {
                                    initialValue: mode ? '' : editInfo.path,
                                    rules: [
                                        { required: true, message: formatMessage({ id: 'validation.path.required' }) },
                                    ]
                                })(
                                    <Input></Input>
                                )}
                            </Form.Item> : null
                    }
                    {
                        type == 1 || type == 2 ?
                            <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.icon' })}>
                                {getFieldDecorator('icon', {
                                    initialValue: mode ? '' : editInfo.icon,
                                    rules: []
                                })(
                                    <Input></Input>
                                )}
                            </Form.Item> : null
                    }
                    {
                        type == 1 || type == 2 || type == 3 ?
                            <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.sort' })}>
                                {getFieldDecorator('sort_no', {
                                    initialValue: mode ? '' : editInfo.sort_no,
                                })(
                                    <InputNumber min={0} step={1} style={{ width: '100%' }}></InputNumber>
                                )}
                            </Form.Item> : null
                    }
                </Form>
            </Modal>
        )
    }
}


@connect(({ resource, loading }) => ({
    data: resource.data,
    dropList: resource.dropList,
    loading: loading.effects['resource/getList']
}))
class Resource extends PureComponent {

    state = {
        sortedInfo: {},//排序信息
        filteredInfo: {},//筛选信息
        modalVisible: false,
        modalVisible: false,
        modalMode: true,//弹框模式 true-新增；false-编辑
        editInfo: {},
        parent_id: '',
    }

    componentDidMount() {
        this.initDropList();
    }

    initDropList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'resource/getDropList',
        })
    }

    /**表格排序、筛选变化时触发 */
    handleChange = (sorter, filters) => {
        this.setState({
            sortedInfo: { ...sorter },
            filteredInfo: { ...filters }
        })
    }

    /**删除弹框 */
    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'resource/delete',
            payload: { id },
            callback: () => {
                message.success(formatMessage({ id: 'msg.deleted' }))
            }
        })
    }

    /**弹框状态 modal add-新增；edit-编辑*/
    handleModalVisible = (modal) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        })

    }

    /**新增资源*/
    handleCreate = (parent_id, parent_type) => {
        this.setState({
            parent_id: parent_id ? parent_id : '',
            modalMode: true,
            modalVisible: !this.state.modalVisible
        }, () => {
            this.child.initTree(parent_type)
        })
    }

    /**编辑资源 */
    handleEdit = (fieldsValue) => {
        this.setState({
            modalMode: false,
            editInfo: fieldsValue,
            modalVisible: !this.state.modalVisible
        }, () => {
            let type = fieldsValue.resource_type;
            this.child.initTree(type == 3 ? 2 : 1)
        })
    }

    /**保存(新增、编辑)资源 */
    handleSave = (fieldsValue) => {
        const { dispatch } = this.props;
        const { modalMode, editInfo } = this.state;

        dispatch({
            type: modalMode ? 'resource/create' : 'resource/update',
            payload: modalMode ? fieldsValue : Object.assign(fieldsValue, { id: editInfo.id }),
            callback: () => {
                this.setState({
                    modalVisible: false,
                    modalVisible: false
                })
                message.success(modalMode ? formatMessage({ id: 'msg.created' }) : formatMessage({ id: 'msg.updated' }))
                this.initDropList();
            }
        })
    }

    bindRef = ref => { this.child = ref }

    render() {
        const { data, loading, dropList } = this.props;
        const { sortedInfo } = this.state;
        const columns = [{
            title: formatMessage({ id: 'label.name' }),
            key: 'resource_name',
            dataIndex: 'resource_name',
            fixed: true,
            width: 300,
        }, {
            title: formatMessage({ id: 'label.type' }),
            key: 'resource_type',
            dataIndex: 'resource_type',
            width: 140,
            render: (text) => (<span>{text == 1 ?
                <Tag color="orange"><FormattedMessage id="system.resource.type.module" /></Tag> : text == 2 ?
                    <Tag color="green"><FormattedMessage id="system.resource.type.menu" /></Tag> :text == 3 ?
                    <Tag color="blue"><FormattedMessage id="system.resource.type.permission" /></Tag> :
                    <Tag color="grey"><FormattedMessage id="system.resource.type.api" /></Tag>}</span>)
        }, {
            title: formatMessage({ id: 'label.code' }),
            key: 'resource_code',
            dataIndex: 'resource_code',
            width: 180,
        }, {
            title: formatMessage({ id: 'label.path' }),
            key: 'path',
            dataIndex: 'path',
            width: 280,
        }, {
            title: formatMessage({ id: 'label.icon' }),
            key: 'icon',
            dataIndex: 'icon',
            width: 160,
            render: (text) => (
                <span>{text ? <Icon type={text} /> : null}</span>
            )
        }, {
            title: formatMessage({ id: 'label.create-time' }),
            key: 'create_time',
            dataIndex: 'create_time',
            render: (text) => (<span>{formatTime(text)}</span>)
        }, {
            title: formatMessage({ id: 'label.operation' }),
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record) => (
                <div>
                    {
                        <span>
                            {record.resource_type != 4 ?
                                <span>
                                    <a href="javascript:;" onClick={() => this.handleCreate(record.id, record.resource_type)}><Icon type="plus" /> <FormattedMessage id="system.resource.button.add" /></a>
                                    <Divider type="vertical" /></span> : null
                            }
                            <a href="javascript:;" onClick={() => this.handleEdit(record)}><Icon type="edit" /> <FormattedMessage id="label.edit" /></a>
                            <Divider type="vertical" />
                            <Popconfirm placement="topRight"
                                icon={<Icon type="question-circle" className="danger" />}
                                okText={formatMessage({ id: 'button.yes' })}
                                cancelText={formatMessage({ id: 'button.no' })}
                                title={formatMessage({ id: 'system.resource.delete.prompt' })}
                                onConfirm={() => this.handleDelete(record.id)}>
                                <a href="javascript:;"><Icon type="delete" /> <FormattedMessage id="label.delete" /></a>
                            </Popconfirm>
                        </span>
                    }
                </div>
            )
        }];
        const buttons = (
            <React.Fragment>
                <Button type="primary" icon="plus" onClick={() => this.handleCreate('', '')} ><FormattedMessage id="button.add" /></Button>
            </React.Fragment>
        )
        const formProps = {
            mode: this.state.modalMode,
            parent_id: this.state.parent_id,
            editInfo: this.state.editInfo,
            modalVisible: this.state.modalVisible,
            handleModalVisible: this.handleModalVisible,
            handleSave: this.handleSave,
            dropList: dropList,
            triggerRef: this.bindRef
        }
        return (
            <Fragment>
                <TablePage loading={loading} url="resource/getList" isTree={true}
                    data={data} columns={columns} buttons={buttons} rowKey="id"
                    onChange={this.handleChange}
                >
                </TablePage>
                <ResourceForm {...formProps} ></ResourceForm>
            </Fragment>
        )
    }
}

export default Resource;