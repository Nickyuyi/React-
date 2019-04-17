// 切换 菜单 的action
export default (menuName) => {
  return {
    type: 'SWITCH_MENU',
    menuName
  }
}