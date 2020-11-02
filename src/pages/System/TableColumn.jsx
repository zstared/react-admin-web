import React from 'react';
import { Input, Button } from 'antd';
import { TablePage, QueryItem } from '../../components/PageTableNew';

const TableColumn = () => {
    const buttons = <Button type='primary'>导出</Button>;

    const columns=[
        { title: '表格名称', dataIndex: 'table_name', key: 'table_name', width: 150, fixed: 'left' },
        { title: '表格编码', dataIndex: 'table_code', key: 'table_code', width: 150, fixed: 'left' },
    ]

    return (
        <TablePage  tableColumns={columns} buttons={buttons}>
            <QueryItem label='名称' name='name'>
                <Input placeholder='请输入'></Input>
            </QueryItem>
            <QueryItem label='名称' name='name'>
                <Input placeholder='请输入'></Input>
            </QueryItem>
            <QueryItem label='名称' name='name'>
                <Input placeholder='请输入'></Input>
            </QueryItem>
        </TablePage>
    );
};

export default TableColumn;
