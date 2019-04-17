import React from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'
import echarts from 'echarts/lib/echarts'
import echartTheme from './customed'
const Fragment = React.Fragment

export default class Pie extends React.Component {
  componentWillMount() {
    echarts.registerTheme('fun', echartTheme)
  }

  getOption() {
    let option = {
      title: {
        text: '用户骑行量',
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        right: 'right',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          name: '一周骑行量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            {value:535, name:'周一'},
            {value:610, name:'周二'},
            {value:534, name:'周三'},
            {value:335, name:'周四'},
            {value:948, name:'周五'},
            {value:548, name:'周六'},
            {value:348, name:'周日'}
          ],
          itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option
  }

  getOptionTwo() {
    let option = {
      title: {
        text: '用户骑行量',
        x: 'center',
        textStyle: {
          color: 'skyblue'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      series: [
        {
          name: '一周骑行量',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
              normal: {
                  show: false,
                  position: 'center'
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '30',
                      fontWeight: 'bold'
                  }
              }
          },
          labelLine: {
              normal: {
                  show: false
              }
          },
          itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: [
            {value:535, name:'周一'},
            {value:610, name:'周二'},
            {value:534, name:'周三'},
            {value:335, name:'周四'},
            {value:948, name:'周五'},
            {value:548, name:'周六'},
            {value:348, name:'周日'}
          ],
        }
      ]
    }
    return option
  }

  render() {
    return (
      <Fragment>
        <Card title="饼形图表之一" className="card-wrapper">
          <ReactEcharts
            option={this.getOption()}
            style={{height: 500}}
            theme='fun'
          />            
        </Card>
        <Card title="饼形图表之二">
          <ReactEcharts
            option={this.getOptionTwo()}
            style={{height: 500}}
          />
        </Card>
      </Fragment>
    )
  }
}
