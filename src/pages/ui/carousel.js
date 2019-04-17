import React from 'react'
import {Card, Carousel} from 'antd'
import './ui.less'
const Fragment = React.Fragment

export default class MyCarousel extends React.Component {
  render() {
    return (
      <Fragment>
        <Card title="文字背景轮播" className="card-wrapper">
          <Carousel effect="fade" autoplay>
            <div><h3>FUN+1</h3></div>
            <div><h3>FUN+2</h3></div>
            <div><h3>FUN+3</h3></div>
            <div><h3>FUN+4</h3></div>
          </Carousel>
        </Card>
        <Card title="图片轮播">
          <Carousel autoplay>
            <div><img src="/carousel-img/carousel-1.jpg" alt=""/></div>
            <div><img src="/carousel-img/carousel-2.jpg" alt=""/></div>
            <div><img src="/carousel-img/carousel-3.jpg" alt=""/></div>
          </Carousel>
        </Card>
      </Fragment>
    )
  }
}