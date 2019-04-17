import React from 'react'
import {Row, Col} from 'antd'
import './index.less'
import Utils from '../../utils'
import Jsonp from 'jsonp'
import {connect} from 'react-redux'
const Fragment = React.Fragment

class Header extends React.Component {

  state = {}
  componentWillMount() {
    this.timer = setInterval(() => {
      this.setState({
        time: Utils.formateDate(new Date)
      })
    },1000)
    // 调用获取天气方法
    this.getWeatherData()
    
  }

  componentWillUnmount() {
    this.timer = null
  }

  getWeatherData() {
    let url = 'http://api.map.baidu.com/telematics/v3/weather?location=上海&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
    Jsonp(url, {}, (err, data) => {
      let WeatherData = data.results[0].weather_data[0]
      this.setState({
        dayPictureUrl: WeatherData.dayPictureUrl,
        weather: WeatherData.weather
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Row>
          <Col className="header-top">
            <span>欢迎，发光de小鱼</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4}>
            {/* <h1>{localStorage.getItem('menuName')||'首页'}</h1> */}
            {<h1>{this.props.state.menuName||'首页'}</h1>}
          </Col>
          <Col span={20} className="weather">
            <span>{this.state.time}</span>
            <img src={this.state.dayPictureUrl} alt=""/>
            <span>{this.state.weather}</span>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
// 将 state映射到 Header组件中
const mapStateToProps = (state) => {
  return {
    state
  }
}
export default connect(mapStateToProps)(Header)