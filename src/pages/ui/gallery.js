import React from 'react'
import {Card, Row, Col, Modal} from 'antd'
const Fragment = React.Fragment
const { Meta } = Card

export default class Gallery extends React.Component {

  state = {visible: false}

  showModal(card) {
    this.setState({
      visible: true,
      currentImg: '/gallery/'+card
    })

  }

  render() {
    const imgList = [
      ['1.png', '2.png', '3.png', '4.png', '5.png'],
      ['6.png', '7.png', '8.png', '9.png', '10.png'],
      ['11.png', '12.png', '13.png', '14.png', '15.png'],
      ['16.png', '17.png', '18.png', '19.png', '20.png'],
      ['21.png', '22.png', '23.png', '24.png', '25.png']
    ]

    const cardList = imgList.map(item => item.map(card => {
      return (
        <Card
          key={card}
          hoverable
          cover={<img alt="example" src={`/gallery/${card}`} />}
          style={{marginBottom: 10}}
          onClick={() => this.showModal(card)}
        >
          <Meta
            title="Fun+"
            description="Fun+ tearkwork"
          />
        </Card>
      )
    }))

    return (
      <Fragment>
        <Row gutter={10}>
          <Col span={5}>
            {cardList[0]}
          </Col>
          <Col span={5}>
            {cardList[1]}
          </Col>
          <Col span={5}>
            {cardList[2]}
          </Col>
          <Col span={5}>
            {cardList[3]}
          </Col>
          <Col span={4}>
            {cardList[4]}
          </Col>
        </Row>
        <Modal
          title="图片画廊"
          visible={this.state.visible}
          footer={null}
          onCancel={() => {
            this.setState({visible: false})
          }}
        >
          <img src={this.state.currentImg} alt="" style={{width: '100%'}}/>
        </Modal>
      </Fragment>
    )
  }
}