import React from 'react'
import {Card, Form, Button, Input, Select, DatePicker, Table, Modal, message} from 'antd'
import axios from 'axios'
import Utils from '../../utils'
const Fragment = React.Fragment
const FormItem = Form.Item
const Option = Select.Option

class Order extends React.Component {
  state = {
    dataSource: [],
    rowSelection: {
      type: 'radio',
      selectedRowKeys: []
    },
    visible: false,
    orderInfo: {}
  }

  componentWillMount() {
    this.getListData()
  }

  // 点击 查询 表单 获取数据，根据查询条件 重新获取数据
  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.props.form.getFieldsValue())
  }

  // 重置 表单内容
  onReset = () => {
    this.props.form.resetFields()
  }

  columns = [
    {title: '订单编号', dataIndex: 'order_sn'},
    {title: '车辆编号', dataIndex: 'bike_sn'},
    {title: '用户名', dataIndex: 'user_name'},
    {title: '手机号', dataIndex: 'mobile'},
    {title: '里程', dataIndex: 'distance'},
    {title: '行驶时长', dataIndex: 'total_time'},
    {title: '状态', dataIndex: 'status'},
    {title: '开始时间', dataIndex: 'start_time'},
    {title: '结束时间', dataIndex: 'end_time'},
    {title: '订单金额', dataIndex: 'total_fee'},
    {title: '实付金额', dataIndex: 'user_pay'},
  ]

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

  // 点击 行 设置当前行选中
  RowClick = (record) => {
    const rowSelection = {
      type: 'radio',
      selectedRowKeys: [record.key]
    }
    this.setState({
      rowSelection
    })
  }

  // 获取列表数据
  getListData() {
    const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/order/list'
    axios.get(url).then((res) => {
      const data = res.data.result
      // 给数据 设置 key 
      data.item_list.map(item => item.key = item.id)
      this.setState({
        dataSource: data.item_list,
        pagination: Utils.setPagination(data, (page) => {
          // 点击页码的回调
          this.getListData()
        })
      })
    })
  }

  // 点击 结束订单
  overOrder = () => {
    if (this.state.rowSelection.selectedRowKeys.length === 0) {
      return Modal.info({
        title: '提示',
        content: '请先选择订单'
      })
    }
    // 用选中项的key作为参数 发送ajax 请求获取该订单数据，显示在Modal中
    const url='https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/order/ebike_info'
    axios.get(url).then(res => {
      const data = res.data.result
      this.setState({
        visible: true,
        orderInfo: data
      })
    })
  }

  // 提交 结束订单
  submitOverOrder = () => {
    // 发送ajax请求，结束订单，成功后关闭模态框，重新请求页面数据
    const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/order/finish_order'
    axios.get(url).then(res => {
      if (res.data.result === 'Ok') {
        this.setState({
          visible: false,
          rowSelection: {
            type: 'radio',
            selectedRowKeys: []
          },
        })
        message.success('订单结束成功')
        this.getListData()
      }
    })
  }

  // 点击 订单详情
  orderDetail = () => {
    const rowKeys = this.state.rowSelection.selectedRowKeys
    if (rowKeys.length === 0) {
      return Modal.info({
        title: '提示',
        content: '请先选择订单'
      })
    }
    // 重新 打开一个页面
    window.open(`/#/common/order/detail/${rowKeys.toString()}`,'_blank')
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Fragment>
        <Card className="card-wrapper">
          <Form layout="inline" onSubmit={this.onSubmit}>
            <FormItem label="城市">
              {
                getFieldDecorator('city', {
                  initialValue: '2'
                })(
                  <Select>
                    <Option value="1">全部</Option>
                    <Option value="2">北京</Option>
                    <Option value="3">上海</Option>
                    <Option value="4">广州</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label="订单时间">
              {
                getFieldDecorator('start_time')(
                  <DatePicker
                    showTime
                    placeholder='开始时间'
                  />
                )
              }
            </FormItem>
            <FormItem label="~" colon={false}>
              {
                getFieldDecorator('end_time')(
                  <DatePicker
                    showTime
                    placeholder='结束时间'
                  />
                )
              }
            </FormItem>
            <FormItem label="订单状态">
              {
                getFieldDecorator('status', {
                  initialValue: '2'
                })(
                  <Select>
                    <Option value="1">全部</Option>
                    <Option value="2">进行中</Option>
                    <Option value="3">结束行程</Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button onClick={this.onReset}>重置</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title={
          <div>
            <Button type="primary" style={{marginRight: 10}} onClick={this.orderDetail}>订单详情</Button>
            <Button type="primary" onClick={this.overOrder}>结束订单</Button>
          </div>
        }>
          <Table
            columns={this.columns}
            dataSource={this.state.dataSource}
            pagination={this.state.pagination}
            rowSelection={this.state.rowSelection}
            bordered
            onRow={(record) => {
              return {onClick: () => this.RowClick(record)}
            }}
          />
        </Card>
        <Modal 
          visible={this.state.visible} 
          title="结束订单"
          onCancel={() => this.setState({visible: false})}
          onOk={this.submitOverOrder}
        >
          <Form>
            <FormItem label="车辆编号" {...this.formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...this.formItemLayout}>
              {this.state.orderInfo.battery+'%'}
            </FormItem>
            <FormItem label="行程开始时间" {...this.formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...this.formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </Fragment>
    )
  }
}

export default Form.create()(Order)