import React from 'react'
import {Card} from 'antd'

import ReactEcharts from 'echarts-for-react'
// 引入 自定义主题模块
import echartTheme from './customed'
// 引入主模块
import echarts from 'echarts/lib/echarts'
const Fragment = React.Fragment

export default class Bar extends React.Component {
  componentWillMount() {
    echarts.registerTheme('fun', echartTheme)
  }

  // 配置项 方法
  getOption() {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      xAxis: {
          type: 'category',
          data: [
            '周一',
            '周二',
            '周三',
            '周四',
            '周五',
            '周六',
            '周日'
          ]
      },
      yAxis: {
          type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        formatter: "{a} <br/>{b} : {c}"
      },
      // 系列列表。每个系列通过 type 决定自己的图表类型
      series: [{
          name: '骑行量',
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
      }]
    };
    return option
  }

  getOptionTwo() {
    let option = {
      legend: {},
      tooltip: {},
      dataset: {
        // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射
        dimensions: ['week', 'OFO', '摩拜', '小蓝'],
        source: [
          {week: '周一', OFO: 200, 摩拜: 300, 小蓝: 66 },
          {week: '周二', OFO: 600, 摩拜: 200, 小蓝: 166 },
          {week: '周三', OFO: 200, 摩拜: 100, 小蓝: 55 },
          {week: '周四', OFO: 500, 摩拜: 400, 小蓝: 44 },
          {week: '周五', OFO: 232, 摩拜: 112, 小蓝: 33 }
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
          {type: 'bar'},
          {type: 'bar'},
          {type: 'bar'}
      ]
    }
    return option
  }

  render() {
    return (
      <Fragment>
        <Card title="柱形图表之一" className="card-wrapper">
          <ReactEcharts
            option={this.getOption()}
            style={{height:500}}
            theme="fun"
          />
        </Card>
        <Card title="柱形图表之二">
          <ReactEcharts
            option={this.getOptionTwo()}
            style={{height: 500}}
            theme="fun"
          />
        </Card>
      </Fragment>
    )
  }
}