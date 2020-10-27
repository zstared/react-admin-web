import React,{useState,useEffect,useRef,useContext} from 'react';
import { Table, Badge, Menu, Dropdown, Icon, Card, Form, Input, DatePicker, Button, Row, Col } from 'antd';
import styled from 'styled-components'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
import Mock from 'mockjs';

const EditableContext = React.createContext();

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

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef();
    const form = useContext(EditableContext);
    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async (e) => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            //handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title} is required.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{
                        paddingRight: 24,
                    }}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }

    return <td {...restProps}>{childNode}</td>;
};
const Order = () => {


    const expandedRowRender = () => {

        const expandedRowRender2 = () => {
            const columns = [
                { title: '物料类型', dataIndex: 'FMaterialType', key: 'FMaterialType', width: 150 },
                { title: '物料名称', dataIndex: 'FMaterialName', key: 'FMaterialName', width: 150 },
                { title: '物料代码', dataIndex: 'FMaterialNo', key: 'FMaterialNo', width: 150 },
                { title: '规格型号', dataIndex: 'FMaterialModel', key: 'FMaterialModel', width: 150 },
                { title: '需求释放日期', dataIndex: 'FReqreleasedate', key: 'FReqreleasedate', width: 150 },
                { title: '价格是否确认', dataIndex: 'FPriceIsconfirm', key: 'FPriceIsconfirm', width: 150 },
                { title: '采购下单日期', dataIndex: 'FPruchDate', key: 'FPruchDate', width: 150 },
                { title: '采购单号', dataIndex: 'FPruchNo', key: 'FPruchNo', width: 150 },
                { title: '采购员', dataIndex: 'Fprucher', key: 'Fprucher', width: 150 },
                { title: '下单供应商', dataIndex: 'FPruchSupply', key: 'FPruchSupply', width: 150 },
                { title: '需求数量', dataIndex: 'FPruchQty', key: 'FPruchQty', width: 150 },
                { title: '计划交货日期', dataIndex: 'FPlandeliverydate', key: 'FPlandeliverydate', width: 150 },
                { title: '是否发送', dataIndex: 'FIsSend', key: 'FIsSend', width: 150 },
                { title: '确认交货日期', dataIndex: 'FConfirmdeliverydate', key: 'FConfirmdeliverydate', width: 150 },
                { title: '告警状态', dataIndex: 'FAlarmstatus', key: 'FAlarmstatus', width: 150 },
                { title: '处理说明', dataIndex: 'Finstructions', key: 'Finstructions', width: 150 },
                { title: '预约送货日期', dataIndex: 'Fdeliverydate', key: 'Fdeliverydate', width: 150 },
                { title: '最后入库日期', dataIndex: 'FLastInstockdate', key: 'FLastInstockdate', width: 150 },
                { title: '入库数量', dataIndex: 'FInStockQty', key: 'FInStockQty', width: 150 },
                { title: '入库仓库', dataIndex: 'FInStock', key: 'FInStock', width: 150 },
                { title: '入库仓位', dataIndex: 'FInStockPlace', key: 'FInStockPlace', width: 150 },
                { title: '库存数量', dataIndex: 'FStockQty', key: 'FStockQty', width: 150 },
                { title: '库存批次', dataIndex: 'FStockBatchNo', key: 'FStockBatchNo', width: 150 },
                { title: '仓管员', dataIndex: 'Fstorekeeper', key: 'Fstorekeeper', width: 150 },
                { title: '质检员', dataIndex: 'FQualitytor', key: 'FQualitytor', width: 150 },
                { title: '是否关键物料', dataIndex: 'FIsKeyMaterial', key: 'FIsKeyMaterial', width: 150 },
                { title: '剩余交期', dataIndex: 'FRemadeliverydate', key: 'FRemadeliverydate', width: 150 },
                { title: '累计延期', dataIndex: 'FCumulativedelay', key: 'FCumulativedelay', width: 150 },
                { title: '延期罚款', dataIndex: 'FDelayfine', key: 'FDelayfine', width: 150 },
                { title: '罚款是否落实', dataIndex: 'FIsDelayfine', key: 'FIsDelayfine', width: 150 },
            ]

            const data = [];
            for (let i = 0; i < 8; ++i) {
                data.push(Mock.mock({
                    key: i,
                    FMaterialType: '@string("upper", 10)',
                    FMaterialName: '@string("upper", 10)',
                    FMaterialNo: '@string("number", 10)',
                    FMaterialModel: '@string("upper", 10)',
                    FReqreleasedate: "@date",
                    FPriceIsconfirm:'@string("upper", 1)',
                    FPruchDate: "@date",
                    FPruchNo:'@string("upper", 10)',
                    Fprucher:'@cname',
                    FPruchSupply:'@string("upper", 10)',
                    FPruchQty: '@integer(60,200)',
                    FPlandeliverydate: "@date",
                    FIsSend:'@string("upper", 1)',
                    FConfirmdeliverydate: "@date",
                    FAlarmstatus:'@string("upper", 10)',
                    Finstructions:'@string("upper", 10)',
                    Fdeliverydate: "@date",
                    FLastInstockdate: "@date",
                    FInStockQty: '@integer(60,200)',
                    FInStock:'@string("upper", 4)',
                    FInStockPlace:'@string("upper", 10)',
                    FStockQty: '@integer(60,200)',
                    FStockBatchNo:'@string("upper", 10)',
                    Fstorekeeper:'@cname',
                    FQualitytor:'@cname',
                    FIsKeyMaterial:'@string("upper", 10)',
                    FRemadeliverydate: "@date",
                    FCumulativedelay: "@date",
                    FDelayfine: "@date",
                    FIsDelayfine:'@string("upper", 2)',


                }));
            }
            return <Table title={() => {
                return (
                    <Row>
                        <Col span={12}>采购申请单-采购订单</Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Button icon={<DownloadOutlined />} type="primary" size="small">导出</Button>
                        </Col>
                    </Row>
                )
            }}
                size="small"
                columns={columns}
                dataSource={data}
                scroll={{ x:'max-content'}}
                 
                pagination={{
                    pageSize: 15,
                }} />;
        }
 
        const columns = [
            { title: '销售订单号', dataIndex: 'FOrderNo', key: 'FOrderNo', width: 150 },
            { title: '生产任务单号', dataIndex: 'FICMONo', key: 'FICMONo', width: 150 },
            {
                title: '计划状态',
                dataIndex: 'FPlanStatus',
                key: 'FPlanStatus',
                width: 150,
                render: (text) => {
                    if (text == "待生产") {
                        return <>< Badge status='default' /> {text}</>
                    } else if (text == "生产中") {
                        return <> < Badge status='processing' />{text}</>
                    } else {
                        return <>< Badge status='success' />{text}</>
                    }
                }
            },
            { title: '产品代码', dataIndex: 'FMaterialNo', key: 'FMaterialNo', width: 150 },
            { title: '产品名称', dataIndex: 'FMaterialName', key: 'FMaterialName', width: 150 },
            { title: '规格型号', dataIndex: 'FMaterialModel', key: 'FMaterialModel', width: 150 },
            { title: '排产周期', dataIndex: 'FScheduleCycle', key: 'FScheduleCycle', width: 150 },
            { title: '排产状态', dataIndex: 'FScheduleStatus', key: 'FScheduleStatus', width: 150 },
            { title: '计划生产数量', dataIndex: 'FPlanProQty', key: 'FPlanProQty', width: 150 },
            { title: '计划生产柜数', dataIndex: 'FPlanProCabinets', key: 'FPlanProCabinets', width: 150 },
            { title: '计划完工日期', dataIndex: 'FPlanFinishDate', key: 'FPlanFinishDate', width: 150 },
            { title: '计划配料日期', dataIndex: 'FPlancompleteDate', key: 'FPlancompleteDate', width: 150 },

            { title: '标准所需工时', dataIndex: 'Fstandardhours', key: 'Fstandardhours', width: 150 },
            { title: '实际投入工时', dataIndex: 'Factualworkinghours', key: 'Factualworkinghours', width: 150 },
            { title: '齐套状态', dataIndex: 'FMaterialcompleteType', key: 'FMaterialcompleteType', width: 150 },
            { title: '配料状态', dataIndex: 'FIngreStatus', key: 'FIngreStatus', width: 150 },
            { title: '生产状态', dataIndex: 'FProStatus', key: 'FProStatus', width: 150 },
            { title: '车间主任', dataIndex: 'FWorkshopdirector', key: 'FWorkshopdirector', width: 150 },
            { title: '生产班组', dataIndex: 'FProteam', key: 'FProteam', width: 150 },
            { title: '外协单位', dataIndex: 'FOutsourcingunit', key: 'FOutsourcingunit', width: 150 },
            { title: '生产进度', dataIndex: 'FProschedule', key: 'FProschedule', width: 150 },
            { title: '派工日期', dataIndex: 'Fdispatchdate', key: 'Fdispatchdate', width: 150 },
            { title: '配料日期', dataIndex: 'FcompleteDate', key: 'FcompleteDate', width: 150 },
            { title: '汇报日期', dataIndex: 'FReportingdate', key: 'FReportingdate', width: 150 },
            { title: '完工数量', dataIndex: 'FcompleteQty', key: 'FcompleteQty', width: 150 },
            { title: '合格数量', dataIndex: 'FQualifiedQty', key: 'FQualifiedQty', width: 150 },
            { title: '入库数量', dataIndex: 'FInstockQty', key: 'FInstockQty', width: 150 },
            { title: '入库柜数', dataIndex: 'FInCabinetsQty', key: 'FInCabinetsQty', width: 150 },
            { title: '入库日期', dataIndex: 'FInstockDate', key: 'FInstockDate', width: 150 },
        ];

        const data = [];
        for (let i = 0; i < 8; ++i) {
            data.push(Mock.mock({
                key: i,
                FOrderNo: '@string("number", 10)',
                FICMONo: '@string("number", 8)',
                'FPlanStatus|1': ['待生产', '生产中', '已完成'],
                FMaterialNo: '@string("upper", 6, 6)',
                FMaterialName: '@ctitle',
                FMaterialModel: '@string("upper", 4, 8)',
                FScheduleCycle: '@string("upper", 6, 6)',
                'FScheduleStatus|1': ['待生产', '生产中', '已完成'],
                FPlanProQty: '@integer(60,200)',
                FPlanProCabinets: '@integer(60,200)',
                FPlanFinishDate: "@date",
                FPlancompleteDate: "@date",
                Fstandardhours: '@integer(60,200)',
                Factualworkinghours: '@integer(60,200)',
                FMaterialcompleteType: '@integer(60,200)',
                'FIngreStatus|1': ['待生产', '生产中', '已完成'],
                'FProStatus|1': ['待生产', '生产中', '已完成'],
                FWorkshopdirector: "@cname",
                'FProteam|1': ['A', 'B', 'C', 'D'],
                FOutsourcingunit: '@ctitle',
                FProschedule: '@integer(0,100)',
                Fdispatchdate: "@date",
                FcompleteDate: "@date",
                FReportingdate: "@date",
                FcompleteQty: '@integer(60,200)',
                FQualifiedQty: '@integer(60,200)',
                FInstockQty: '@integer(60,200)',
                FInCabinetsQty: '@integer(60,200)',
                FInstockDate: "@date",

            }));
        }
        return <Table title={(sortOrder, sortColumn, filters) => {
            return (
                <Row>
                    <Col span={12}>任务单</Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button icon={<DownloadOutlined />} type="primary" size="small">导出</Button>
                    </Col>
                </Row>
            )
        }}
            size="small"
            columns={columns}
            dataSource={data}
            expandedRowRender={expandedRowRender2}
            scroll={{ x: 'max-content' }}
            pagination={{
                pageSize: 15,
            }} />;
    };
    const components = {
        body: {
            row:EditableRow,
            cell: EditableCell,
        },
    };
    let columns = [
        { title: '销售订单号', dataIndex: 'FOrderNo', key: 'FOrderNo', width: 150, fixed: 'left' },
        {
            title: '订单状态', dataIndex: 'FOrderStatus', key: 'FOrderStatus', width: 150, fixed: 'left',
            render: (text) => {
                if (text == "待生产") {
                    return <>< Badge status='default' /> {text}</>
                } else if (text == "生产中") {
                    return <> < Badge status='processing' />{text}</>
                } else {
                    return <>< Badge status='success' />{text}</>
                }
            }

        },
        { title: '产品代码', dataIndex: 'FMaterialNo', key: 'FMaterialNo', width: 150, fixed: 'left' },
        { title: '产品名称', dataIndex: 'FMaterialName', key: 'FMaterialName', width: 150 },
        { title: '规格型号', dataIndex: 'FMaterialModel', key: 'FMaterialModel', width: 150 },
        { title: '产品类型', dataIndex: 'FProductType', key: 'FProductType', width: 150 },
        { title: '订单数量', dataIndex: 'FOrderQty', key: 'FOrderQty', width: 150 },

        { title: '订单柜数', dataIndex: 'FCabinetsQty', key: 'FCabinetsQty', width: 150 },
        { title: '是否冲销', dataIndex: 'FIsReverse', key: 'FIsReverse', width: 150,editable: true,},
        { title: '冲销数量', dataIndex: 'FReverseQty', key: 'FReverseQty', width: 150,editable: true, },
        { title: '下单日期', dataIndex: 'FOrderDate', key: 'FOrderDate', width: 150 },
        { title: '客户代码', dataIndex: 'FCustNo', key: 'FCustNo', width: 150 },
        { title: '业务员', dataIndex: 'FEmpName', key: 'FEmpName', width: 150 },
        { title: '订单交期', dataIndex: 'FAdviceDate', key: 'FAdviceDate', width: 150 },
        { title: '装柜类型', dataIndex: 'FCabinetsType', key: 'FCabinetsType', width: 150 },

        { title: '是否试产', dataIndex: 'Fistrialproduce', key: 'Fistrialproduce', width: 150 },
        { title: '订单备注', dataIndex: 'FOrderNote', key: 'FOrderNote', width: 150 },
        { title: '验货日期', dataIndex: 'Finspectiondate', key: 'Finspectiondate', width: 150 },
        { title: '装柜日期', dataIndex: 'FCabinetsDate', key: 'FCabinetsDate', width: 150 },
        { title: '唛头下推日期', dataIndex: 'FShippingMarksDate', key: 'FShippingMarksDate', width: 150 },
        { title: '物料齐套日期', dataIndex: 'FMaterialcompleteDate', key: 'FMaterialcompleteDate', width: 150 },
        { title: '标准所需工时', dataIndex: 'Fstandardhours', key: 'Fstandardhours', width: 150 },
        { title: '产品入库日期', dataIndex: 'FInStockDate', key: 'FInStockDate', width: 150 },
        { title: '产品入库数量', dataIndex: 'FInStockQty', key: 'FInStockQty', width: 150 },
        { title: '产品出库日期', dataIndex: 'FOutStockDate', key: 'FOutStockDate', width: 150 },
        { title: '产品出库数量', dataIndex: 'FOutStockQty', key: 'FOutStockQty', width: 150 },
    ];
    columns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                //handleSave: ()=>{},
            }),
        };
    });
    const data = [];
    for (let i = 0; i < 150; ++i) {
        data.push(Mock.mock({
            key: i,
            FOrderNo: '@string("number", 10)',
            'FOrderStatus|1': ['待生产', '生产中', '已完成'],
            FMaterialNo: '@string("upper", 6, 6)',
            FMaterialName: '@ctitle',
            FMaterialModel: '@string("upper", 4, 8)',
            FProductType: '@string("upper", 6, 6)',
            FOrderQty: '@integer(60,200)',
            FCabinetsQty: '@integer(60,200)',
            'FIsReverse|1': ['是', '否'],
            FReverseQty: '@integer(60,200)',
            FOrderDate: "@datetime",
            FCustNo: "@name",
            FEmpName: "@cname",
            FAdviceDate: "@datetime",
            FCabinetsType: '@string("upper", 4, 8)',
            'Fistrialproduce|1': ['是', '否'],
            FOrderNote: "@cparagraph(1,4)",
            Finspectiondate: "@datetime",
            FCabinetsDate: "@datetime",
            FShippingMarksDate: "@datetime",
            FMaterialcompleteDate: "@datetime",
            Fstandardhours: '@integer(2,48)',
            FInStockDate: "@datetime",
            FInStockQty: '@integer(60,200)',
            FOutStockDate: "@datetime",
            FOutStockQty: '@integer(60,200)',
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
                            <Form.Item label="交货日期">
                                <DatePicker />
                            </Form.Item>
                            <Button icon={<SearchOutlined />} type="primary">查询</Button>
                        </Form>

                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <Button icon={<DownloadOutlined />} type="primary">导出</Button>
                    </Col>
                </Row>

            </div>
            <div className="table">
                <Table
                                 components={components}
                    size="small"
                    columns={columns}
                    expandedRowRender={expandedRowRender}
                    dataSource={data}
                    scroll={{ x: 'max-content' }}
                    sticky
                    pagination={{
                        defaultPageSize: 20,
                        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
                    }}
                    onRow={record => {
                        return {
                            onClick: event => {

                            }, // 点击行
                        };
                    }}
                />
            </div>
        </Wrapper>
    );
};

export default Order;
