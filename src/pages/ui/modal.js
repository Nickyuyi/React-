import React from 'react'
import {Card, Button, Modal} from 'antd'
const Fragment = React.Fragment

export default class MyModal extends React.Component {
  state = {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false
  }

  handleClick = (visibleType) => {
    this.setState({
      [visibleType]: true
    })
  }

  handleOk = (visibleType) => {
    this.setState({
      [visibleType]: false
    })
  } 
  
  handleCancel = (visibleType) => {
    this.setState({
      [visibleType]: false
    })
  }

  handleOpen = (openType) => {
    Modal[openType]({
      title: 'React',
      content: '继续学习',
      onOk() {},
      onCancel() {}
    })
  }

  render() {
    return (
      <Fragment>
        <Card title="基础模态框" className="card-wrapper">
          <Button type="primary" onClick={() => this.handleClick('visible1')}>open</Button>
          <Modal
            title="React"
            visible={this.state.visible1}
            onOk={() => this.handleOk('visible1')}
            onCancel={() => this.handleCancel('visible1')}
          >
            欢迎进入页面
          </Modal>
          <Button type="primary" onClick={() => this.handleClick('visible2')}>自定义页脚</Button>
          <Modal 
            title="React"
            visible={this.state.visible2}
            onOk={() => this.handleOk('visible2')}
            onCancel={() => this.handleCancel('visible2')}
            okText="好的"
            cancelText="算了"
            okType="danger"
          >
            自定义页脚
          </Modal>
          <Button type="primary" onClick={() => this.handleClick('visible3')}>顶部20px弹框</Button>
          <Modal 
            title="React"
            visible={this.state.visible3}
            onOk={() => this.handleOk('visible3')}
            onCancel={() => this.handleCancel('visible3')}
            style={{top: 20}}
          >
            顶部20px弹框
          </Modal>
          <Button type="primary" onClick={() => this.handleClick('visible4')}>水平垂直居中</Button>
          <Modal 
            title="React"
            visible={this.state.visible4}
            onOk={() => this.handleOk('visible4')}
            onCancel={() => this.handleCancel('visible4')}
            centered
          >
            水平垂直居中
          </Modal>
        </Card>
        <Card title="信息确认框" className="card-wrapper">
          <Button onClick={() => this.handleOpen('confirm')}>Confirm</Button>
          <Button onClick={() => this.handleOpen('info')}>info</Button>
          <Button onClick={() => this.handleOpen('success')}>success</Button>
          <Button onClick={() => this.handleOpen('warning')}>warning</Button>
          <Button onClick={() => this.handleOpen('error')}>error</Button>
        </Card>
      </Fragment>
    )
  }
}