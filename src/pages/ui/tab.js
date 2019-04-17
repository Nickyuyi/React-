import React from 'react'
import {Card, Tabs, message, Icon} from 'antd'
const Fragment = React.Fragment
const TabPane = Tabs.TabPane

export default class MyTab extends React.Component {

  onChange = (key) => {
    message.success(`选择了key为${key}的tab`)
  }
  render() {
    return (
      <Fragment>
        <Card title="Tab 页签" className="card-wrapper">
          <Tabs defaultActiveKey="1" onChange={this.onChange}>
            <TabPane tab="Tab 1" key="1">Tab 1</TabPane>
            <TabPane tab="Tab 2" disabled key="2">Tab 2</TabPane>
            <TabPane tab="Tab 3" key="3">Tab 3</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab 带图的页签" className="card-wrapper">
          <Tabs defaultActiveKey="1" onChange={this.onChange}>
            <TabPane tab={<span><Icon type="apple"/>Tab 1</span>} key="1">Tab 1</TabPane>
            <TabPane tab={<span><Icon type="android"/>Tab 2</span>} key="2">Tab 2</TabPane>
            <TabPane tab={<span><Icon type="chrome"/>Tab 3</span>} key="3">Tab 3</TabPane>
          </Tabs>
        </Card>
      </Fragment>
    )
  }
}