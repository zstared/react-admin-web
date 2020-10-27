import React from 'react';
import { Row, Col, Card, Table, Select } from 'antd';
import { Column, Bar, Pie } from '@ant-design/charts';
import styled from 'styled-components';

import {
    columns,
    data,
    configColumn,
    configBar,
    configDonut,
    configSalary
} from './chartData';

const Wrapper = styled.div`
    padding: 24px;
    .chart {
        height: 260px;
    }
    .table-color-dust {
        color: #fff;
        background: green;
        .ant-table-cell-fix-left,
        .ant-table-cell-fix-right {
            background: green;
        }
    }
    .rate-cell {
        padding: 0 !important;
        .yellow {
            background: #f8e7dd;
            height: 36px;
            line-height: 36px;
        }
        .green {
            background: #dff1cd;
            height: 36px;
            line-height: 36px;
        }
    }
`;

const Home = () => {
    return (
        <Wrapper>
            <Row style={{ marginBottom: '24px' }}>
                <Col span={24}>
                    <Card
                        title='JIT看板'
                        extra={
                            <Select defaultValue='0' style={{ width: 160 }}>
                                <Select.Option value='0'>
                                    所有车间
                                </Select.Option>
                                <Select.Option value='1'>
                                    第一车间
                                </Select.Option>
                                <Select.Option value='2'>
                                    第二车间
                                </Select.Option>
                                <Select.Option value='3'>
                                    第三车间
                                </Select.Option>
                                <Select.Option value='4'>
                                    第四车间
                                </Select.Option>
                            </Select>
                        }>
                        <Table
                            size='small'
                            columns={columns}
                            dataSource={data}
                            scroll={{ x: 1500, y: 300 }}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter='24' style={{ marginBottom: '24px' }}>
                <Col span={12}>
                    <Card title='采购员的准时交货率'>
                        <div className='chart'>
                            <Column {...configColumn} />
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title='车间的日计划达成率'>
                        <div className='chart'>
                            <Pie {...configDonut} />
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row gutter='24'>
                <Col span={12}>
                    <Card title='每天的工资排名TOP'>
                        <div className='chart'>
                            <Bar {...configSalary} />
                        </div>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title='主计划达成率'>
                        <div className='chart'>
                            <Bar {...configBar} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </Wrapper>
    );
};

export default Home;
