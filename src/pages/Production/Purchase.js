
import React from 'react'
import Mock from 'mockjs';
import { Table, Badge, Menu, Dropdown, Icon, Card, Form, Input, DatePicker, Button, Row, Col } from 'antd';
import styled from 'styled-components'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
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

const Purchase = () => {


    let columns = [
        { title: '销售订单号', dataIndex: 'Field1', key: 'Field1', width: 150, fixed: 'left' },
        { title: '任务单号', dataIndex: 'Field2', key: 'Field2', width: 150, fixed: 'left' },
        { title: '产品代码', dataIndex: 'Field3', key: 'Field3', width: 150 },
        { title: '产品名称', dataIndex: 'Field4', key: 'Field4', width: 150 },
        { title: '产品规格', dataIndex: 'Field5', key: 'Field5', width: 150 },
        { title: '物料代码', dataIndex: 'Field6', key: 'Field6', width: 150 },
        { title: '物料名称', dataIndex: 'Field7', key: 'Field7', width: 150 },
        { title: '物料规格', dataIndex: 'Field8', key: 'Field8', width: 150 },
        { title: '投料数量', dataIndex: 'Field9', key: 'Field9', width: 150 },
        { title: '已领数', dataIndex: 'Field10', key: 'Field10', width: 150 },
        { title: '未领数', dataIndex: 'Field11', key: 'Field11', width: 150 },
        { title: '采购供应商', dataIndex: 'Field12', key: 'Field12', width: 150 },
    ];

    const data = [];
    for (let i = 0; i < 10; ++i) {
        data.push(Mock.mock({
            key: i,
            Field1: '@string("number", 10)',
            Field2: '@string("number", 4)',
            Field3: '@string("upper", 6, 6)',
            Field4: '@string("upper", 6, 6)',
            Field5: '@string("upper", 6, 6)',
            Field6: '@string("upper", 6, 6)',
            Field7: '@string("upper", 6, 6)',
            Field8: '@string("upper", 6, 6)',
            Field9: '@integer(60,200)',
            Field10: '@integer(60,200)',
            Field11: '@integer(60,200)',
            Field12: '@string("upper", 6, 6)',
        }));

    }
    return (
        <Wrapper>
            <div className="search">

                <Row style={{ width: '100%' }}>
                    <Col span={20}>
                        <Form layout="inline" >
                            <Form.Item label="销售订单号">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item label="任务单号">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item label="产品代码">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Form.Item label="物料代码">
                                <Input placeholder="请输入" />
                            </Form.Item>
                            <Button icon={<SearchOutlined />} type="primary">查询</Button>
                        </Form>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <Button type="primary"> 生成采购申请 </Button>
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

export default Purchase;


