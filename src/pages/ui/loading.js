import React from 'react'
import {Card, Spin, Icon, Alert} from 'antd'
const Fragment = React.Fragment

export default class MyLoading extends React.Component {
  render() {
    return (
      <Fragment>
        <Card title="Spin用法" className="card-wrapper">
          <Spin size="small" style={{marginRight: 5}}/>
          <Spin size="default" style={{marginRight: 5}}/>
          <Spin size="large" style={{marginRight: 5}}/>
          <Spin indicator={<Icon type="loading"/>} size="large"/>
        </Card>
        <Card title="内容遮罩">
          <Spin tip="loading">
            <Alert
              message="React"
              description="欢迎学习React"
              type="info"
            />
          </Spin>
          <Spin tip="loading">
            <Alert
              message="React"
              description="欢迎学习React"
              type="success"
              style={{marginTop: 10}}
            />
          </Spin>
        </Card>
      </Fragment>
    )
  }
}