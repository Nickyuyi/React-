import React from 'react'
import {Card, Table, Button, Form, Modal, Select, Input, Tree, Transfer} from 'antd'
import Utils from '../../utils'
import axios from 'axios'
import menuInfo from '../../config/menuConfig'
const Fragment = React.Fragment
const FormItem = Form.Item
const Option = Select.Option
const TreeNode = Tree.TreeNode

export default class Permit extends React.Component {
  state = {
    dataList: []
  }

  componentWillMount() {
    this.getDataList()
  }

  columns = [
    {title: '角色ID', dataIndex: 'id'},
    {title: '角色名称', dataIndex: 'role_name'},
    {title: '创建时间', dataIndex: 'create_time', render: (text) => {
      return Utils.formateDate(text)
    }},
    {title: '使用状态', dataIndex: 'status', render: (text) => {
      return text === 0 ? '启用' : '停用'
    }},
    {title: '授权时间', dataIndex: 'authorize_time', render: (text) => {
      return Utils.formateDate(text)
    }},
    {title: '授权人', dataIndex: 'authorize_user_name'},
  ]

  // 获取数据列表
  getDataList = () => {
    const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/role/list'
    axios.get(url).then(res => {
      let data = res.data.result
      // 给 item_list 每一项添加一个key
      data.item_list.map(item => item.key = item.id)
      this.setState({
        dataList: data.item_list,
        pagination: Utils.setPagination(data, (page) => {
          // 点击 页码的回调
          this.getDataList()
        })
      })
    })
  }
  // 点击 数据 行
  clickRow = (record) => {
    this.setState({
      selectedRowKeys: [record.id],
      record
    })
  }
  // 取消 创建角色
  cancelCreateRole = () => {
    this.setState({
      isRoleVisible: false
    })
    // 重置 表单项
    this.createRoleform.props.form.resetFields()
  }
  // 提交 创建角色  获取表单信息，发送ajax请求
  submitCreateRole = () => {
    console.log(this.createRoleform.props.form.getFieldsValue())
  }
  // 点击 设置权限
  setPermit = () => {
    if (!this.state.record) {
      return Modal.info({
        title: '提示',
        content: '请选择一个角色'
      })
    }
    this.setState({
      isPermitVisible: true
    })
  }
  // 提交 设置权限  获取表单 数据，和权限tree的选中数据，发送ajax请求
  submitSetPermit = () => {
    console.log(this.setPermitform.props.form.getFieldsValue(),'tree:'+this.state.checkedTreeKeys)
  }
  // 获取 子组件 中tree 的选中项  传递给SetPermitform子组件调用
  getCheckedKeys = (keys) => {
    this.setState({
      checkedTreeKeys: keys
    })
  }

  render() {
    return (
      <Fragment>
        <Card
          title={
            <Fragment>
              <Button type="primary" onClick={() => this.setState({isRoleVisible: true})}>创建角色</Button>
              <Button type="primary" onClick={this.setPermit}>设置权限</Button>
              <Button type="primary">用户授权</Button>
            </Fragment>
          } 
          className="card-wrapper"
        >
          <Table
            bordered
            columns={this.columns}
            dataSource={this.state.dataList}
            pagination={this.state.pagination}
            rowSelection={{type: 'radio', selectedRowKeys: this.state.selectedRowKeys}}
            onRow={(record) => {
              return {onClick: () => this.clickRow(record)}
            }}
          />
        </Card>
        <Modal 
          title="创建角色"
          visible={this.state.isRoleVisible}
          onCancel={this.cancelCreateRole}
          onOk={this.submitCreateRole}
        >
          <CreateRoleForm wrappedComponentRef={(form) => this.createRoleform = form}/>
        </Modal>
        <Modal
          width={600}
          title="设置权限"
          visible={this.state.isPermitVisible}
          onCancel={() => this.setState({isPermitVisible: false})}
          onOk={this.submitSetPermit}
        >
          <SetPermitForm 
            wrappedComponentRef={(form) => this.setPermitform = form} 
            record={this.state.record} 
            getCheckedKeys={this.getCheckedKeys}
            menuInfo={menuInfo}
          />
          <TransferDemo/>
        </Modal>
      </Fragment>
    )
  }
}

class CreateRoleForm extends React.Component {
  formItemLayout = {
    labelCol: {
      xs: 24,
      sm: 5
    },
    wrapperCol: {
      xs: 24,
      sm: 16
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <FormItem label="角色名称" {...this.formItemLayout}>
          {
            getFieldDecorator('role_name')(
              <Input placeholder="请输入角色名称"/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...this.formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: 0
            })(
              <Select>
                <Option value={0}>开启</Option>
                <Option value={1}>关闭</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
CreateRoleForm = Form.create()(CreateRoleForm)

class SetPermitForm extends React.Component {
  state = {
    checkedKeys: this.props.record.menus
  }

  formItemLayout = {
    labelCol: {
      xs: 24,
      sm: 5
    },
    wrapperCol: {
      xs: 24,
      sm: 16
    }
  }

  renderTreeNode = data => data.map(item => {
    if (item.children || item.btnList) {
      return (
        <TreeNode title={item.title} key={item.key}>
          {this.renderTreeNode(item.children || item.btnList)}
        </TreeNode>
      )
    }
    return <TreeNode title={item.title} key={item.key}/>
  })

  onCheck = (checkedKeys) => {
    this.setState({
      checkedKeys
    })
    // 调用 父组件方法
    this.props.getCheckedKeys(checkedKeys)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    const {record} = this.props
    const {menuInfo} = this.props
    return (
      <Form>
        <FormItem label="角色名称" {...this.formItemLayout}>
          {
            getFieldDecorator('role_name', {
              initialValue: record.role_name
            })(
              <Input disabled/>
            )
          }
        </FormItem>
        <FormItem label="状态" {...this.formItemLayout}>
          {
            getFieldDecorator('status', {
              initialValue: record.status
            })(
              <Select>
                <Option value={0}>启用</Option>
                <Option value={1}>停用</Option>
              </Select>
            )
          }
        </FormItem>
        <Tree
          defaultExpandAll
          checkable
          checkedKeys={this.state.checkedKeys}
          onCheck={this.onCheck}
        >
          {this.renderTreeNode(menuInfo)}
        </Tree>
      </Form>
    )
  }
}
SetPermitForm = Form.create()(SetPermitForm)

class TransferDemo extends React.Component {
  state = {
    targetKeys : [1,2,3]
  }

  mockData = [
    {key:1, title:"张三"},
    {key:2, title:"张三2"},
    {key:3, title:"张三3"},
    {key:4, title:"张三4"},
    {key:5, title:"张三5"},
  ]


  handleChange = (targetKeys, direction, moveKeys) => {
    this.setState({targetKeys})
    console.log('targetKeys:'+targetKeys, 'moveKeys:'+moveKeys)
  }

  render() {
    return (
      <Transfer
        // 数据源，其中的数据会被渲染到 左边栏，targetKeys中指定的除外
        dataSource={this.mockData}
        showSearch
        // 显示在右侧框数据的key集合 
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        // 每行数据渲染函数
        render={item => item.title}
      />
    )
  }
}