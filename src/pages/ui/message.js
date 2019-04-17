import React from 'react'
import {Card, Button, message} from 'antd'

export default class myMessage extends React.Component {
  openMessage = (type) => {
    message[type]('全局提示您: 下雨了')
  }

  render() {
    return (
      <Card title="全局提示框" className="card-wrapper">
        <Button type="primary" onClick={() => this.openMessage('success')}>Success</Button>
        <Button type="primary" onClick={() => this.openMessage('info')}>Info</Button>
        <Button type="primary" onClick={() => this.openMessage('warning')}>Warning</Button>
        <Button type="primary" onClick={() => this.openMessage('error')}>Error</Button>
        <Button type="primary" onClick={() => this.openMessage('loading')}>Loading</Button>
      </Card>
    )
  }
}