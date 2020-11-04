import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Table, Form, Col, Row, Button } from 'antd';
import { ConnectProps, connect, Dispatch } from 'umi';
import { DndProvider, useDrag, useDrop, createDndContext } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import {
    CaretUpOutlined,
    CaretDownOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { TableCode } from '../../utils/emun';
import { getTableAndColumns } from '../../services/table';
const FormItem = Form.Item;

interface ITablePageProps extends ConnectProps {
    dispatch: Dispatch;
    tableCode?: string;
    tableColumns?: [];
    querys?: React.ReactNode;
    buttons?: React.ReactNode;
    url: string;
    data: any;
    loading: boolean;
    rowKey?: string;
    expandable?: object;
    bordered: boolean;
    draggabled: boolean;
    onDraggabed: Function;
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
    tr.drop-over-downward td {
        border-bottom: 2px dashed #1890ff;
    }

    tr.drop-over-upward td {
        border-top: 2px dashed #1890ff;
    }
`;

//拖拽 排序
const RNDContext = createDndContext(HTML5Backend);
const type = 'DragableBodyRow';
const DragableBodyRow = ({
    index,
    moveRow,
    className,
    style,
    ...restProps
}) => {
    const ref = React.useRef();
    const [{ isOver, dropClassName }, drop] = useDrop({
        accept: type,
        collect: (monitor) => {
            const { index: dragIndex } = monitor.getItem() || {};
            if (dragIndex === index) {
                return {};
            }
            return {
                isOver: monitor.isOver(),
                dropClassName:
                    dragIndex < index
                        ? ' drop-over-downward'
                        : ' drop-over-upward',
            };
        },
        drop: (item) => {
            moveRow(item.index, index);
        },
    });
    const [, drag] = useDrag({
        item: { type, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    drop(drag(ref));
    return (
        <tr
            ref={ref}
            className={`${className}${isOver ? dropClassName : ''}`}
            style={{ cursor: 'move', ...style }}
            {...restProps}
        />
    );
};

const TablePage: React.FC<ITablePageProps> = (props) => {
    const {
        dispatch,
        tableCode,
        tableColumns,
        buttons,
        querys,
        url,
        data,
        loading,
        rowKey,
        expandable,
        bordered,
        draggabled,
        onDraggabed,
    } = props;
    const [form] = Form.useForm();

    const [columns, setColumns] = useState([]);
    const [expand, setExpand] = useState(false);
    const [itemBase, setItemBase] = useState([]);
    const [itemMore, setItemMore] = useState([]);

    const [pagination, setPagination] = useState({
        page_index: 1,
        page_size: 10,
    });
    const [sortedInfo, setSortedInfo] = useState({});
    const [filteredInfo, setFilteredInfo] = useState({});

    useEffect(() => {
        if (querys) initQuery();
        if (!tableCode) setColumns(tableColumns);
        const init = async () => {
            await initTable();
        };
        init();
    }, []);

    //初始查询项
    const initQuery = async () => {
        const queryItem = { base: [], more: [] };
        React.Children.map(props.querys.props.children, (child, index) => {
            if (index < 2) {
                queryItem.base.push(
                    <Col key={index} span={6}>
                        {child}
                    </Col>
                );
            } else {
                queryItem.more.push(
                    <Col key={index} span={6}>
                        {child}
                    </Col>
                );
            }
        });
        setItemBase(queryItem.base);
        setItemMore(queryItem.more);
    };

    //初始表格字段 表格数据
    const initTable = async () => {
        if (tableCode) {
            const { code, data } = await getTableAndColumns({
                table_code: TableCode.table_sales_order,
            });
            if (code == 0) {
                const { columns } = data;
                setColumns(columns);
            }
        }
        handleQuery(true);
    };

    //查询
    const handleQuery = (isFirst = false) => {
        const values = form.getFieldsValue();
        const params = { ...pagination, ...values, ...filteredInfo };
        if (isFirst) {
            params.page_index = 1;
        }
        if (url) {
            dispatch({
                type: url,
                payload: params || {},
            });
        }
    };

    const handleChange = (pagination, filters, sorter) => {
        setPagination({
            page_index: pagination.current,
            page_size: pagination.pageSize,
        });
    };

    const handleFinish = () => {
        handleQuery();
        console.log('handleFinish');
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleExpand = () => {
        console.log('handleExpand');
    };

    //移动 排序
    const moveRow = useCallback(
        (dragIndex, hoverIndex) => {
            const rows = data.rows ? data.rows : data;
            console.log(
                dragIndex,
                hoverIndex,
                data,
                rows,
                rows[dragIndex],
                rows[hoverIndex]
            );
            const drag_row = rows[dragIndex];
            const hover_row = rows[hoverIndex];
            if (onDraggabed) onDraggabed(drag_row, hover_row,dragIndex,hoverIndex);
        },
        [data]
    );

    const manager = useRef(RNDContext);

    //渲染表格
    const renderTable = () => {
        const attrs = {
            rowKey: rowKey,
            loading: loading,
            dataSource: data.rows ? data.rows : data,
            columns: columns,
            onChange: handleChange,
            scroll: { x: 'max-content' },
            size: 'small',
            expandable: { ...expandable },
            bordered: bordered,
            pagination: data.rows
                ? {
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total) => `共 ${total} 条记录`,
                      pageSizeOptions: ['10', '20', '50', '100'],
                      total: data.count,
                      current: data.page_index,
                      pageSize: data.page_size,
                  }
                : false,
        };
        if (draggabled) {
            attrs.components = {
                body: {
                    row: DragableBodyRow,
                },
            };
            attrs.onRow = (record, index) => ({
                index,
                moveRow,
            });
        }
        return (
            <Table
                {...attrs}
                // rowKey={rowKey}
                // loading={loading}
                // dataSource={data.rows ? data.rows : data}
                // columns={columns}
                // onChange={handleChange}
                // scroll={{ x: 'max-content' }}
                // size='small'
                // expandable={{ ...expandable }}
                // bordered={bordered}
                // pagination={
                //     data.rows
                //         ? {
                //               showSizeChanger: true,
                //               showQuickJumper: true,
                //               showTotal: (total) => `共 ${total} 条记录`,
                //               pageSizeOptions: ['10', '20', '50', '100'],
                //               total: data.count,
                //               current: data.page_index,
                //               pageSize: data.page_size,
                //           }
                //         : false
                // }
            ></Table>
        );
    };
    return (
        <Wrapper>
            {buttons || querys ? (
                <header className='search'>
                    <Form form={form} onFinish={handleFinish}>
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
                                                    <CaretUpOutlined />
                                                ) : (
                                                    <CaretDownOutlined />
                                                )}
                                            </a>
                                        ) : null}
                                    </FormItem>
                                </Col>
                            ) : null}
                            <Col
                                span={6}
                                offset={24 - (itemBase.length * 6 + 12)}
                                style={{ textAlign: 'right' }}>
                                <FormItem>{buttons}</FormItem>
                            </Col>
                        </Row>

                        {expand ? <Row gutter={16}>{itemMore}</Row> : null}
                    </Form>
                </header>
            ) : null}
            {draggabled ? (
                <DndProvider manager={manager.current.dragDropManager}>
                    {renderTable()}
                </DndProvider>
            ) : (
                renderTable()
            )}
        </Wrapper>
    );
};

export default connect()(TablePage);
