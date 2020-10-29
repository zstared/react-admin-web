import React, { PureComponent } from 'react';
import styles from './Login.less';
import { formatMessage, FormattedMessage } from 'umi';
import { connect } from 'dva';
import logo from '../../assets/logo.svg';
import banner from '../../assets/banner.svg';
import { Row, Col, Button, Tabs, Form, Input, Checkbox, Icon } from 'antd';
import SelectLang from '@/components/SelectLang';
import { decryptData } from '../../utils/utils';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@connect(({ loading }) => ({
    submitting: loading.effects['oauth/login'],
}))
class Login extends PureComponent {
    state = {
        user_name: localStorage.getItem('user_name'),
        password: localStorage.getItem('password')
            ? decryptData(localStorage.getItem('password'), 'zhengxinhong')
            : '',
    };

    /**
     * 登录
     */
    login = () => {
        const {
            dispatch,
            form: { validateFields },
        } = this.props;
        validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'oauth/login',
                    payload: values,
                });
            }
        });
    };

    render() {
        const {
            submitting,
            form: { getFieldDecorator },
        } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.container}>
                        <div className={styles.logo}>
                            <img src={logo}></img>
                            <span className={styles.title}>后台管理系统</span>
                        </div>
                        {/* <div className={styles.toolbar}>
                             <SelectLang />
                        </div> */}
                    </div>
                </div>
                <div className={styles.content}>
                    <Row>
                        <Col span={13} offset={2} className={styles.banner}>
                            <img src={banner}></img>
                            {/* <p><FormattedMessage id="login.slogan" /></p> */}
                        </Col>
                        <Col span={9}>
                            <div className={styles.loginTab}>
                                <Tabs>
                                    <TabPane
                                        tab={formatMessage({
                                            id: 'login.tab-account',
                                        })}
                                        key='1'>
                                        <Form
                                            className='login-form'
                                            ref='loginForm'>
                                            <FormItem>
                                                {getFieldDecorator(
                                                    'user_name',
                                                    {
                                                        initialValue: this.state
                                                            .user_name,
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: formatMessage(
                                                                    {
                                                                        id:
                                                                            'validation.username.required',
                                                                    }
                                                                ),
                                                            },
                                                        ],
                                                    }
                                                )(
                                                    <Input
                                                        size='large'
                                                        prefix={
                                                            <Icon
                                                                type='user'
                                                                style={{
                                                                    color:
                                                                        'rgba(0,0,0,.25)',
                                                                }}
                                                            />
                                                        }
                                                        placeholder={
                                                            formatMessage({
                                                                id:
                                                                    'login.placeholder.username',
                                                            }) + ':admin/testA'
                                                        }
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem>
                                                {getFieldDecorator('password', {
                                                    initialValue: this.state
                                                        .password,
                                                    rules: [
                                                        {
                                                            required: true,
                                                            message: formatMessage(
                                                                {
                                                                    id:
                                                                        'validation.password.required',
                                                                }
                                                            ),
                                                        },
                                                    ],
                                                })(
                                                    <Input
                                                        size='large'
                                                        prefix={
                                                            <Icon
                                                                type='lock'
                                                                style={{
                                                                    color:
                                                                        'rgba(0,0,0,.25)',
                                                                }}
                                                            />
                                                        }
                                                        type='password'
                                                        placeholder={
                                                            formatMessage({
                                                                id:
                                                                    'login.placeholder.password',
                                                            }) +
                                                            ':admin/abc123456'
                                                        }
                                                        onPressEnter={
                                                            this.login
                                                        }
                                                    />
                                                )}
                                            </FormItem>
                                            <FormItem
                                                style={{ marginBottom: '0' }}>
                                                {getFieldDecorator('remember', {
                                                    valuePropName: 'checked',
                                                    initialValue: true,
                                                })(
                                                    <Checkbox>
                                                        <FormattedMessage id='login.remember-me'></FormattedMessage>
                                                    </Checkbox>
                                                )}

                                                <Button
                                                    size='large'
                                                    type='primary'
                                                    onClick={this.login}
                                                    loading={submitting}
                                                    style={{
                                                        width: '100%',
                                                        marginTop: '10px',
                                                    }}>
                                                    <FormattedMessage id='login.btn.login'></FormattedMessage>
                                                </Button>
                                            </FormItem>
                                        </Form>
                                    </TabPane>
                                    {/* <TabPane tab={formatMessage({id:'login.tab-qrcode'})} key="2">

                                    </TabPane> */}
                                </Tabs>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.footer}>
                    {/* <div className={styles.links}>
                        <a href='https://react.docschina.org/' target="_blank" >React</a>
                        <a href='https://ant.design/index-cn' target="_blank" >Ant Design</a>
                        <a href='https://preview.pro.ant.design/user/login' target="_blank" >Ant Design Pro</a>
                        <a href='https://umijs.org/' target="_blank" >UmiJS</a>
                        <a href='https://www.csdn.net' target="_blank" >CSDN</a>
                    </div> */}
                    <div className={styles.copyright}>
                        Copyright 2018 © zhengxinhong{' '}
                        <a href='http://www.beian.miit.gov.cn' target='_blank'>
                            粤ICP备19046566号
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Form.create()(Login);
