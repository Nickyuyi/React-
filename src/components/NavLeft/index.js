import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import menuList from './../../config/menuConfig'
import {connect} from 'react-redux'
import switchMenu from '../../redux/action'
const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const Fragment = React.Fragment

class NavLeft extends React.Component {
  state = {
    selectedKeys: []
  }

  // 点击 菜单项 设置 selectedKeys
  onClick = ({item, key}) => {
    this.setState({selectedKeys: [key]})
    // 传入 action 调用reducer  将点击的菜单项的title传入
    this.props.dispatch(switchMenu(item.props.title))
    // localStorage.setItem('menuName',item.props.title)
  }

  componentWillMount() {
    const MenuTree = this.renderMenu(menuList)
    this.setState({
      MenuTree
    })
    // 根据 hash内容，获取当前要选中的菜单项 要去掉#号 和? 后面的内容
    let keys = window.location.hash.replace(/#|\?.*/g, '')
    this.setState({selectedKeys: [keys]})
  }

  renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <MenuItem key={item.key} title={item.title}>
        <Link to={item.key}>{item.title}</Link>
      </MenuItem>
    })
  }

  render() {
    return (
      <Fragment>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>FUN+</h1>
        </div>
        <Menu 
          theme="dark"
          selectedKeys={this.state.selectedKeys}
          onClick={this.onClick}
        >
          {this.state.MenuTree}
        </Menu>
      </Fragment>
    )
  }
}

export default connect()(NavLeft)