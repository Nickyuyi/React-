import React from 'react'
import {Card, Row, Col} from 'antd'
import axios from 'axios'
import './detail.less'
const Fragment = React.Fragment

export default class OrderDetail extends React.Component{
  state = {
    detailData: {}
  }

  componentDidMount() {
    this.getDetailData()
  }

  // 获取 订单 详情数据  在成功的回调里面 传入参数，调用渲染地图的方法
  getDetailData = () => {
    const url = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api/order/detail'
    axios.get(url).then(res => {
      const data = res.data.result
      this.setState({
        detailData: data
      })
      this.renderMap(data)
    })
  }

  renderMap = (result) => {
    // 创建地图实例 
    var map = new window.BMap.Map("map_container")
    // 创建点坐标      
    // var point = new window.BMap.Point(116.404, 39.915)
    // 初始化地图，设置中心点坐标和地图级别
    // map.centerAndZoom(point, 11)

    // 添加控件
    this.addMapControl(map)
    // 绘制用户行驶路线
    this.drawBikeRoute(map, result.position_list)
    // 绘制服务区
    this.drwaServiceArea(map, result.area)
  }

  // 添加地图控件
  addMapControl = (map) => {
    map.addControl(new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
    map.addControl(new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT}))
  }

  // 绘制用户的行驶路线
  drawBikeRoute = (map, positionList) => {
    let start = positionList[0]
    let end = positionList[positionList.length-1]
    // 设置 起始图标的url 图标大小，图标所用图片的大小，图标的定位点相对于图标左上角的偏移值
    let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    // 起始点
    let startPoint = new window.BMap.Point(start.lon, start.lat)
    // 创建起始标注
    let startMarker = new window.BMap.Marker(startPoint,{icon: startIcon})
    // 将标注 添加到地图中
    map.addOverlay(startMarker)
    startMarker.setAnimation(window.BMAP_ANIMATION_BOUNCE)
  
    let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
      imageSize: new window.BMap.Size(36, 42),
      anchor: new window.BMap.Size(18, 42)
    })
    let endPoint = new window.BMap.Point(end.lon, end.lat)
    let endMarker = new window.BMap.Marker(endPoint,{icon: endIcon})
    map.addOverlay(endMarker)

    // 创建折线
    let points = positionList.map(item => {
      return new window.BMap.Point(item.lon, item.lat)
    })
    let polyline = new window.BMap.Polyline(points, {
      strokeColor: '#1869AD',
      strokeWeight: 3,
      strokeOpacity: 1
    })
    map.addOverlay(polyline)

    // 初始化地图，设置中心点坐标和地图级别 结束点作为了中心点
    map.centerAndZoom(endPoint, 11)
  }

  // 绘制服务区
  drwaServiceArea = (map, areaList) => {
    let points = areaList.map(item => {
      return new window.BMap.Point(item.lon, item.lat)
    })
    // 创建 多边形
    let polygon = new window.BMap.Polygon(points, {
      strokeColor: '#CE0000',
      strokeWeight: 3,
      strokeOpacity: 1,
      fillColor: '#ff8605',
      fillOpacity:0.4
    })
    map.addOverlay(polygon)
  }

  render() {
    const {detailData} = this.state 
    return (
      <Fragment>
        <Row className="detail-header">
          <Col span={6} className="detail-logo">
            <img src="/assets/logo-ant.svg" alt=""/>
            <span>FUN+ 通用管理系统</span>
          </Col>
          <Col span={18} className="detail-welcome">
            <span>欢迎，发光de小鱼</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="detail-content">
          <Card>
            <div className="detail-map" id="map_container"></div>
            <div className="detail-info">
              <div className="detail-info-title">基础信息</div>
              <ul className="bd">
                <li>
                  <span>用车模式</span>
                  {detailData.mode === 1 ? '服务区' : '停车点'}
                </li>
                <li>
                  <span>订单编号</span>
                  {detailData.order_sn}
                </li>
                <li>
                  <span>车辆编号</span>
                  {detailData.bike_sn}
                </li>
                <li>
                  <span>用户姓名</span>
                  {detailData.user_name}
                </li>
                <li>
                  <span>手机号码</span>
                  {detailData.mobile}
                </li>  
              </ul>
            </div>
            <div className="detail-info">
              <div className="detail-info-title">行驶轨迹</div>
              <ul>
                <li>
                  <span>行程起点</span>
                  {detailData.start_location}
                </li>
                <li>
                  <span>行程终点</span>
                  {detailData.end_location}
                </li>
                <li>
                  <span>行驶里程</span>
                  {detailData.distance / 1000 + '公里'}
                </li>
              </ul>
            </div>
          </Card>
        </Row>
      </Fragment>
    )
  }
}