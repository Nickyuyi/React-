import React from 'react'
import {Card, Button, Icon, Radio} from 'antd'
const {Fragment} = React
const ButtonGroup = Button.Group
const RadioGroup = Radio.Group

export default class MyButton extends React.Component {
  state = {
    loading: true,
    size: 'default'
  }

  handleClick = () => {
    this.setState({
      loading: false
    })
  }

  changeSize = (e) => {
    this.setState({
      size: e.target.value
    })
  }

  render() {
    return (
      <Fragment>
        <Card title="基础按钮" className="card-wrapper">
          <Button type="primary">FUN+</Button>
          <Button>FUN+</Button>
          <Button type="dashed">FUN+</Button>
          <Button type="danger">FUN+</Button>
          <Button disabled>FUN+</Button>
          <Button ghost>FUN+</Button>
        </Card>
        <Card title="图形按钮" className="card-wrapper">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button icon="search" shape="circle" />
          <Button icon="search" type="primary">搜索</Button>
          <Button icon="download" type="primary">下载</Button>
        </Card>
        <Card title="Loading按钮" className="card-wrapper">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="primary" shape="circle" loading={this.state.loading}/>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button loading={this.state.loading} shape="circle"/>
          <Button type="primary" onClick={this.handleClick}>关闭</Button>
        </Card>
        <Card title="按钮组" className="card-wrapper">
          <ButtonGroup>
            <Button type="primary"><Icon type="left" />返回</Button>
            <Button type="primary">前进<Icon type="right" /></Button>
          </ButtonGroup>
        </Card>
        <Card title="按钮尺寸" className="card-wrapper">
          <RadioGroup value={this.state.size} onChange={this.changeSize}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.size}>FUN+</Button>
          <Button size={this.state.size}>FUN+</Button>
          <Button type="dashed" size={this.state.size}>FUN+</Button>
          <Button type="danger" size={this.state.size}>FUN+</Button>
        </Card>
      </Fragment>
    )
  }
}