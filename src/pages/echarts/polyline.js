import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'
import echart from 'echarts/lib/echarts'
import echartTheme from './customed'
const Fragment = React.Fragment

export default class Polyline extends React.Component {
  componentWillMount() {
    // 设置自定义 的主题
    echart.registerTheme('fun', echartTheme)
  }

  getOption() {
    let option = {
      title: {
        text: '用户骑行量'
      },
      tooltip: {
        trigger: 'axis',
        // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        formatter: "{a} <br/>{b} : {c}"
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
          name: '骑行量',
          data: [333,222,111,499,688,555,300],
          type: 'line'
        }
      ]
    }
    return option
  }

  getOptionTwo() {
    let option = {
      title: {
        text: '用户骑行订单',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['OFO订单', '摩拜订单']
      },
      xAxis: {
        type: 'category',
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'OFO订单',
          type: 'line',
          data: [150,200,222,300,500,300,123]
        },
        {
          name: '摩拜订单',
          type: 'line',
          data: [250,280,300,200,400,300,100]
        }
      ]
    }
    return option
  }

  getOptionThree() {
    let option = {
      title: {
        text: '用户骑行订单'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '骑行量',
          type: 'line',
          data: [150,200,222,300,500,300,123],
          areaStyle: {}
        }
      ]
    }
    return option
  }

  render() {
    return (
      <Fragment>
        <Card title="折线图表一" className="card-wrapper">
          <ReactEcharts
            option={this.getOption()}
            theme='fun'
            style={{height: 500}}
          />
        </Card>
        <Card title="折线图表二" className="card-wrapper">
          <ReactEcharts
            option={this.getOptionTwo()}
            theme='fun'
            style={{height: 500}}
          />
        </Card>
        <Card title="折线图表三">
          <ReactEcharts
            option={this.getOptionThree()}
            theme='fun'
            style={{height: 500}}
          />
        </Card>
      </Fragment>
    )
  }
}