
import React from 'react'
import Mock from 'mockjs';
import { Table, Badge, Menu, Dropdown, Icon, Card, Form, Input, DatePicker, Button, Row, Col } from 'antd';
import styled from 'styled-components'

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

const Inventory = () => {

    
    let columns = [
        { title: '仓库', dataIndex: 'Field1', key: 'Field1', width: 150, fixed: 'left' },
        { title: '仓位', dataIndex: 'Field2', key: 'Field2', width: 150, fixed: 'left' },
        { title: '安全库存数量', dataIndex: 'Field3', key: 'Field3', width: 150 },
        { title: '预计入库量', dataIndex: 'Field4', key: 'Field4', width: 150 },
        { title: '即时库存量', dataIndex: 'Field5', key: 'Field5', width: 150 },
        { title: '需采购数', dataIndex: 'Field6', key: 'Field6', width: 150 },
        { title: '供应商', dataIndex: 'Field7', key: 'Field7', width: 150 },

    ];

    const data = [];
    for (let i = 0; i < 10; ++i) {
        data.push(Mock.mock({
            key: i,
            Field1: '@string("number", 10)',
            Field2: '@string("number", 4)',
            Field3: '@integer(60,200)',
            Field4: '@integer(60,200)',
            Field5: '@integer(60,200)',
            Field6: '@integer(60,200)',
            Field7: '@string("upper", 6, 6)',
        }));

    }
    return (
        <Wrapper>
            <div className="search">

                <Row style={{ width: '100%' }}>
                    <Col span={20}>
                        {/* <Form layout="inline" >
                            <Form.Item label="安全库存">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item label="交货日期">
                                <DatePicker />
                            </Form.Item>
                            <Button icon={<SearchOutlined />} type="primary">查询</Button>
                        </Form> */}
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <Button  type="primary"> 生成采购订单 </Button>
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

export default Inventory;

