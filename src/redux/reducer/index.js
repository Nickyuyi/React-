// reducer 为纯函数，由store.dispatch调用  这里的state定为对象
let initialState = {
  menuName: '首页'
}
export default (initialState, action) => {
  switch(action.type) {
    case 'SWITCH_MENU':
      return {
        ...initialState,
        menuName: action.menuName
      }
    default:
      return {...initialState}
  }
}