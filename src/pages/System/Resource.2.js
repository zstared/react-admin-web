import React, { PureComponent, Fragment } from 'react'
import CustomPage from '../../components/CustomPage'
import { Tree, Form, Input, Select, TreeSelect, Card, Row, Col, Button, Divider, Popconfirm } from 'antd'
import { formatMessage, FormattedMessage } from 'umi/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regName, regCode } from '../../utils/validate'
import { connect } from 'dva'
import styles from './Resource.less'
const { TreeNode } = Tree;
const Search = Input.Search;

const dataList = [];
const getParentKey = (key, tree) => {
    let parentKey;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => item.key === key)) {
                parentKey = node.key;
            } else if (getParentKey(key, node.children)) {
                parentKey = getParentKey(key, node.children);
            }
        }
    }
    return parentKey;
};

@Form.create()
class ResourceForm extends PureComponent {

    state = {
        parent_type: '',//上级资源类型
        type: '',//资源类型
        permission_type: '',//权限类型
    }

    //保存
    handleOk = () => {
        const { form, handleSave } = this.props;
        form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return;
            fieldsValue.parent_id = fieldsValue.parent_id ? fieldsValue.parent_id : 0;
            handleSave(fieldsValue);
        })
    }
    //验证资源名称是否已存在 
    handleExistResource = async (rule, value, callback) => {
        const { editInfo, form } = this.props;
        let parent_id = form.getFieldValue('parent_id')
        const params = { resource_name: value, parent_id: parent_id ? parent_id : 0 };
        if (editInfo) params.resource_id = editInfo.resource_id;
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
        if (editInfo) params.resource_id = editInfo.resource_id;
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
            permission_type: '',
        })
    }

    //权限类型切换
    handleChangePermissionType = (value) => {
        this.setState({
            permission_type: value
        })
    }

    //上级资源切换
    handleTreeChange = (value, label, extra) => {
        const { triggerNode } = extra
        this.setState({
            parent_type: triggerNode.props.resource_type,
            type: '',
            permission_type: '',
        })
        this.props.form.setFieldsValue({
            resource_type: ''
        })
    }

    componentDidUpdate() {
        // this.handleTreeChange(this.props.form.getFieldValue('parent'))
        this.handleChangeType(this.props.form.getFieldValue('resource_type'))
        this.handleChangePermissionType(this.props.form.getFieldValue('permission_type'))
    }

    render() {
        const { form: { getFieldDecorator }, editInfo, dropList } = this.props;
        const { type, parent_type, permission_type } = this.state;
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
            <Form>
                <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.upper' })}>
                    {getFieldDecorator('parent_id', {
                        initialValue: editInfo.parent_id,
                        validateFirst: true,
                        rules: []
                    })(
                        <TreeSelect disabled={true}
                            treeDefaultExpandAll
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            treeData={dropList}
                            onChange={this.handleTreeChange}>
                        </TreeSelect>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name' })}>
                    {getFieldDecorator('resource_name', {
                        initialValue: editInfo.resource_name,
                        validateFirst: true,
                        rules: [
                            { required: true, whitespace: false, message: formatMessage({ id: 'validation.name.required' }) },
                            { pattern: regName, message: formatMessage({ id: 'validation.name' }) },
                            { validator: this.handleExistResource }
                        ]
                    })(
                        <Input ></Input>
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.type' })}>
                    {getFieldDecorator('resource_type', {
                        initialValue: editInfo.resource_type,
                        rules: [
                            { required: true, message: formatMessage({ id: 'validation.type.required' }) },
                        ]
                    })(
                        <Select disabled={true} onChange={this.handleChangeType} >
                            {parent_type == 1 || parent_type == '' ? <Select.Option value={1}><FormattedMessage id="system.resource.type.module" /></Select.Option> : null}
                            {parent_type == 1 || parent_type == '' ? <Select.Option value={2}><FormattedMessage id="system.resource.type.menu" /></Select.Option> : null}
                            {parent_type == 2 ? <Select.Option value={3}><FormattedMessage id="system.resource.type.api" /></Select.Option> : null}
                        </Select>
                    )}
                </Form.Item>
                {
                    type == 1 || type == 2 ?
                        <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.code' })}>
                            {getFieldDecorator('resource_code', {
                                initialValue: editInfo.resource_code,
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
                    type == 3 ?
                        <Form.Item {...formItemLayout} label={formatMessage({ id: 'system.resource.permission' })}>
                            {getFieldDecorator('permission_type', {
                                initialValue: editInfo.permission_type,
                                rules: [
                                    { required: true, message: formatMessage({ id: 'validation.type.required' }) },
                                ]
                            })(
                                <Select onChange={this.handleChangePermissionType}>
                                    <Select.Option value={1}><FormattedMessage id="system.resource.permission.query" /></Select.Option>
                                    <Select.Option value={2}><FormattedMessage id="system.resource.permission.add" /></Select.Option>
                                    <Select.Option value={3}><FormattedMessage id="system.resource.permission.edit" /></Select.Option>
                                    <Select.Option value={4}><FormattedMessage id="system.resource.permission.delete" /></Select.Option>
                                    <Select.Option value={5}><FormattedMessage id="system.resource.permission.export" /></Select.Option>
                                    <Select.Option value={6}><FormattedMessage id="system.resource.permission.import" /></Select.Option>
                                    <Select.Option value={99}><FormattedMessage id="system.resource.permission.custom" /></Select.Option>
                                </Select>
                            )}
                        </Form.Item>
                        : null
                }
                {
                    permission_type == 99 ?
                        <Form.Item {...formItemLayout} label={formatMessage({ id: 'system.resource.permission-name' })}>
                            {getFieldDecorator('permission_custom', {
                                initialValue: editInfo.permission_custom,
                            })(
                                <Input></Input>
                            )}
                        </Form.Item>
                        : null
                }
                {
                    type == 2 || type == 3 ?
                        <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.path' })}>
                            {getFieldDecorator('path', {
                                initialValue: editInfo.path,
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
                                initialValue: editInfo.icon,
                                rules: []
                            })(
                                <Input></Input>
                            )}
                        </Form.Item> : null
                }
                {
                    type == 1 || type == 2 ?
                        <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.sort' })}>
                            {getFieldDecorator('sort_no', {
                                initialValue: editInfo.sort_no,
                            })(
                                <InputNumber min={0} step={1} style={{ width: '100%' }}></InputNumber>
                            )}
                        </Form.Item> : null
                }
            </Form>
        )
    }
}

@connect(({ resource, loading }) => ({
    data: resource.data,
    expandedKeys: resource.expandedKeys,
    dropList: resource.dropList,
    loading: loading.effects['resource/getList']
}))
class Resource extends PureComponent {

    static getDerivedStateFromProps(props, state) {
        if (state.expandedKeys && state.expandedKeys.length == 0) {
            console.log(state.expandedKeys, props.expandedKeys)
            return {
                expandedKeys: props.expandedKeys
            }
        }
        return null;
    }

    state = {
        mode: true,//弹框模式 true-新增；false-编辑
        editInfo: '',
        expandedKeys: [],
        searchValue: '',
        autoExpandParent: true,
    }

    componentDidMount() {
        this.initList();
    }

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'resource/getList'
        })
    }

    initDropList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'resource/getDropList',
        })
    }

    //新建
    handleCreate = () => {

    }

    //编辑
    handleEdit = (record) => {

    }

    //删除
    handleDelete = (resource_id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'resource/delete',
            payload: { resource_id },
            callback: () => {
                message.success(formatMessage({ id: 'msg.deleted' }))
            }
        })
    }

    /**保存(新增、编辑)资源 */
    handleSave = (fieldsValue) => {
        const { dispatch } = this.props;
        const { mode, editInfo } = this.state;

        dispatch({
            type: mode ? 'resource/create' : 'resource/update',
            payload: mode ? fieldsValue : Object.assign(fieldsValue, { resource_id: editInfo.resource_id }),
            callback: () => {
                this.setState({
                    modalCreateVisible: false,
                    modalEditVisible: false
                })
                message.success(mode ? formatMessage({ id: 'msg.created' }) : formatMessage({ id: 'msg.updated' }))
            }
        })
    }

    //渲染树节点
    renderTreeNodes = data => data.map((item) => {
        const type = item.resource_type;
        const icon = type == 1 ? 'folder' : type == 2 ? 'file' : '';
        const title = (
            <Row>
                <Col span={12}>{
                    <span>
                        <FontAwesomeIcon icon={icon} style={{ marginRight: '6px' }} />
                        <span style={{ fontWeight: type == 1 ? 'bold' : 'normal' }}>{item.title}</span>
                    </span>
                }</Col>
                <Col span={12} style={{ textAlign: "right", paddingRight: "20px" }}>
                    <a href="javascript:;" onClick={() => this.handleCreate(item)}><FontAwesomeIcon icon="plus" /></a>
                    <Divider type="vertical" />
                    <a href="javascript:;" onClick={() => this.handleEdit(item)}><FontAwesomeIcon icon="edit" /></a>
                    <Divider type="vertical" />
                    <Popconfirm placement="topRight"
                        icon={<FontAwesomeIcon icon="question-circle" className="danger" />}
                        okText={formatMessage({ id: 'button.yes' })}
                        cancelText={formatMessage({ id: 'button.no' })}
                        title={formatMessage({ id: 'system.resource.delete.prompt' })}
                        onConfirm={() => this.handleDelete(item.key)}>
                        <a href="javascript:;"><FontAwesomeIcon icon="times" /></a>
                    </Popconfirm>
                </Col>
            </Row>
        )
        return (
            <TreeNode title={title} key={item.key} dataRef={item}>
                {item.children && item.children.length > 0 ? this.renderTreeNodes(item.children) : null}
            </TreeNode>
        );
    })


    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onChange = (e) => {
        const value = e.target.value;
        const expandedKeys = dataList.map((item) => {
            if (item.title.indexOf(value) > -1) {
                return getParentKey(item.key, this.props.data);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        this.setState({
            expandedKeys,
            searchValue: value,
            autoExpandParent: true,
        });
    }

    render() {
        const { data, dropList } = this.props;
        const formProps = {
            mode: this.state.mode,
            editInfo: this.state.editInfo,
            handleSave: this.handleSave,
            dropList: dropList
        }

        const { searchValue, expandedKeys, autoExpandParent } = this.state;
        const loop = data => data.map((item) => {
            dataList.push({ key: item.key, title: item.title })
            const index = item.title.indexOf(searchValue);
            const beforeStr = item.title.substr(0, index);
            const afterStr = item.title.substr(index + searchValue.length);
            const title_filter = index > -1 ? (
                <span>
                    {beforeStr}
                    <span style={{ color: '#f50' }}>{searchValue}</span>
                    {afterStr}
                </span>
            ) : <span>{item.title}</span>;
            const type = item.resource_type;
            const icon = type == 1 ? 'folder' : type == 2 ? 'file' : '';
            const title = (
                <Row>
                    <Col span={12}>{
                        <span>
                            <FontAwesomeIcon icon={icon} style={{ marginRight: '6px' }} />
                            <span style={{ fontWeight: type == 1 ? 'bold' : 'normal' }}>{title_filter}</span>
                        </span>
                    }</Col>
                    <Col span={12} style={{ textAlign: "right", paddingRight: "20px" }}>
                        <a href="javascript:;" onClick={() => this.handleCreate(item)}><FontAwesomeIcon icon="plus" /> <FormattedMessage id="label.add" /></a>
                        <Divider type="vertical" />
                        <a href="javascript:;" onClick={() => this.handleEdit(item)}><FontAwesomeIcon icon="edit" /> <FormattedMessage id="label.edit" /></a>
                        <Divider type="vertical" />
                        <Popconfirm placement="topRight"
                            icon={<FontAwesomeIcon icon="question-circle" className="danger" />}
                            okText={formatMessage({ id: 'button.yes' })}
                            cancelText={formatMessage({ id: 'button.no' })}
                            title={formatMessage({ id: 'system.resource.delete.prompt' })}
                            onConfirm={() => this.handleDelete(item.key)}>
                            <a href="javascript:;"><FontAwesomeIcon icon="times" /> <FormattedMessage id="label.delete" /></a>
                        </Popconfirm>
                    </Col>
                </Row>
            )
            if (item.children) {
                return (
                    <TreeNode key={item.key} title={title}>
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={title} />;
        });

        return (
            <Fragment>
                <CustomPage>
                    <Row gutter={20} className={styles.resource}>
                        <Col span={24} style={{ borderRight: '1px solid #eee' }}>
                            <Card title="资源列表"
                                bordered={false}
                                extra={<Button type="primary" onClick={this.handleCreate} ><FontAwesomeIcon icon="plus" style={{ marginRight: '6px' }} /> <FormattedMessage id="button.add" /></Button>}>
                                <Search style={{ marginBottom: 8 }} placeholder="Search" onChange={this.onChange} />
                                <Tree
                                    defaultExpandAll
                                    onExpand={this.onExpand}
                                    expandedKeys={expandedKeys}
                                    autoExpandParent={autoExpandParent}
                                    showLine
                                    switcherIcon={<FontAwesomeIcon icon="caret-down" />}
                                >
                                    {loop(data)}
                                </Tree>
                            </Card>

                        </Col>
                        {
                            // <Col span={12}>
                            //     <Card title="新增资源" bordered={false}>
                            //         <ResourceForm {...formProps}></ResourceForm>
                            //     </Card>
                            // </Col>
                        }
                    </Row>
                </CustomPage>
            </Fragment>
        )
    }
}
export default Resource