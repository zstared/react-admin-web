import React, { PureComponent, Fragment } from 'react';
import TablePage from '../../components/TablePage'
import { Button, Input, Select, Tag, Divider, Popconfirm, Form, Modal, TreeSelect, InputNumber, Icon, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale'
import { connect } from 'dva'
import { formatTime } from '../../utils/utils'
import { regTitle } from '../../utils/validate'
import { existOrganization } from '../../services/organization'

@Form.create()
class OrganizationForm extends PureComponent {

	state = {
		parent_type: '',//上级组织类型
		type: '',//组织类型
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
	//验证组织名称是否已存在 
	handleexistOrganization = async (rule, value, callback) => {
		const { editInfo, form } = this.props;
		let parent_id = form.getFieldValue('parent_id')
		const params = { name: value, parent_id: parent_id ? parent_id : 0 };
		if (editInfo) params.id = editInfo.id;
		let { code, data } = await existOrganization(params);
		if (!code && data.exist) {
			callback(formatMessage({ id: 'validation.name.existed' }))
		}
		callback()
	}

	//组织类型切换
	handleChangeType = (value) => {
		this.setState({
			type: value,
		})
	}

	//上级组织切换
	handleTreeChange = (value, label, extra) => {
		const { triggerNode } = extra
		this.setState({
			parent_type: triggerNode ? triggerNode.props.type : '',
			type: '',
		})
		this.props.form.setFieldsValue({
			type: ''
		})
	}

	//初始
	initTree = (type) => {
		this.setState({
			parent_type: type ? type : '',
		})
		this.handleChangeType(this.props.form.getFieldValue('type'))
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
					<span>{mode ? <span><Icon type="plus"></Icon> <FormattedMessage id="system.organization.modal.add" /></span> :
						<span><Icon type="edit"></Icon> <FormattedMessage id="system.organization.modal.edit" /></span>}</span>}
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
					<Form.Item {...formItemLayout} label={formatMessage({ id: 'label.type' })}>
						{getFieldDecorator('type', {
							initialValue: mode ? '' : editInfo.type,
							rules: [
								{ required: true, message: formatMessage({ id: 'validation.type.required' }) },
							]
						})(
							<Select disabled={!mode} onChange={this.handleChangeType} >
								{parent_type == 1 || parent_type == 2 ? <Select.Option value={2}><FormattedMessage id="system.organization.type.area" /></Select.Option> : null}
								{parent_type == 1 || parent_type == 2 ? <Select.Option value={3}><FormattedMessage id="system.organization.type.subcompany" /></Select.Option> : null}
								<Select.Option value={4}><FormattedMessage id="system.organization.type.department" /></Select.Option>
								<Select.Option value={5}><FormattedMessage id="system.organization.type.team" /></Select.Option>
							</Select>
						)}
					</Form.Item>
					<Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name' })}>
						{getFieldDecorator('name', {
							initialValue: mode ? '' : editInfo.name,
							validateFirst: true,
							rules: [
								{ required: true, whitespace: false, message: formatMessage({ id: 'validation.name.required' }) },
								{ pattern: regTitle, message: formatMessage({ id: 'validation.name' }) },
								{ validator: this.handleexistOrganization }
							]
						})(
							<Input ></Input>
						)}
					</Form.Item>
					<Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name-short' })}>
						{getFieldDecorator('name_short', {
							initialValue: mode ? '' : editInfo.name_short,
						})(
							<Input ></Input>
						)}
					</Form.Item>
					{
						<Form.Item {...formItemLayout} label={formatMessage({ id: 'label.sort' })}>
							{getFieldDecorator('sort_no', {
								initialValue: mode ? '' : editInfo.sort_no,
							})(
								<InputNumber min={0} step={1} style={{ width: '100%' }}></InputNumber>
							)}
						</Form.Item>
					}
				</Form>
			</Modal>
		)
	}
}


@connect(({ organization, loading }) => ({
	data: organization.data,
	dropList: organization.dropList,
	loading: loading.effects['organization/getList']
}))
class Organization extends PureComponent {

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
			type: 'organization/getDropList',
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
			type: 'organization/delete',
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

	/**新增组织*/
	handleCreate = (parent_id, parent_type) => {
		this.setState({
			parent_id: parent_id ? parent_id : '',
			modalMode: true,
			modalVisible: !this.state.modalVisible
		}, () => {
			this.child.initTree(parent_type)
		})
	}

	/**编辑组织 */
	handleEdit = (fieldsValue) => {
		this.setState({
			modalMode: false,
			editInfo: fieldsValue,
			modalVisible: !this.state.modalVisible
		}, () => {
			let type = fieldsValue.type;
			this.child.initTree(type == 3 ? 2 : 1)
		})
	}

	/**保存(新增、编辑)组织 */
	handleSave = (fieldsValue) => {
		const { dispatch } = this.props;
		const { modalMode, editInfo } = this.state;

		dispatch({
			type: modalMode ? 'organization/create' : 'organization/update',
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
			key: 'name',
			dataIndex: 'name',
			fixed: true,
			width: 300,
		}, {
			title: formatMessage({ id: 'label.name-short' }),
			key: 'name_short',
			dataIndex: 'name_short',
			fixed: true,
			width: 200,
		}, {
			title: formatMessage({ id: 'label.type' }),
			key: 'type',
			dataIndex: 'type',
			width: 140,
			render: (text) => (<span>{text == 1 ?
				<Tag color="orange"><FormattedMessage id="system.organization.type.company" /></Tag> : text == 2 ?
					<Tag color="green"><FormattedMessage id="system.organization.type.area" /></Tag> : text == 3 ?
						<Tag color="orange"><FormattedMessage id="system.organization.type.subcompany" /></Tag> :
						<Tag color="blue"><FormattedMessage id="system.organization.type.department" /></Tag>}</span>)
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
							{record.type != 5 ?
								<span>
									<a   onClick={() => this.handleCreate(record.id, record.type)}><Icon type="plus" /> <FormattedMessage id="system.organization.button.add" /></a>
									<Divider type="vertical" /></span> : null
							}
							<a   onClick={() => this.handleEdit(record)}><Icon type="edit" /> <FormattedMessage id="label.edit" /></a>
							{record.type != 1 ?
								<span>
								<Divider type="vertical" />
								<Popconfirm placement="topRight"
									icon={<Icon type="question-circle" className="danger" />}
									okText={formatMessage({ id: 'button.yes' })}
									cancelText={formatMessage({ id: 'button.no' })}
									title={formatMessage({ id: 'system.organization.delete.prompt' })}
									onConfirm={() => this.handleDelete(record.id)}>
									<a  ><Icon type="delete" /> <FormattedMessage id="label.delete" /></a>
								</Popconfirm></span>: null}
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
				<TablePage loading={loading} url="organization/getList" isTree={true}
					data={data} columns={columns} buttons={buttons} rowKey="id"
					onChange={this.handleChange}
				>
				</TablePage>
				<OrganizationForm {...formProps} ></OrganizationForm>
			</Fragment>
		)
	}
}

export default Organization;