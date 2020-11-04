import React, { useState, useEffect } from 'react';
import {
    Input,
    Button,
    Form,
    Popconfirm,
    Divider,
    Modal,
    InputNumber,
    Switch,
    message,
    Tag,
} from 'antd';
import TablePage from '../../components/PageTableNew';
import { connect } from 'umi';
import {
    getTableColumns,
    updateColumn,
    deleteColumn,
    createColumn,
    sortColum,
} from '../../services/table';
import {
    DeleteOutlined,
    EditOutlined,
    PlusCircleOutlined,
    MenuOutlined,
} from '@ant-design/icons';

const TableColumn = ({ data, loading }) => {
    const [expData, setExpData] = useState({});
    const [expLoading, setExpLoading] = useState({});
    const [formEdit] = Form.useForm();
    const [visible, setVisible] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [editRecord, setEditRecord] = useState(null);
    const [createRecord, setCreateRecord] = useState(null);

    const buttons = <Button type='primary'>导出</Button>;
    const columns = [
        {
            title: '表格名称',
            dataIndex: 'table_name',
            key: 'table_name',
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (text, record) => {
                return (
                    <a
                        href='#'
                        onClick={(e) => {
                            handleCreate(e, record);
                        }}>
                        <PlusCircleOutlined /> 新增字段
                    </a>
                );
            },
        },
    ];

    useEffect(() => {
        if (visible) {
        }
    }, [visible]);

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

    //获取表格字段
    const refreshColumns = async (id) => {
        setExpLoading({ ...expLoading, [id]: true });
        const { code, data } = await getTableColumns({
            table_id: id,
        });
        if (code == 0) {
            setExpData({ ...expData, [id]: data });
        }
        setExpLoading({ ...expLoading, [id]: false });
    };

    //展开或收缩
    const onExpand = async (expanded, record) => {
        if (expanded) {
            await refreshColumns(record.id);
        } else {
            setExpLoading({ ...expLoading, [record.id]: false });
            setExpData({ ...expData, [record.id]: [] });
        }
    };

    //新增字段
    const handleCreate = (e, record) => {
        e.stopPropagation();
        formEdit.resetFields();
        setVisible(true);
        setCreateRecord(record);
    };

    //编辑字段
    const handleEdit = (record) => {
        setEditRecord(record);
        setVisible(true);
        formEdit.setFieldsValue({ ...record });
        setCreateRecord(null);
    };

    //保存 新增或编辑
    const handleSave = async () => {
        try {
            await formEdit.validateFields();
            const values = formEdit.getFieldsValue();
            setEditLoading(true);
            if (createRecord) {
                //新增
                const params = { ...values, table_id: createRecord.id };
                const { code } = await createColumn(params);
                if (code == 0) {
                    setVisible(false);
                    message.success('已新增');
                    refreshColumns(params.table_id);
                }
            } else {
                const params = { ...editRecord, ...values };
                const { code } = await updateColumn(params);
                if (code == 0) {
                    setVisible(false);
                    message.success('已保存');
                    refreshColumns(params.table_id);
                }
            }

            setEditLoading(false);
        } catch (e) {
            console.log(e);
        }
    };

    //删除
    const handleDelete = async (record) => {
        const { code } = await deleteColumn(record);
        if (code == 0) {
            message.success('已删除');
            refreshColumns(record.table_id);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    // 拖拽 排序
    const handleDraggabed = async (drag, hover, dragIndex, hoverIndex) => {
        const params = {
            drag_id: drag.id,
            hover_id: hover.id,
            drag_no: drag.sort,
            hover_no: hover.sort,
        };
        const { code } = await sortColum(params);
        if (code == 0) {
			refreshColumns(drag.table_id);
            message.success('已保存');
        }
    };

    const expandedRowRender = (record, index, indent, expanded) => {
        const exp_columns = [
            { title: '字段名称', dataIndex: 'title', key: 'title' },
            { title: '字段编码', dataIndex: 'data_index', key: 'data_index' },
            { title: '宽度', dataIndex: 'width', key: 'width' },
            {
                title: '是否固定',
                dataIndex: 'fixed',
                key: 'fixed',
                render: (text, record) => {
                    if (text == 1) {
                        return <Tag color='blue'>固定</Tag>;
                    } else {
                        return '否';
                    }
                },
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (
                        <span>
                            <a href='#' onClick={() => handleEdit(record)}>
                                <EditOutlined /> 编辑
                            </a>
                            <Divider type='vertical' />
                            <Popconfirm
                                title='确定删除吗?'
                                onConfirm={() => handleDelete(record)}>
                                <a href='#'>
                                    <DeleteOutlined /> 删除
                                </a>
                            </Popconfirm>
                        </span>
                    );
                },
            },
        ];
        return (
            <TablePage
                loading={expLoading[record.id]}
                tableColumns={exp_columns}
                data={expData[record.id] ? expData[record.id] : []}
                bordered={true}
                draggabled={true}
                onDraggabed={handleDraggabed}
            />
        );
    };

    return (
        <React.Fragment>
            <Modal
                title='编辑字段'
                visible={visible}
                onOk={handleSave}
                confirmLoading={editLoading}
                onCancel={handleCancel}
                forceRender>
                <Form
                    form={formEdit}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 14 }}>
                    <Form.Item
                        label='字段名称'
                        name='title'
                        rules={[
                            { required: true, message: '请输入字段名称!' },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='字段编码'
                        name='data_index'
                        rules={[
                            { required: true, message: '请输入字段编码!' },
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label='宽度:'
                        name='width'
                        rules={[{ required: true, message: '请输入宽度!' }]}>
                        <InputNumber min={0} step={5} max={500} />
                    </Form.Item>
                    <Form.Item
                        label='是否固定:'
                        name='fixed'
                        valuePropName='checked'>
                        <Switch checkedChildren='固定' unCheckedChildren='否' />
                    </Form.Item>
                </Form>
            </Modal>
            <TablePage
                url='table/getList'
                tableColumns={columns}
                buttons={buttons}
                querys={querys}
                data={data}
                loading={loading}
                rowKey='id'
                expandable={{
                    expandedRowRender,
                    onExpand,
                    expandRowByClick: true,
                }}
            />
        </React.Fragment>
    );
};

export default connect(({ table, loading }) => ({
    data: table.data,
    loading: loading.effects['table/getList'],
}))(TableColumn);
