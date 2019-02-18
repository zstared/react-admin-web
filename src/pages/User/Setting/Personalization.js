import React, { PureComponent, Fragment } from 'react'
import { formatMessage,FormattedMessage } from 'umi/locale'
import { Radio, Form, Switch } from 'antd'
import { connect } from 'dva'

@connect(({ app }) => ({
    siderStyle: app.siderStyle,
    navStyle:app.navStyle,
    colorWeak:app.colorWeak
}))
class Personalization extends PureComponent {

    handleChaneSiderStyle = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'app/setSideStyle',
            payload: e.target.value
        })
    }

    handleChaneNavStyle = (e) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'app/setNavStyle',
            payload: e.target.value
        })
    }

    handleChaneColorWeak = (checked) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'app/setColorWeak',
            payload: checked
        })
    }

    render() {
        const { siderStyle,navStyle,colorWeak } = this.props;
        const formItemLayout = {
            labelCol: {
                lg: { span: 4 },
                xl: { span: 3 }
            },
            wrapperCol: {
                lg: { span: 18 },
                xl: { span: 17 }
            },
        };

        return (
            <Fragment>
                <h2><FormattedMessage id="menu.setting.personalization" /></h2>
                <Form>
                    <Form.Item {...formItemLayout} label={formatMessage({id:'setting.personalization.sidebar'})}>
                        <Radio.Group defaultValue={siderStyle} buttonStyle="solid" onChange={this.handleChaneSiderStyle} >
                            <Radio.Button value="dark"><FormattedMessage id="setting.personalization.sidebar.dark" /></Radio.Button>
                            <Radio.Button value="light"><FormattedMessage id="setting.personalization.sidebar.light" /></Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({id:'setting.personalization.navigationbar'})}>
                        <Radio.Group defaultValue={navStyle} buttonStyle="solid" onChange={this.handleChaneNavStyle} >
                            <Radio.Button value="nav"><FormattedMessage id="setting.personalization.navigationbar.tab" /></Radio.Button>
                            <Radio.Button value="breadcrumb"><FormattedMessage id="setting.personalization.navigationbar.breadcrumb" /></Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label={formatMessage({id:'setting.personalization.color-weak'})}>
                        <Switch defaultChecked={colorWeak} onChange={this.handleChaneColorWeak}></Switch>
                    </Form.Item>
                </Form>

            </Fragment>
        )

    }
}
export default Personalization;