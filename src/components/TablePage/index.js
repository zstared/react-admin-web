import React, { PureComponent } from 'react'
import { Table, Form, Col, Row, Button, Icon } from 'antd'
import { connect } from 'dva';
import styles from './index.less'
const FormItem = Form.Item;


class TablePage extends PureComponent {
    // static QueryItem = Col;
    state = {
        expand: false,
    }
    
    /**触发是否展开更多查询项 */
    handleExpand = () => {
        this.setState({
            'expand': !this.state.expand
        })
    }

    /**获取查询项 */
    getQueryItem = () => {
        const { children } = this.props;
        const queryItem = {
            base: [],
            more: []
        }
        if (queryItem) {
            React.Children.map(children, (child, index) => {
                const { label, locale, children } = child.props;
                if (index < 2) {
                    queryItem.base.push((
                        <Col key={index} span={6}>
                            <FormItem label={label}>
                                {children}
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
    
    /**查询 */
    search = (params) => {
        const { dispatch, url } = this.props;
        dispatch({
            type: url,
            payload: params || {}
        })
    }

    /**触发查询事件 */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.search(values)
            }
        });
    }

    componentDidMount() {
        const { dispatch, url } = this.props;
        dispatch({
            type: url,
            payload: {}
        })
    }

    render() {
        const rowGutterLayout = {
            xl: 24,
            lg: 16,
            md: 8,
        }
        const { data, columns, buttons } = this.props;
        const queryItem = this.getQueryItem();
        return (
            <div className={styles.pageWrapper}>
                <Form className={styles.formWrapper} onSubmit={this.handleSubmit}>
                    <Row gutter={{ ...rowGutterLayout }}>
                        {queryItem.base}
                        <Col span={6}>
                            <FormItem>
                                <Button type="primary" htmlType="submit" icon="search" > 查询 </Button>
                                <Button style={{ marginLeft: 8 }}>重置</Button>
                                <a style={{ marginLeft: 8 }} onClick={this.handleExpand}>
                                    {this.state.expand ? (<span>收起 <Icon type="up" /></span>) : (<span>展开 <Icon type="down" /></span>)}
                                </a>
                            </FormItem>
                        </Col>
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
                <Table dataSource={data} columns={columns} ></Table>
            </div>
        )
    }
}


export default connect()(Form.create()(TablePage));