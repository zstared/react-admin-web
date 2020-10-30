import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { TableCode } from '../../utils/emun';
import { getColumns } from '../../services/table';

interface TablePageProps {
    tableCode: string;
    columns: [];
}

const TablePage: React.FC<TablePageProps> = (props) => {
    const [loading, setLoading] = useState(true);
	const [columns, setColumns] = useState([]);
	const [data,setData]=useState([])

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

    useEffect(() => {
        const init = async () => {
            await initTable();
        };
        init();
    }, []);

    return <Table loading={loading} columns={columns} scroll={{x:'max-content'}} ></Table>;
};
export default TablePage;
