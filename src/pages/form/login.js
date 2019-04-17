import React from 'react'
import {Card, Form, Icon, Input, Button, Checkbox} from 'antd'
const Fragment = React.Fragment
const FormItem = Form.Item

class Login extends React.Component{

  handleSubmit = (e) => {
    e.preventDefault()
    // 校验 并获取 值
    this.props.form.validateFieldsAndScroll((error, value) => {
      if (error) return
      console.log(value)
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    return (
      <Fragment>
        <Card title="登录行内表单" className="card-wrapper">
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              {
                getFieldDecorator('userName')(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="username"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password',{
                  rules: [{required: true, message: '请输入密码'}]
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="password" type="password"/>
                )
              }
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单">
          <Form onSubmit={this.handleSubmit} style={{width: 300}}>
            <FormItem>
              {
                getFieldDecorator('username', {
                  rules: [{required: true, message: '请输入用户名'}]
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="username"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('pwd', {
                  rules: [{required: true, max: 5, min: 3, message: '请输入合法密码'}]
                })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="password"/>
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#" style={{float: 'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">登录</Button>
            </FormItem>
          </Form>
        </Card>
      </Fragment>
    )
  }
}

export default Form.create()(Login)