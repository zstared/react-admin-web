import React from 'react'
import Mock from 'mockjs';
import { Table, Badge, Menu, Dropdown, Icon, Card, Form, Input, DatePicker, Button, Row, Col } from 'antd';
import styled from 'styled-components'
import { SearchOutlined, SafetyCertificateOutlined } from '@ant-design/icons'
const Wrapper = styled.div`
   .search{
       background:#fff;
       margin:10px;
       padding:10px;
   }

   .table{
     margin:0 10px;
     background:#fff;
   }
`

const User = () => {


    let columns = [
        { title: '账号', dataIndex: 'Field1', key: 'Field1', width: 150, fixed: 'left' },
        { title: '用户名', dataIndex: 'Field2', key: 'Field2', width: 150, fixed: 'left' },
        { title: '手机号', dataIndex: 'Field3', key: 'Field3', width: 150 },
        { title: '邮箱', dataIndex: 'Field4', key: 'Field4', width: 150 },
        { title: '角色', dataIndex: 'Field5', key: 'Field5', width: 150 },
        { title: '操作', dataIndex: 'Field6', key: 'Field6', width: 150  ,fixed: 'right',
        width: 100,
        render: () => <a><SafetyCertificateOutlined /> {' '}权限</a>,
      }]

    const data = [];
    for (let i = 0; i < 100; ++i) {
        data.push(Mock.mock({
            key: i,
            Field1: '@string("number", 10)',
            Field2: '@cname',
            Field3: /^[1][345789][0-9]{9}$/,
            Field4:'@email',
            Field5: '@string("upper", 6, 6)',
        }));

    }
    return (
        <Wrapper>
            <div className="search">

                <Row style={{ width: '100%' }}>
                    <Col span={20}>
                        <Form layout="inline" >
                            <Form.Item label="账号">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Button icon={<SearchOutlined />} type="primary">查询</Button>
                        </Form>
                    </Col>
                </Row>

            </div>
            <div className="table">
                <Table

                    size="small"
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    sticky
                    rowSelection
                    pagination={{
                        defaultPageSize: 20,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
                    }}
                />
            </div>
        </Wrapper>
    );
}

export default User;


