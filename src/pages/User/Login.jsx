import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { connect } from 'umi';

//import logo from '../../assets/images/logo.png';

const Wrapper = styled.div`
    //background: #f0f2f5;
    height: 100vh;
    padding: 120px 0;

    .header {
        text-align: center;
        height: 44px;
        line-height: 44px;
        margin-bottom: 60px;
        img {
            width: 44px;
            margin-right: 10px;
            vertical-align: top;
        }
        .title {
            font-size: 30px;
            font-weight: bold;
        }
    }
    .login-form {
        width: 368px;
        margin: 0 auto;

        .btn {
            margin: 16px 0;
        }
    }
`;

const Login = ({ dispatch, submitting }) => {
    const onFinish = (values) => {
        dispatch({
            type: 'oauth/login',
            payload: values,
        });
	};


    return (
        <Wrapper>
            <div className='header'>
                <span className='title'>生产管理系统</span>
            </div>
            <Form className='login-form' onFinish={onFinish}>
                <Form.Item
                    name='user_name'
                    rules={[
                        {
                            required: true,
                            message: '请输入账号',
                        },
                    ]}>
                    <Input prefix={<UserOutlined />} placeholder='账号' />
                </Form.Item>
                <Form.Item
                    name='password'
                    rules={[
                        {
                            required: true,
                            message: '请输入密码',
                        },
                    ]}>
                    <Input
                        prefix={<LockOutlined />}
                        type='password'
                        placeholder='密码'
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        className='btn'
                        type='primary'
                        htmlType='submit'
                        block
                        loading={submitting}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Wrapper>
    );
};

export default connect(({ loading }) => ({
    submitting: loading.effects['oauth/login'],
}))(Login);
