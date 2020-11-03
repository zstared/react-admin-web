import React, { useState, useEffect } from 'react';
import { Input, Button, Form } from 'antd';
import TablePage from '../../components/PageTableNew';
import { connect } from 'umi';
import { getTableColumns } from '../../services/table';

const TableColumn = ({ data, loading }) => {
    const [expData, setExpData] = useState({});

    const buttons = <Button type='primary'>导出</Button>;
    const columns = [
        {
            title: '表格名称',
            dataIndex: 'table_name',
            key: 'table_name',
        },
        {
            title: '表格编码',
            dataIndex: 'table_code',
            key: 'table_code',
        },
    ];

    const querys = (
        <React.Fragment>
            <Form.Item label='名称' name='name'>
                <Input placeholder='请输入'></Input>
            </Form.Item>
            <Form.Item label='名称1' name='name1'>
                <Input placeholder='请输入'></Input>
            </Form.Item>
            <Form.Item label='名称1' name='name1'>
                <Input placeholder='请输入'></Input>
            </Form.Item>
            <Form.Item label='名称1' name='name1'>
                <Input placeholder='请输入'></Input>
            </Form.Item>
        </React.Fragment>
    );

    const onExpand = async (expanded, record) => {
        if (expanded) {
            const { code, data } = await getTableColumns({
                table_id: record.id,
            });
            if (code == 0) {
                setExpData({
                    ...expData,
                    [record.id]: data,
                });
            }
        } else {
        }
    };

    const expandedRowRender = (record, index, indent, expanded) => {
        const exp_columns = [
            { title: '字段名称', dataIndex: 'title', key: 'title' },
            { title: '字段编码', dataIndex: 'dataIndex', key: 'dataIndex' },
            { title: '宽度', dataIndex: 'width', key: 'width' },
			{ title: '是否固定', dataIndex: 'fixed', key: 'fixed' },
        ];
        return (
            <TablePage
                tableColumns={exp_columns}
                data={expData[record.id] ? expData[record.id] : []}
                bordered={true}
            />
        );
    };

    return (
        <TablePage
            url='table/getList'
            tableColumns={columns}
            buttons={buttons}
            querys={querys}
            data={data}
            loading={loading}
            rowKey='id'
            expandable={{ expandedRowRender, onExpand, expandRowByClick: true }}
        />
    );
};

export default connect(({ table, loading }) => ({
    data: table.data,
    loading: loading.effects['table/getList'],
}))(TableColumn);
