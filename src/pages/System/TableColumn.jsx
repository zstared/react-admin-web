import React from 'react';
import { Input, Button } from 'antd';
import { TablePage, QueryItem } from '../../components/PageTableNew';

const TableColumn = () => {
    const buttons = <Button type='primary'>导出</Button>;

    return (
        <TablePage tableCode='' columns={[]} buttons={buttons}>
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
