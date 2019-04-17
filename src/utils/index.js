import React from 'react'
import {Select, Modal} from 'antd'
import axios from 'axios'
const Option = Select.Option

export default {
  // 时间格式化
  formateDate(time) {
    if (!time) return
    let date = new Date(time)
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  },

  // Select组件 封装 传入数组
  // 返回 <Select><Option value="1">北京</Option>...</Select> 结构
  MySelect(arr) {
    const options = arr.map(item => {
      return <Option value={item.value} key={item.value}>{item.text}</Option>
    })
    return <Select>{options}</Select>
  },

  // 设置分页
  setPagination(data, callback) {
    return {
      current: data.page,
      pageSize: data.page_size,
      total: data.total_count,
      showQuickJumper: true,
      showTotal: (total) => `共${total}条`,
      onChange: callback
    }
  },

  // 封装 ajax请求
  ajax(url, params, callback) {
    const baseUrl = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api'
    axios
      .get(baseUrl+url, {params})
      .then(res => {
        if (res.data.code !== 0) {
          return Modal.error({
            title: '提示',
            content: '请求失败'
          })
        }
        callback && callback(res.data.result)
      })
  }
}