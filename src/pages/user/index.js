import React from 'react'
import {Card, Button, Table, Form, Modal, message, Select, Radio, DatePicker, Input} from 'antd'
import moment from 'moment'
import axios from 'axios'
import Utils from '../../utils'
const Fragment = React.Fragment
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const TextArea = Input.TextArea

export default class User extends React.Component {
  state = {
    userData: [],
    record: '',
    visible: false
  }

  componentWillMount() {
    this.getListData()
  }

  columns = [
    {title: 'id', dataIndex: 'id'},
    {title: '用户名', dataIndex: 'username'},
    {title: '性别', dataIndex: 'sex', render: (text) => {
      return text === 1 ? '男' : '女'
    }},
    {title: '状态', dataIndex: 'state', render: (text) => {
      let config = {
        1 : '搬砖码农',
        2 : '北大才子',
        3 : '风流浪子',
        4 : '人生巅峰',
        5 : '职场黑马'
      }
      return config[text]
    }},
    {title: '爱好', dataIndex: 'interest', render: (text) => {
      let config = {1: '看书', 2: '听音乐', 3: '游泳', 4: '打代码', 5: '跑步', 6: '看电影', 7: '逛街', 8: '旅游'}
      return config[text]
    }},
    {title: '婚姻', dataIndex: 'isMarried', render: (text) => {
      return text === 0 ? '未婚' : '已婚'
    }},
    {title: '生日', dataIndex: 'birthday'},
    {title: '联系地址', dataIndex: 'address'},
    {title: '早起时间', dataIndex: 'time'}
  ]

  // 发送ajax 请求获取数据
  getListData = () => {
    const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/table/list1'
    axios.get(url).then(res => {
      let data = res.data.result
      data.list.map(item => item.key = item.id)
      this.setState({
        userData: data.list,
        pagination: Utils.setPagination(data, page => {
          // 点击页码的 回调
          this.getListData()
        })
      })
    })
  }
  // 点击 表格行 设置选中项
  rowClick = (result) => {
    console.log(result)
    this.setState({
      record: result
    })
  }
  // 操作员工，根据 type形参 判断是 新增/编辑/详情/删除
  operateUser = (type) => {
    if (type === 'create') {
      // 显示 模态框  记录type 和模态框中要显示的title
      this.setState({
        title: '创建员工',
        visible: true,
        type
      })
    } else if (type === 'edit' || type === 'detail') {
      // 判断是否 选中了数据
      if (!this.state.record) {
        return Modal.info({
          title: '提示',
          content: '请先选择用户'
        })
      }
      this.setState({
        title: type === 'edit' ? '编辑员工' : '员工详情',
        visible: true,
        userRecord: this.state.record,
        type
      })
    } else {
      // 删除操作
      if (!this.state.record) {
        return Modal.info({
          title: '提示',
          content: '请先选择用户'
        })
      }
      // 出现确认框提示，提交后发送请求 删除，成功后 重新请求页面数据
      Modal.confirm({
        title: '删除提示',
        content: '您确认删除该用户吗?',
        onOk: () => {
          // 发送 ajax 请求删除数据，成功后 重新请求数据
          const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/user/delete'
          axios.get(url).then(res => {
            if (res.data.code === 0) {
              message.success('删除成功')
              this.getListData()
            }
          })
        }
      })
    }
  }
  // 模态框 点击取消 隐藏模态框，重置表单数据
  handleCancel = () => {
    this.setState({
      visible: false,
      // 重置 userRecord 防止 新增操作中 表格出现默认数据
      userRecord: ''
    })
    this.form.props.form.resetFields()
  }
  // 模态框 点击ok 发送ajax 请求，成功后隐藏模态框，重置表单数据，重新请求数据
  handleOk = () => {
    const baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
    const url = this.state.type === 'create' ? '/user/add':'/user/edit'
    axios.get(baseUrl+url).then(res => {
      if (res.data.code === 0) {
        this.setState({
          visible: false,
          // 重置 userRecord 防止 新增操作中 表格出现默认数据
          userRecord: '',
        })
        this.form.props.form.resetFields()
        this.getListData()
      }
    })
  }

  render() {
    // 员工 详情时 去除模态框footer
    let footer = {}
    if (this.state.type === 'detail') {
      footer = {footer:null}
    }
    return (
      <Fragment>
        <Card
          className="card-wrapper"
          title={
            <Fragment>
              <Button type="primary" icon="plus" onClick={() => this.operateUser('create')}>创建员工</Button>
              <Button icon="edit" onClick={() => this.operateUser('edit')}>编辑员工</Button>
              <Button onClick={() => this.operateUser('detail')}>员工详情</Button>
              <Button type="danger" icon="delete" onClick={this.operateUser}>删除员工</Button>
            </Fragment>
          }
        >
          <Table
            columns={this.columns}
            dataSource={this.state.userData}
            bordered
            pagination={this.state.pagination}
            rowSelection={{type: 'radio', selectedRowKeys: [this.state.record.key]}}
            onRow={(result) => {
              return {onClick: () => this.rowClick(result)}
            }}
          />
        </Card>
        <Modal 
          width={600}
          title={this.state.title}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          {...footer}
        >
          <UserForm type={this.state.type} record={this.state.userRecord} wrappedComponentRef={(form) => this.form = form}/>
        </Modal>
      </Fragment>
    )
  }
}

// 新增 编辑 详情 都用同一个表单组件，通过父组件传递的参数判断
class UserForm extends React.Component {
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

  getState = (state) => {
    return {
      1 : '搬砖码农',
      2 : '北大才子',
      3 : '风流浪子',
      4 : '人生巅峰',
      5 : '职场黑马'
    }[state]
  }

  render() {
    const {getFieldDecorator} = this.props.form
    let record = this.props.record || {}
    let type = this.props.type
    return (
      <Form>
        <FormItem label="姓名" {...this.formItemLayout}>
          {
            type === 'detail' ? record.username :
            getFieldDecorator('username',{
              initialValue: record.username
            })(
              <Input placeholder="请输入姓名"/>
            )
          }
        </FormItem>
        <FormItem label="性别" {...this.formItemLayout}>
          {
            type === 'detail' ? record.sex === 1 ? '男' : '女' :
            getFieldDecorator('sex', {
              initialValue: record.sex
            })(
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )
          }
        </FormItem>
        <FormItem label="状态" {...this.formItemLayout}>
          {
            type === 'detail' ? this.getState(record.state) :
            getFieldDecorator('state', {
              initialValue: record.state
            })(
              <Select placeholder="请选择">
                <Option value={1}>搬砖码农</Option>
                <Option value={2}>北大才子</Option>
                <Option value={3}>风流浪子</Option>
                <Option value={4}>人生巅峰</Option>
                <Option value={5}>职场黑马</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="生日" {...this.formItemLayout}>
          {
            type === 'detail' ? record.birthday : 
            getFieldDecorator('birthday', {
              initialValue: moment(record.birthday)
            })(
              <DatePicker/>
            )
          }
        </FormItem>
        <FormItem label="联系地址" {...this.formItemLayout}>
          {
            type === 'detail' ? record.address : 
            getFieldDecorator('address', {
              initialValue: record.address
            })(
              <TextArea rows={4} placeholder="请输入联系地址"/>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
UserForm = Form.create()(UserForm)