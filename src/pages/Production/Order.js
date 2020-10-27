import React from 'react';
import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import Mock from 'mockjs';

const Order = () => {
    const menu = (
        <Menu>
            <Menu.Item>Action 1</Menu.Item>
            <Menu.Item>Action 2</Menu.Item>
        </Menu>
    );

    const expandedRowRender = () => {
        const columns = [
            { title: 'Date', dataIndex: 'date', key: 'date' },
            { title: 'Name', dataIndex: 'name', key: 'name' },
            {
                title: 'Status',
                key: 'state',
                render: () => (
                    <span>
                        <Badge status='success' />
                        Finished
                    </span>
                ),
            },
            {
                title: 'Upgrade Status',
                dataIndex: 'upgradeNum',
                key: 'upgradeNum',
            },
            {
                title: 'Action',
                dataIndex: 'operation',
                key: 'operation',
                render: () => (
                    <span className='table-operation'>
                        <a>Pause</a>
                        <a>Stop</a>
                        <Dropdown overlay={menu}>
                            <a>
                                More <Icon type='down' />
                            </a>
                        </Dropdown>
                    </span>
                ),
            },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i,
                date: '2014-12-24 23:12:00',
                name: 'This is production name',
                upgradeNum: 'Upgraded: 56',
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    

    const columns = [
        { title: '销售订单号', dataIndex: 'FOrderNo', key: 'FOrderNo' },
        { title: '订单状态', dataIndex: 'FOrderStatus', key: 'FOrderStatus' },
        { title: '产品代码', dataIndex: 'FMaterialNo', key: 'FMaterialNo' },
        { title: '产品名称', dataIndex: 'FMaterialName', key: 'FMaterialName' },
        { title: '规格型号', dataIndex: 'FProductType', key: 'FProductType' },
        { title: '产品类型', dataIndex: 'createdAt', key: 'createdAt' },
        { title: '订单数量', key: 'FOrderQty', key:'FOrderQty' },

        { title: '订单柜数', key: 'FCabinetsQty', key:'FCabinetsQty' },
        { title: '是否冲销', key: 'FIsReverse', key:'FIsReverse' },
        { title: '冲销数量', key: 'FReverseQty', key:'FReverseQty' },
        { title: '下单日期', key: 'FOrderDate', key:'FOrderDate' },
        { title: '客户代码', key: 'FCustNo', key:'FCustNo' },
        { title: '业务员', key: 'FEmpName', key:'FEmpName' },
        { title: '订单交期', key: 'FAdviceDate', key:'FAdviceDate' },
        { title: '装柜类型', key: 'FCabinetsType', key:'FCabinetsType' },
        
        { title: '是否试产', key: 'Fistrialproduce', key:'Fistrialproduce' },
        { title: '订单备注', key: 'FOrderNote', key:'FOrderNote' },
        { title: '验货日期', key: 'Finspectiondate', key:'Finspectiondate' },
        { title: '装柜日期', key: 'FCabinetsDate', key:'FCabinetsDate' },
        { title: '唛头下推日期', key: 'FCabinetsDate', key:'FCabinetsDate' },
        { title: '物料齐套日期', key: 'FMaterialcompleteDate', key:'FMaterialcompleteDate' },
        { title: '标准所需工时', key: 'Fstandardhours', key:'Fstandardhours' },
        { title: '产品入库日期', key: 'FInStockDate', key:'FInStockDate' },
        { title: '产品入库数量', key: 'FInStockQty', key:'FInStockQty' },
        { title: '产品出库日期', key: 'FOutStockDate', key:'FOutStockDate' },
        { title: '产品出库数量', key: 'FOutStockQty', key:'FOutStockQty' },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i,
            name: 'Screem',
            platform: 'iOS',
            version: '10.3.4.5654',
            upgradeNum: 500,
            creator: 'Jack',
            createdAt: '2014-12-24 23:12:00',
        });
        Mock.mock({
            FOrderNo:'@string("number", 10)',
            'FOrderStatus|1':['待生产','生产中','已完成'],
            FMaterialNo:'@string("upper", 6, 6)',
            FMaterialName:'',
            FProductType:'',
            createdAt:'',
            FOrderQty:'',
        })
    }

    return (
        <Table
            columns={columns}
            expandedRowRender={expandedRowRender}
            dataSource={data}
        />
    );
};

export default Order;
