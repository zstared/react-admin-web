import React, { PureComponent, Fragment } from 'react';
import TablePage from '../../components/TablePage'
import { Button, Input, Divider, Popconfirm, Form, Modal,Icon, message } from 'antd';
import { formatMessage, FormattedMessage } from 'umi/locale'
import { connect } from 'dva'
import { formatTime } from '../../utils/utils'
import { regTitle } from '../../utils/validate'

@Form.create()
class FaceForm extends PureComponent {

    //保存
    handleOk = () => {
        const { form, handleSave } = this.props;
        form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return;
            handleSave(fieldsValue);
        })
    }

    render() {
        const { form: { getFieldDecorator }, handleModalVisible, modalVisible, mode, editInfo } = this.props;
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
				maskClosable={false}
                title={
                    mode ? <span><Icon type="plus"></Icon> <FormattedMessage id="modal.title.add" values={{name:formatMessage({id:'face_recognition.face'})}} /></span> :
                        <span><Icon type="edit"></Icon> <FormattedMessage id="modal.title.edit" values={{name:formatMessage({id:'face_recognition.face'})}}  /></span>}
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={handleModalVisible}
            >
                <Form>
                    <Form.Item {...formItemLayout} label={formatMessage({ id: 'label.name' })}>
                        {getFieldDecorator('face_name', {
                            initialValue: !mode ? editInfo.face_name : '',
                            validateFirst: true,
                            rules: [
                                { required: true, whitespace: false, message: formatMessage({ id: 'validation.name.required' }) },
                                { pattern: regTitle, message: formatMessage({ id: 'validation.name' }) },
                            ]
                        })(
                            <Input></Input>
                        )}
                    </Form.Item>

                </Form>
            </Modal>
        )
    }
}


@connect(({ face, loading }) => ({
    data: face.data,
    loading: loading.effects['face/getList']
}))
class Face extends PureComponent {

    state = {
        sortedInfo: {},//排序信息
        filteredInfo: {},//筛选信息
        modalVisible: false,
        modalMode: true,//弹框模式 true-新增；false-编辑
        editInfo: {},
    }

    /**绑定子组件 */
    bindRef = ref => { this.child = ref }

    /**表格排序、筛选变化时触发 */
    handleChange = (sorter, filters) => {
        this.setState({
            sortedInfo: { ...sorter },
            filteredInfo: { ...filters }
        })
    }

    /**删除角色 */
    handleDelete = (id) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'face/delete',
            payload: { id },
            callback: () => {
                message.success(formatMessage({ id: 'msg.deleted' }))
            }
        })
    }


    /**弹框状态 */
    handleModalVisible = () => {
        this.setState({
            modalVisible: !this.state.modalVisible,
        })
    }

    /**打开弹框 model true-新增；false-编辑 */
    handleModalOpen = (mode) => {
        this.setState({
            modalMode: mode,
            modalVisible: !this.state.modalVisible
        })
    }

    /**修改角色 */
    handleEdit = (fieldsValue) => {
        this.setState({
            editInfo: fieldsValue
        }, () => {
            this.handleModalOpen(false)
        })
    }

    /**保存(新增、编辑)角色 */
    handleSave = (fieldsValue) => {
        const { dispatch } = this.props;
        const { modalMode, editInfo } = this.state;

        dispatch({
            type: modalMode ? 'face/create' : 'face/update',
            payload: modalMode ? fieldsValue : Object.assign(fieldsValue, { id: editInfo.id }),
            callback: () => {
                this.setState({
                    modalVisible: false
                })
                message.success(modalMode ? formatMessage({ id: 'msg.created' }) : formatMessage({ id: 'msg.updated' }))
            }
        })
    }


    render() {
        const { data, loading } = this.props;
        const { sortedInfo } = this.state;
        const columns = [{
            title: formatMessage({ id: 'label.name' }),
            key: 'face_name',
            dataIndex: 'face_name',
            fixed: true,
            width: 260,
        }, {
            title: formatMessage({ id: 'label.avatar' }),
            key: 'file_code',
            dataIndex: 'file_code',
            width: 100,
        }, {
            align:'center',
            title: formatMessage({ id: 'label.create-time' }),
            key: 'create_time',
            dataIndex: 'create_time',
            sorter: true,
            sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
            render: (text) => (<span>{formatTime(text)}</span>),
        }, {
            title: formatMessage({ id: 'label.operation' }),
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record) => (
                <div>
                    {
                        !record.is_system ?
                            <span>
                                <a href="javascript:;" onClick={() => this.handleEdit(record)}><Icon type="edit" /> <FormattedMessage id="label.edit" /></a>
                                <Divider type="vertical" />
                                <Popconfirm placement="topRight"
                                    icon={<Icon type="question-circle" className="danger" />}
                                    okText={formatMessage({ id: 'button.yes' })}
                                    cancelText={formatMessage({ id: 'button.no' })}
                                    title={formatMessage({ id: 'reminder.delete',values:formatMessage({id:'face_recognition.face'})})}
                                    onConfirm={() => this.handleDelete(record.id)}>
                                    <a href="javascript:;"><Icon type="delete" /> <FormattedMessage id="label.delete" /></a>
                                </Popconfirm>
                            </span> : null
                    }
                </div>
            )
        }];
        const buttons = (
            <React.Fragment>
                <Button type="primary" icon="plus" onClick={() => this.handleModalOpen(true)} ><FormattedMessage id="button.add" /></Button>
            </React.Fragment>
        )
        const userFormProps = {
            mode: this.state.modalMode,
            editInfo: this.state.editInfo,
            modalVisible: this.state.modalVisible,
            handleModalVisible: this.handleModalVisible,
            handleSave: this.handleSave,
        }
        return (
            <Fragment>
                <TablePage loading={loading} url="face/getList"
                    data={data} columns={columns} buttons={buttons} rowKey="id"
                    onChange={this.handleChange}
                >
                    <TablePage.QueryItem label={formatMessage({ id: 'label.name' })} name="face_name">
                        <Input placeholder={formatMessage({ id: "placeholder.input" })} />
                    </TablePage.QueryItem>
                </TablePage>
                <FaceForm {...userFormProps} ></FaceForm>
            </Fragment>
        )
    }
}

export default Face;