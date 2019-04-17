import React from 'react'
import {Card, Form, Select, Button, Table, Modal} from 'antd'
import Utils from '../../utils'
import axios from 'axios'
const Fragment = React.Fragment
const FormItem = Form.Item
const Option = Select.Option

class City extends React.Component{

  state = {
    dataSource: [],
    visible: false
  }

  componentWillMount() {
    this.getData()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    // 获取 表单数据，筛选 后 表格重新展示数据，筛选是前端完成功能，还是
    // 根据 筛选参数 发送请求给 后台 重新获取数据 ？？
    console.log(this.props.form.getFieldsValue())
  }

  // 重置 表单内容
  handleReset = () => {
    this.props.form.resetFields()
  }

  columns = [
    {title: '城市ID', dataIndex: 'id'},
    {title: '城市名称', dataIndex: 'name'},
    {title: '用车模式', dataIndex: 'mode', render: (text) => {
      return text === 1 ? '停车点' : '禁停区'
    }},
    {title: '营运模式', dataIndex: 'op_mode', render: (text) => {
      return text === 1 ? '加盟' : '自营'
    }},
    {title: '授权加盟商', dataIndex: 'franchisee_name'},
    {title: '城市管理员', dataIndex: 'city_admins', render: (text) => {
      const arr = text.map(item => item.user_name)
      return arr.toString()
    }},
    {title: '城市开通时间', dataIndex: 'open_time'},
    {title: '操作时间', dataIndex: 'update_time', render: (text) => {
      return Utils.formateDate(text)
    }},
    {title: '操作人', dataIndex: 'sys_user_name'},
  ]

  // 发送ajax请求 获取数据
  getData = () => {
    const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/open_city '
    axios.get(url).then(res => {
      const data = res.data.result
      data.item_list.map(item => {item.key = item.id})

      this.setState({
        dataSource: data.item_list,
        pagination: Utils.setPagination(data, (page) => {
          // 点击 了 页码后 获取点击的page 重新发送ajax请求 渲染数据
          this.getData()
        }),
      })
    })
  }

  // 新增城市 提交
  handleOpen = () => {
    this.setState({visible: false})
    // 让openCity 子组件 调用方法 获取表单数据  再提交数据给服务端，再次请求最新数据
    console.log(this.openForm.props.form.getFieldsValue())
    this.getData()
    // 重置表单
    this.openForm.props.form.resetFields()
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Fragment>
        <Card className="card-wrapper">
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem label="城市">
              {
                getFieldDecorator('city',{initialValue: '1'})(
                  // 使用了 自己封装 的select 组件
                  Utils.MySelect([
                    {value: '1', text: '全部'},
                    {value: '2', text: '北京'},
                    {value: '3', text: '上海'},
                    {value: '4', text: '广州'},
                  ])
                )
              }
            </FormItem>
            <FormItem label="用车模式">
              {
                getFieldDecorator('useMode',{initialValue: '3'})(
                  <Select>
                    <Option value='1'>全部</Option>
                    <Option value='2'>指定停车点模式</Option>
                    <Option value='3'>禁停区模式</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="营运模式">
              {
                getFieldDecorator('operateMode',{initialValue: '3'})(
                  <Select>
                    <Option value='1'>全部</Option>
                    <Option value='2'>自营</Option>
                    <Option value='3'>加盟</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="加盟商授权状态">
              {
                getFieldDecorator('authorization',{initialValue: '1'})(
                  <Select>
                    <Option value='1'>全部</Option>
                    <Option value='2'>已授权</Option>
                    <Option value='3'>未授权</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button onClick={this.handleReset}>重置</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title={<Button type="primary" onClick={() => this.setState({visible: true})}>开通城市</Button>}>
          <Table
            bordered
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
          />
        </Card>
        <Modal 
          title='开通城市'
          visible={this.state.visible}
          onCancel={() => this.setState({visible: false})}
          onOk={this.handleOpen}
        >
          {/* this.openForm即为 这个组件的实例 */}
          <OpenCityForm wrappedComponentRef={(openForm) => this.openForm = openForm} />
        </Modal>
      </Fragment>
    )
  }
}

// 开通 城市组件
class OpenCity extends React.Component {

  formItemLayout = {
    labelCol: {
      xs: 24,
      sm: 5
    },
    wrapperCol: {
      xs: 24,
      sm: 19
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Form>
        <FormItem label="选择城市" {...this.formItemLayout}>
          {
            getFieldDecorator('open_city',{initialValue: '1'})(
              <Select style={{width: 100}}>
                <Option value="1">北京市</Option>
                <Option value="2">上海市</Option>
                <Option value="3">广州市</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="营运模式" {...this.formItemLayout}>
          {
            getFieldDecorator('open_operateMode',{initialValue: '1'})(
              <Select style={{width: 100}}>
                <Option value='1'>自营</Option>
                <Option value='2'>加盟</Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem label="用车模式" {...this.formItemLayout}>
          {
            getFieldDecorator('open_useMode',{initialValue: '1'})(
              <Select style={{width: 100}}>
                <Option value='1'>指定停车点模式</Option>
                <Option value='2'>禁停区模式</Option>
              </Select>
            )
          }
        </FormItem>
      </Form>
    )
  }
}
const OpenCityForm = Form.create()(OpenCity)

export default Form.create()(City)