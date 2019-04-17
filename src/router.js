import React from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom'
import App from './App'
import Home from './pages/home'
import NoMatch from './pages/nomatch'
import Button from './pages/ui/button'
import Modal from './pages/ui/modal'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notification'
import Message from './pages/ui/message'
import Tab from './pages/ui/tab'
import Gallery from './pages/ui/gallery'
import Carousel from './pages/ui/carousel'
import Login from './pages/form/login'
import Register from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import OrderDetail from './pages/order/detail'
import User from './pages/user'
import BikeMap from './pages/bikeMap'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Polyline from './pages/echarts/polyline'
import Permission from './pages/permission'
const Fragment = React.Fragment

export default class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Fragment>
            <Switch>
              <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
              {/* 嵌套路由 */}
              <Route path="/" render={() => 
                <App>
                  <Switch>
                    <Route path="/home" component={Home}/>
                    <Route path="/ui/buttons" component={Button}/>
                    <Route path="/ui/modals" component={Modal}/>
                    <Route path="/ui/loadings" component={Loading}/>
                    <Route path="/ui/notification" component={Notice}/>
                    <Route path="/ui/messages" component={Message}/>
                    <Route path="/ui/tabs" component={Tab}/>
                    <Route path="/ui/gallery" component={Gallery}/>
                    <Route path="/ui/carousel" component={Carousel}/>
                    <Route path="/form/login" component={Login}/>
                    <Route path="/form/reg" component={Register}/>
                    <Route path="/table/basic" component={BasicTable}/>
                    <Route path="/city" component={City}/>
                    <Route path="/order" component={Order}/>
                    <Route path="/user" component={User}/>
                    <Route path="/bikeMap" component={BikeMap}/>
                    <Route path="/charts/bar" component={Bar}/>
                    <Route path="/charts/pie" component={Pie}/>
                    <Route path="/charts/line" component={Polyline}/>
                    <Route path="/permission" component={Permission}/>
                    {/* <Route component={NoMatch}/> */}
                    <Redirect to="/home"/>
                  </Switch>
                </App>
              } />
          </Switch>
        </Fragment>
      </HashRouter>
    )
  }
}