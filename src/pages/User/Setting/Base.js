import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form, Input, Radio, Button,message} from 'antd'
import { formatMessage, FormattedMessage } from 'umi/locale'
import UploadImage from '../../../components/UploadImage'
import { regPhone, regNameCn, regNameEn } from '../../../utils/validate'

const FormItem = Form.Item

@connect(({ app }) => ({
    currentUser: app.currentUser,

}))
@Form.create()
class Base extends PureComponent {


    /**保存 */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const file = values.avatar_file[0]
                const avatar = file ? file.code : '';
                values.avatar_file = file
                const newUserInfo = Object.assign(this.props.currentUser, values, { avatar: avatar })
                const { dispatch } = this.props;
                await dispatch({
                    type: 'app/updateCurrentUser',
                    payload: newUserInfo,
                    callback:()=>{
                        message.success(formatMessage({id:'msg.saved'}))
                    }
                })
            }
        })
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const { currentUser } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div style={{ width: '600px' }}>
                <h2><FormattedMessage id="menu.setting.base" /></h2>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label={formatMessage({ id: 'label.avatar' })}>
                        {getFieldDecorator('avatar_file', {
                            valuePropName: 'fileList',
                            initialValue: currentUser.avatar_file ? [currentUser.avatar_file] : []
                        })(
                            <UploadImage maxLimit={1} data={{
                                is_static: true,
                                folder_name: 'avatar',
                                is_thumb: true,
                            }} />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({ id: 'label.name-cn' })}>
                        {getFieldDecorator('name_cn', {
                            initialValue: currentUser.name_cn,
                            rules: [
                                { required: true, whitespace: false, message: formatMessage({ id: 'validation.name-cn.required' }) },
                                { max: 50, min: 1, pattern: regNameCn, message: formatMessage({ id: 'validation.name-cn' }) }
                            ]
                        })(
                            <Input ></Input>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({ id: 'label.name-en' })}>
                        {getFieldDecorator('name_en', {
                            initialValue: currentUser.name_en,
                            rules: [
                                { whitespace: true, message: formatMessage({ id: 'validation.name-en.required' }) },
                                { max: 50, min: 1, pattern: regNameEn, message: formatMessage({ id: 'validation.name-en' }) }
                            ]
                        })(
                            <Input ></Input>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({ id: 'label.sex' })}>
                        {getFieldDecorator('sex', {
                            initialValue: currentUser.sex,
                            rules: [{ required: true }]
                        })(
                            <Radio.Group >
                                <Radio value={1}><FormattedMessage id="label.sex.male"/></Radio>
                                <Radio value={2}><FormattedMessage id="label.sex.female"/></Radio>
                            </Radio.Group>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({ id: 'label.mobile' })}>
                        {getFieldDecorator('mobile', {
                            initialValue: currentUser.mobile,
                            rules: [
                                { required: true, message: formatMessage({ id: 'validation.mobile.required' }) },
                                { pattern: regPhone, message: formatMessage({ id: 'validation.mobile' }) }
                            ]
                        })(
                            <Input></Input>
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label={formatMessage({ id: 'label.email' })}>
                        {getFieldDecorator('mail', {
                            initialValue: currentUser.mail,
                            rules: [{
                                type: 'email', message: formatMessage({ id: 'validation.email' })
                            }]
                        })(
                            <Input></Input>
                        )}
                    </FormItem>
                    <Form.Item
                        wrapperCol={{ span: 12, offset: 6 }} style={{ textAlign: 'center' }}
                    >
                        <Button type="primary" htmlType="submit"><FormattedMessage id="button.save" /></Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
export default Base;