import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { formatMessage, FormattedMessage } from 'umi/locale'
import { Tree, Modal } from 'antd'
import { connect } from 'dva'
const TreeNode = Tree.TreeNode
import styles from './index.less'

@connect(({ oauth, loading }) => ({
    resourceTreeData: oauth.resourceTreeData,
    defaultExpandedKeys: oauth.defaultExpandedKeys,
    loading: loading.effects['oauth/treePermissionList']
}))
class Permission extends PureComponent {

    state = {
        expandedKeys: [],
        checkedKeys: [],
        disabledKeys: [],
        autoExpandParent: true,
    }

    componentDidMount() {
        const { dispatch, triggerRef } = this.props;
        triggerRef(this)
        dispatch({
            type: 'oauth/treePermissionList',
            callback: () => {
                const { defaultExpandedKeys } = this.props;
                this.setState({
                    expandedKeys: defaultExpandedKeys
                })
            }
        })
    }
    onExpand = (expandedKeys) => {
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }

    onCheck = (checkedKeys) => {
        this.setState({ checkedKeys });
    }

    setCheckedKeys(checkedKeys, disabledKeys = []) {
        this.setState({
            checkedKeys,
            disabledKeys
        })
    }

    /**保存 */
    handleOk = () => {
        const { handleSave } = this.props;
        const checkedKeys = this.state.checkedKeys;
        let keys = checkedKeys;
        if (this.state.disabledKeys.length > 0) {
            keys = checkedKeys.filter(key => {
                return !this.state.disabledKeys.some(item => item == key)
            })
        }
        handleSave(keys)
    }

    
    /**
     * 渲染子菜单
     */
    renderTreeNodes = data => {
        const { disabledKeys } = this.state;
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode
                        disabled={disabledKeys.some(key => item.key == key) ? true : false}
                        className={item.resource_type == 2 ? styles.horizontalTreeNode : null}
                        title={item.title}
                        key={item.key}
                        dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode className={item.resource_type == 2 ? styles.horizontalTreeNode : null} {...item} />;
        })
    }


    render() {
        const { handleModalVisible, modalVisible, resourceTreeData } = this.props;
        return (
            <Modal
                width="80%"
                destroyOnClose
                title={<span><FontAwesomeIcon icon="user-shield"></FontAwesomeIcon> <FormattedMessage id="label.permissions" /></span>}
                visible={modalVisible}
                onOk={this.handleOk}
                onCancel={handleModalVisible}
            >
                <Tree
                    checkable
                    onExpand={this.onExpand}
                    expandedKeys={this.state.expandedKeys}
                    onCheck={this.onCheck}
                    checkedKeys={this.state.checkedKeys}
                    autoExpandParent={this.state.autoExpandParent}
                >
                    {this.renderTreeNodes(resourceTreeData)}
                </Tree>
            </Modal>
        )
    }
}

export default Permission;