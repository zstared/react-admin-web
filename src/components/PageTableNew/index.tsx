import React, { useState, useEffect } from 'react';
import { Table, Form, Col, Row, Button } from 'antd';
import { UpOutLined, DownOutLined, SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { TableCode } from '../../utils/emun';
import { getColumns } from '../../services/table';
const FormItem = Form.Item;

interface IQueryItem {
    label: string;
    name: string;
}

export const QueryItem: React.FC<IQueryItem> = () => {};

interface ITablePageProps {
    tableCode: string;
    columns: [];
    queryItem: IQueryItem[];
    buttons: React.ReactNode;
}

const Wrapper = styled.div`
    padding: 10px;
    .search {
        background: #fff;
        padding: 10px;
        margin-bottom: 10px;
        .ant-form-item {
            display: flex;
            margin-bottom: 0;
        }
        .ant-form-item-control-wrapper {
            flex: 1;
        }
    }
`;

export const TablePage: React.FC<ITablePageProps> = (props) => {
    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [expand, setExpand] = useState(false);
    const [itemBase, setItemBase] = useState([]);
    const [itemMore, setItemMore] = useState([]);

    //初始查询项
    const initQuery = async () => {
        const queryItem = { base: [], more: [] };
        React.Children.map(props.children, (child, index) => {
            const { label, name, children } = child.props;
            if (index < 2) {
                queryItem.base.push(
                    <Col key={index} span={6}>
                        <FormItem label={label}>{children}</FormItem>
                    </Col>
                );
            } else {
                queryItem.more.push(
                    <Col key={index} span={6}>
                        <FormItem label={label}>{children}</FormItem>
                    </Col>
                );
            }
        });
        console.log(queryItem.base, queryItem.more);
        setItemBase(queryItem.base);
        setItemMore(queryItem.more);
    };

    //初始表格字段 表格数据
    const initTable = async () => {
        const { code, data } = await getColumns({
            table_code: TableCode.table_sales_order,
        });
        if (code == 0) {
            const { columns } = data;

            setColumns(columns);
        }
        setLoading(false);
    };

    const handleFinish = () => {
        console.log('handleFinish');
    };

    const handleReset = () => {
        console.log('handleReset');
    };

    const handleExpand = () => {
        console.log('handleExpand');
    };

    useEffect(() => {
        initQuery();
        const init = async () => {
            await initTable();
        };
        init();
    }, []);

    return (
        <Wrapper>
            <header className='search'>
                <Form onFinish={handleFinish}>
                    <Row gutter={16}>
                        {itemBase}
                        {itemBase.length > 0 ? (
                            <Col span={6}>
                                <FormItem>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        icon={<SearchOutlined />}>
                                        查询
                                    </Button>
                                    <Button
                                        onClick={handleReset}
                                        style={{ marginLeft: 8 }}>
                                        重置
                                    </Button>
                                    {itemMore.length > 0 ? (
                                        <a
                                            style={{ marginLeft: 8 }}
                                            onClick={handleExpand}>
                                            {expand ? (
                                                <span>
                                                    <DownOutLined />
                                                </span>
                                            ) : (
                                                <span>
                                                    <UpOutLined />
                                                </span>
                                            )}
                                        </a>
                                    ) : null}
                                </FormItem>
                            </Col>
                        ) : null}
                        <Col
                            span={6}
                            offset={12}
                            style={{ textAlign: 'right' }}>
                            <FormItem>{props.buttons}</FormItem>
                        </Col>
                    </Row>

                    {expand ? <Row gutter={16}>{itemMore}</Row> : null}
                </Form>
            </header>
            <Table
                loading={loading}
                columns={columns}
                scroll={{ x: 'max-content' }}></Table>
        </Wrapper>
    );
};
