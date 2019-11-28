import React, { PureComponent } from 'react'
import { Table, Form, Col, Row, Button, Icon } from 'antd'
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale'
import styles from './index.less'
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
const FormItem = Form.Item;


class TablePage extends PureComponent {
    static QueryItem = Col;

    state = {
        expand: false,
        pagination: { page_index: 1, page_size: 10 },
        sortedInfo: {},
        filteredInfo: {},
        viewVisible:false,
		viewIndex:0,
    }

    /**默认参数 */
    static defaultProps = {
        isTree: false,
        isView:false,
        viewName:'file_info'
    }

    /**触发是否展开更多查询项 */
    handleExpand = () => {
        this.setState({
            'expand': !this.state.expand
        })
    }

    /**获取查询项 */
    getQueryItem = () => {
        const { children, form: { getFieldDecorator } } = this.props;
        const queryItem = {
            base: [],
            more: []
        }
        if (queryItem) {
            React.Children.map(children, (child, index) => {
                const { label, name, children } = child.props;
                if (index < 2) {
                    queryItem.base.push((
                        <Col key={index} span={6}>
                            <FormItem label={label}>
                                {getFieldDecorator(name)(children)}
                            </FormItem>
                        </Col>
                    ))
                } else {
                    queryItem.more.push((
                        <Col key={index} span={6}>
                            <FormItem label={label}>
                                {children}
                            </FormItem>
                        </Col>
                    ))
                }
            })
        }
        return queryItem
    }

    /**触发查询事件 */
    handleSubmit = (e) => {
        e.preventDefault();
        this.handleSearch(true)
    }

    /**查询 */
    handleSearch = (isFirst = false) => {
        const values = this.props.form.getFieldsValue();
        const { sortedInfo, filteredInfo, pagination } = this.state;
        const params = { ...pagination, ...values, ...filteredInfo }
        if (sortedInfo && sortedInfo.order) {
            params.sorter = sortedInfo.field + '|' + (sortedInfo.order === 'ascend' ? 'asc' : 'desc')
        }
        if (isFirst) { params.page_index = 1 }
        const { dispatch, url } = this.props;
        dispatch({
            type: url,
            payload: params || {}
        })
    }

    /**表格数据改变 */
    handleTableChange = (pagination, filters, sorter) => {
        this.setState({
            pagination: { page_index: pagination.current, page_size: pagination.pageSize },
            filteredInfo: filters,
            sortedInfo: sorter
        }, () => {
            this.handleSearch();
            this.props.onChange(sorter, filters)
        });
    }

    /**重置 */
    handleReset = () => {
        this.props.form.resetFields();
        this.setState({
            sortedInfo: {},
            filteredInfo: {},
            pagination: { page_index: 1, page_size: 10 },
        }, () => {
            this.handleSearch();
        })
        this.props.onChange({}, {})
    }

    componentDidMount() {
        const {triggerRef}=this.props;
        this.handleSearch();
        if(triggerRef) triggerRef(this);
    }

    handleViews(index){
        this.setState({
            viewVisible:true,
            viewIndex:index
        })
    }

    render() {
        const rowGutterLayout = {
            xl: 24,
            lg: 16,
            md: 8,
        }
        const { data, columns, buttons, rowKey, loading, isTree,isView,viewName } = this.props;
        const queryItem = this.getQueryItem();
        return (
            <div className={styles.pageWrapper}>
                <Form className={styles.formWrapper} onSubmit={this.handleSubmit}>
                    <Row gutter={{ ...rowGutterLayout }}>
                        {queryItem.base}
                        {queryItem.base.length>0?<Col span={6}>
                            <FormItem>
                                <Button type="primary" htmlType="submit" icon="search"><FormattedMessage id="button.search" /></Button>
                                <Button onClick={this.handleReset} style={{ marginLeft: 8 }}><FormattedMessage id="button.reset" /></Button>
                                {queryItem.more.length > 0 ? <a style={{ marginLeft: 8 }} onClick={this.handleExpand}>
                                    {this.state.expand ? (<span><FormattedMessage id="label.collapse" /> <Icon type="up" /></span>) : (<span><FormattedMessage id="label.expand" /> <Icon type="down" /></span>)}
                                </a> : null}
                            </FormItem>
                        </Col>:null}
                        <Col offset={18} style={{ textAlign: "right" }}>
                            <FormItem>
                                {buttons}
                            </FormItem>
                        </Col>
                    </Row>

                    {this.state.expand ? (
                        <Row gutter={{ ...rowGutterLayout }}>
                            {queryItem.more}
                        </Row>) : null}
                </Form>
                 <Table dataSource={isTree ? data : data.rows} columns={columns} rowKey={rowKey}
                    onChange={this.handleTableChange}
                    loading={loading}
                    scroll={{ x: 'max-content' }}
                    pagination={isTree ? false : {
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: total => `${formatMessage({ id: 'pagination.total' })} ${total} ${formatMessage({ id: 'pagination.records' })}`,
                        pageSizeOptions: ['10', '20', '50', '100'],
                        total: data.count,
                        current: data.page_index,
                        pageSize: data.page_size
                    }} >
                </Table>
                {isView?<Viewer
                    images={data.rows?data.rows.map(item=>item[viewName]):[]}
                    onClose={() => { this.setState({ viewVisible: false }) }}
                    activeIndex={this.state.viewIndex}
                    visible={this.state.viewVisible}>
                </Viewer>:null}
            </div>
        )
    }
}


export default connect()(Form.create()(TablePage));