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

const Log = () => {


    let columns = [
        { title: '操作类型', dataIndex: 'Field1', key: 'Field1', width: 150, fixed: 'left' },
        { title: '操作内容', dataIndex: 'Field2', key: 'Field2', width: 150, fixed: 'left' },
        { title: '操作人', dataIndex: 'Field3', key: 'Field3', width: 150 },
        { title: '操作时间', dataIndex: 'Field4', key: 'Field4', width: 150 }
      ]

    const data = [];
    for (let i = 0; i < 100; ++i) {
        data.push(Mock.mock({
            key: i,
            Field1: '@string("number", 10)',
            Field2: '@sentence(3, 5)',
            Field3:'@cname',
            Field4:'@datetime',
        }));

    }
    return (
        <Wrapper>
            <div className="search">

                <Row style={{ width: '100%' }}>
                    <Col span={20}>
                        <Form layout="inline" >
                            <Form.Item label="操作内容">
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

export default Log;


