import React from 'react'
import {Button, Card, notification} from 'antd'
const Fragment = React.Fragment

export default class Notice extends React.Component {
  openNotification(type, direction) {
    notification[type]({
      message: '消息来了',
      description: '您有新的消息',
      placement: direction
    })
  }

  render() {
    return (
      <Fragment>
        <Card title="通知提醒框" className="card-wrapper">
          <Button type="primary" onClick={() => this.openNotification('success')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>Error</Button>
        </Card>
        <Card title="通知提醒框" className="card-wrapper">
          <Button type="primary" onClick={() => this.openNotification('success','topLeft')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotification('info', 'topRight')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotification('warning', 'bottomLeft')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotification('error', 'bottomRight')}>Error</Button>
        </Card>
      </Fragment>
    )
  }
}