import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { Form,Input} from 'antd'
const FormItem=Form.Item

@connect(({app}) => ({
    currentUser: app.currentUser
}))
@Form.create()
class Base extends PureComponent {

    render() {
        const {getFieldDecorator}=this.props.form;
        const {currentUser}=this.props;
        console.log(currentUser)
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
            <div style={{width:'600px'}}>
                <h2>基本设置</h2>
                <Form>
                     <FormItem {...formItemLayout} label="姓名">
                         {getFieldDecorator('name_cn',{
                             initialValue:currentUser.name_cn,
                             rules:[{max:50,min:1}]
                         })}
                          <Input></Input>
                     </FormItem>
                     <FormItem>

                     </FormItem>
                </Form>
            </div>
        )
    }
}
export default Base;