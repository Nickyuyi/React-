import React from 'react'
import {Card, Form, Button, DatePicker, Select} from 'antd'
import axios from 'axios'
const FormItem = Form.Item
const Fragment = React.Fragment
const Option = Select.Option

class BikeMap extends React.Component{

  state = {
    bikeData: {}
  }

  componentWillMount() {
    this.getBikeData()
  }

  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.props.form.getFieldsValue())
  }

  onReset = () => {
    this.props.form.resetFields()
  }

  getBikeData = () => {
    const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/map/bike_list'
    axios.get(url).then(res => {
      let data = res.data.result
      this.setState({
        bikeData: data
      })
      // 渲染 地图
      this.renderMap(data)
    })
  }

  // 渲染地图   
  renderMap = (data) => {
    // 创建地图实例
    var map = new window.BMap.Map("mapContainer");
    // 添加控件
    this.addMapControler(map)
    // 画 起始到 结束点的路线
    this.drawBikeRoute(map, data.route_list)
    // 在地图 上添加bike
    this.drawBikePoint(map, data.bike_list)
    // 在地图上 添加服务区
    this.drawServiceArea(map, data.service_list)
  }

  // 添加控件
  addMapControler = (map) => {
    // 添加 比例尺 和 缩放 平移控件
    map.addControl(new window.BMap.ScaleControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))
    map.addControl(new window.BMap.NavigationControl({anchor:window.BMAP_ANCHOR_TOP_RIGHT}))
    //启用滚轮放大缩小，默认禁用
    map.enableScrollWheelZoom();
    //启用地图惯性拖拽，默认禁用
	  map.enableContinuousZoom();   
  }

  // 添加 起始和结束点 用线连接
  drawBikeRoute = (map, routeList) => {
    let points = routeList.map(item => {
      return new window.BMap.Point(item.split(',')[0], item.split(',')[1])
    })
    let startPoint = points[0]
    let endPoint = points[points.length-1]

    // 起始点图标
    let startIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    // 结束点图标
    let endIcon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    });
    // 绘制起始点 结束点
    map.addOverlay(new window.BMap.Marker(startPoint, {icon: startIcon}))
    map.addOverlay(new window.BMap.Marker(endPoint, {icon: endIcon}))

    //创建折线
    var polyline = new window.BMap.Polyline(points, {
      strokeColor: "#ef4136",
      strokeWeight: 3,
      strokeOpacity: 1
    });   

    // 绘制折线
    map.addOverlay(polyline)
    // 初始化地图，设置中心点坐标和地图级别 
    map.centerAndZoom(endPoint, 11);
  }

  // 添加 bike 位置
  drawBikePoint = (map, bikeList) => {
    // bike图标
    let bikeIcon = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    // 遍历 添加bike 到地图上
    bikeList.map(item => {
      let point = new window.BMap.Point(item.split(',')[0], item.split(',')[1])
      let marker = new window.BMap.Marker(point, {icon: bikeIcon})
      map.addOverlay(marker)
    })

  }

  // 添加服务 区域 即polygon
  drawServiceArea = (map, serviceList) => {

    let points = serviceList.map(item=> {
      return new window.BMap.Point(item.lon, item.lat)
    })
    // 创建多边形
    let polygon = new window.BMap.Polygon(points, {
      strokeColor: "#ef4136",
      strokeWeight: 3,
      strokeOpacity: 1
    })
    // 添加多边形
    map.addOverlay(polygon)
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Fragment>
        <Card className="card-wrapper">
          <Form layout="inline" onSubmit={this.onSubmit}>
            <FormItem label="订单时间">
              {
                getFieldDecorator('order_startTime')(
                  <DatePicker showTime/>
                )
              }
            </FormItem>
            <FormItem label="~" colon={false}>
              {
                getFieldDecorator('order_endTime')(
                  <DatePicker showTime/>
                )
              }
            </FormItem>
            <FormItem label="订单状态">
              {
                getFieldDecorator('state', {
                  initialValue: 1
                })(
                  <Select style={{width: 150}}>
                    <Option value={1}>全部</Option>
                    <Option value={2}>进行中</Option>
                    <Option value={3}>行程结束</Option>
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
        <Card>
          <div className="total">共{this.state.bikeData.total_count}辆车</div>
          <div style={{height: 500}} id="mapContainer"></div>
        </Card>
      </Fragment>
    )
  }
}

export default Form.create()(BikeMap)