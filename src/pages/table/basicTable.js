import React from 'react'
import {Card, Table, Modal, Button, message} from 'antd'
import axios from 'axios'
import Utils from '../../utils'
const Fragment = React.Fragment

export default class BasicTable extends React.Component {

  state = {
    dataSourceTwo: [],
    selectRowKeys: [],
    multipleRowKeys: [],
  }

  columns = [
    { title: 'id', dataIndex: 'id'},
    {title: '用户名', dataIndex: 'username'},
    {title: '性别', dataIndex: 'gender'},
    {title: '状态', dataIndex: 'status'},
    {title: '爱好', dataIndex: 'hobby'},
    {title: '生日', dataIndex: 'birthday'},
    {title: '地址', dataIndex: 'address'},
    {title: '早起时间', dataIndex: 'getUpTime'},
    {title: '操作', render: () => <Button size="small">删除</Button>}
  ]

  dataSource = [
    {key: '1', id: '1', username: 'Jack', gender: '男', status: '浪里白条', hobby: '游泳', birthday: '2008-8-8', address: '上海闵行区', getUpTime: '08:30'},
    {key: '2', id: '2', username: 'Jack', gender: '男', status: '浪里白条', hobby: '游泳', birthday: '2008-8-8', address: '上海闵行区', getUpTime: '08:30'},
    {key: '3', id: '3', username: 'Jack', gender: '男', status: '浪里白条', hobby: '游泳', birthday: '2008-8-8', address: '上海闵行区', getUpTime: '08:30'},
  ]

  columnsTwo = [
    {title: 'id', dataIndex: 'id'},
    {title: '用户名', dataIndex: 'username'},
    {title: '性别', dataIndex: 'sex', render: (text) => {
      return text === 1 ? '男' : '女'
    }},
    {title: '状态', dataIndex: 'state', render: (text) => {
      let config = {1: '浪里白条', 2: '北大才子', 3: '清华学霸', 4: '商界精英', 5: '聚会麦霸'}
      return config[text]
    }},
    {title: '爱好', dataIndex: 'interest', render: (text) => {
      let config = {1: '看书', 2: '听音乐', 3: '游泳', 4: '打代码', 5: '跑步', 6: '看电影', 7: '逛街', 8: '旅游'}
      return config[text]
    }},
    {title: '生日', dataIndex: 'birthday'},
    {title: '地址', dataIndex: 'address'},
    {title: '早起时间', dataIndex: 'time'},
  ]

  componentWillMount() {
    this.getData()
  }

  getData = () => {
    Utils.ajax('/table/list',{}, data => {
      console.log(data)
      data.list.map(item => item.key = item.id)
      this.setState({
        dataSourceTwo: data.list,
        pagination: Utils.setPagination(data, (page) => {
          this.getData()
        })
      })
    })
  }

  // 发送 ajx请求 获取数据
  // getData = () => {
  //   const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/table/list'
  //   axios.get(url).then((res) => {
  //     // 给 接口返回的数据 每一项 加上一个key
  //     const data = res.data.result.list.map(item => {
  //       item.key = item.id
  //       return item
  //     })
  //     // console.log(res)
  //     this.setState({
  //       dataSourceTwo: data,
  //       // 接口 数据返回 后，再设置分页
  //       pagination: {
  //         current: res.data.result.page,
  //         pageSize: res.data.result.page_size,
  //         showQuickJumper: true,
  //         total: res.data.result.total_count,
  //         onChange: (page) => {console.log(page)}
  //       }
  //     })
  //   })
  // }

  // 单击 列表数据
  RowClick = (record) => {
    // 点击 设置 表单选中 项 并弹出提示
    this.setState({
      selectRowKeys: [record.key]
    })
    Modal.info({
      title: '信息',
      content: '当前选中的用户为: '+record.username
    })
  }

  // 点击删除 按钮
  handleDelete = () => {
    const keys = this.state.multipleRowKeys
    if (keys.length === 0) {
      message.info('请选择 要删除的数据')
      return 
    }
    Modal.confirm({
      title: '提示',
      content: '选择的是key为'+keys.toString()+'的数据'
    })
  }


  render() {
    // 可选 表格选中 配置
    let rowSelection = {
      type: 'radio',
      selectedRowKeys: this.state.selectRowKeys
    }

    // 多选列表 配置
    let MultiSelection = {
      type: 'checkbox',
      selectedRowKeys: this.state.multipleRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          multipleRowKeys: selectedRowKeys
        })
      }
    }
  
    return (
      <Fragment>
        <Card title="基础表格" className="card-wrapper">
          <Table 
            columns={this.columns} 
            dataSource={this.dataSource}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="动态数据渲染表格-Mock" className="card-wrapper">
          <Table 
            columns={this.columnsTwo} 
            dataSource={this.state.dataSourceTwo}
            bordered
            pagination={false}
          />
        </Card>
        <Card title="Mock-单选" className="card-wrapper">
          <Table 
            columns={this.columnsTwo} 
            dataSource={this.state.dataSourceTwo}
            bordered
            pagination={false}
            rowSelection={rowSelection}
            // onRow 设置 行属性，可以给每一行 绑定事件
            onRow={(record) => {
              return {onClick: () => this.RowClick(record)}
            }}
          />
        </Card>
        <Card title="Mock-多选" className="card-wrapper">
          <Button style={{marginBottom: 10}} onClick={this.handleDelete}>删除</Button>
          <Table 
            columns={this.columnsTwo} 
            dataSource={this.state.dataSourceTwo}
            bordered
            pagination={false}
            rowSelection={MultiSelection}
          />
        </Card>
        <Card title="Mock-表格分页">
          <Table 
            columns={this.columnsTwo} 
            dataSource={this.state.dataSourceTwo}
            bordered
            pagination={this.state.pagination}
          />
        </Card>
      </Fragment>
    )
  }
}