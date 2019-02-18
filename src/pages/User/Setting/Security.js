import React, { PureComponent, Fragment } from 'react'
import { FormattedMessage, formatMessage } from 'umi/locale'
import { connect } from 'dva'
import { List, Modal, Form, Input } from 'antd';
import { regPassword } from '../../../utils/validate'

@connect(({ app }) => ({
    currentUser: app.currentUser,
}))
@Form.create()
class Security extends PureComponent {

    state = {
        modalVisible: false
    }

    handleOpenModal = () => {
        this.setState({
            modalVisible: true
        })
    }

    handleCloseModal = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: false
        })

    }

    /**修改密码 */
    handUpdatePwd = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const { currentUser, dispatch } = this.props;
                values.user_name = currentUser.user_name
                dispatch({
                    type: 'app/updatePassword',
                    payload: values
                })
                this.handleCloseModal()
            }
        })
    }

    getPwdStrength = () => {
        const { password_strength } = this.props.currentUser;
        if (password_strength == 3) {
            return (
                <font className="strong"> <FormattedMessage id="setting.security.password.strength.strong" /></font>
            )
        } else if (password_strength == 2) {
            return (
                <font className="medium"> <FormattedMessage id="setting.security.password.strength.medium" /></font>
            )
        } else {
            return (
                <font className="weak"> <FormattedMessage id="setting.security.password.strength.weak" /></font>
            )
        }
    }

    getList = () => {

        const list = [
            {
                title: formatMessage({ id: 'setting.security.password' }, {}),
                description: (
                    <Fragment>
                        {formatMessage({ id: 'setting.security.password-description' })}：
                    {this.getPwdStrength()}
                    </Fragment>
                ),
                actions: [
                    <a onClick={this.handleOpenModal}>
                        <FormattedMessage id="label.update" />
                    </a>,
                ],
            },
        ]

        return list;
    }

    getModelContent = () => {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 13 },
        };
        return (
            <Form layout="horizontal"  >
                <Form.Item {...formItemLayout} label={formatMessage({ id: 'setting.security.password.old' })}>
                    {getFieldDecorator('old_password', {
                        rules: [
                            { required: true, message: formatMessage({ id: 'setting.security.validation.password.required' }) },
                            { pattern: regPassword, message: formatMessage({ id: 'setting.security.validation.password' }) }
                        ]
                    })(
                        <Input type="password" autoFocus></Input>
                    )}
                </Form.Item>
                <Form.Item  {...formItemLayout} label={formatMessage({ id: 'setting.security.password.new' })}>
                    {getFieldDecorator('new_password', {
                        initialValue:'',
                        rules: [
                            { required: true, message: formatMessage({ id: 'setting.security.validation.password.required' }) },
                            { pattern: regPassword, message: formatMessage({ id: 'setting.security.validation.password' }) }
                        ]
                    })(
                        <Input type="password"></Input>
                    )}
                </Form.Item>
            </Form>
        )
    }


    render() {
        return (
            <Fragment>
                <h2><FormattedMessage id="menu.setting.security" /></h2>
                <List
                    itemLayout="horizontal"
                    dataSource={this.getList()}
                    renderItem={item => (
                        <List.Item actions={item.actions}>
                            <List.Item.Meta title={item.title} description={item.description}></List.Item.Meta>
                        </List.Item>
                    )}>
                </List>
                <Modal
                    title={formatMessage({ id: 'setting.security.password.update-title' })}
                    visible={this.state.modalVisible}
                    onCancel={this.handleCloseModal}
                    onOk={this.handUpdatePwd}
                    cancelText={formatMessage({ id: 'button.cancel' })}
                    okText={formatMessage({ id: 'button.confirm' })}
                >
                    {this.getModelContent()}
                </Modal>
            </Fragment>
        )

    }
}
export default Security;