import React from 'react'
import {Card, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, Icon, Checkbox, Button} from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const Option = Select.Option
const TextArea = Input.TextArea

class Register extends React.Component{

  state = {
    loading: false,
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, value) => {
      if (err) return
      console.log(value)
    })
  }

  render() {
    const {getFieldDecorator} = this.props.form
    // 表单项 的label 和 表单组件 布局
    const formItemLayout = {
      labelCol: {
        xs: 24,
        sm: 4
      },
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 4
        }
      }

    }

    return (
      <Card title="注册表单">
        <Form onSubmit={this.handleSubmit}>
         <FormItem 
            {...formItemLayout}
            label="用户名"
          >
            {
              getFieldDecorator('username', {
                rules: [{required: true, message: '请输入用户名'}]
              })(
                <Input placeholder="请输入用户名"/>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="密码"
          >
            {
              getFieldDecorator('password', {
                rules: [{required: true, message: '请输入密码'}]
              })(
                <Input placeholder="请输入密码" type="password"/>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="性别"
          >
            {
              getFieldDecorator('gender',{
                initialValue: 'male'
              })(
                <RadioGroup>
                  <Radio value="male">男</Radio>
                  <Radio value="female">女</Radio>
                </RadioGroup>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="年龄"
          >
            {
              getFieldDecorator('age',{
                initialValue: 18
              })(
                <InputNumber min={1} max={100}/>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="当前状态"
          >
            {
              getFieldDecorator('status',{
                initialValue: '1'
              })(
                <Select>
                  <Option value="1">风华浪子</Option>
                  <Option value="2">豆蔻年华</Option>
                  <Option value="3">浪里咸鱼</Option>
                  <Option value="4">北大才子</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="爱好"
          >
            {
              getFieldDecorator('hobby',{
                initialValue: ['read', 'coding']
              })( 
                <Select mode="multiple">
                  <Option value="read">看书</Option>
                  <Option value="swim">游泳</Option>
                  <Option value="coding">打代码</Option>
                  <Option value="music">听音乐</Option>
                  <Option value="movie">看电影</Option>
                </Select>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="是否已婚"
          >
            {
              getFieldDecorator('isMarried',{
                valuePropName: 'checked',
                initialValue: true
              })( 
                <Switch />
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="生日"
          >
            {
              getFieldDecorator('birthday',{
                initialValue: moment('2018-08-08')
              })( 
                <DatePicker showTime />
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="联系地址"
          >
            {
              getFieldDecorator('address',{
                initialValue: '上海市闵行区'
              })( 
                <TextArea rows={4}/>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="早起时间"
          >
            {
              getFieldDecorator('getUpTime',{
                initialValue: moment('08:00:00', 'HH:mm:ss')
              })( 
                <TimePicker/>
              )
            }
          </FormItem>
          <FormItem 
            {...formItemLayout}
            label="头像"
          >
            {
              getFieldDecorator('avatar')( 
                <Upload
                  name="avatar"
                  listType="picture-card"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  onChange={this.handleChange}
                >
                  {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" /> : <Icon type="plus" />}
                </Upload>
              )
            }
          </FormItem>
          <FormItem 
            {...tailFormItemLayout}
          >
            {
              getFieldDecorator('agreement',{
                valuePropName: 'checked',
                initialValue: true
              })( 
                <Checkbox>我已阅读过<a href="#">fun生活协议</a></Checkbox>
              )
            }
          </FormItem>
          <FormItem 
            {...tailFormItemLayout}
          >
           <Button type="primary" htmlType="submit">注册</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(Register)

