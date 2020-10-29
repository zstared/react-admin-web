import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { TableCode } from '../../utils/emun';
import { columns } from '../../services/table';

interface TablePageProps {
    tableCode: string;
    columns: [];
}

const TablePage: React.FC<TablePageProps> = (props) => {
    const [loading, setLoading] = useState(true);

    //初始表格字段 表格数据
    const initTable = async () => {
        const result = await columns({
            table_code: TableCode.table_sales_order,
        });
        setLoading(false);
    };

    useEffect(() => {
        const init = async () => {
            await initTable();
        };
        init();
    }, []);

    return <Table loading={loading} columns={props.columns}></Table>;
};
export default TablePage;
