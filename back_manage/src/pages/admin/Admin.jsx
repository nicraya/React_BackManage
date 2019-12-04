import React, {Component} from 'react'
import { Layout } from 'antd';
import {Redirect,Switch,Route} from 'react-router-dom'
import storageUtils from '../../utils/storageUtils'
import LeftNav from '../../components/leftnav/LeftNav'
import Header from '../../components/header/Header'
import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import User from '../user/User'
import Role from '../role/Role'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'

const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        //只要是加载Admin组件 就读取本地的用户信息
        // 如果本地没有该用户的信息 就重定向到/login
        // 如果本地有该用户的信息 就加载Admin组件
        const user = storageUtils.getUser()
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return (
            <div style={{height:'100%'}}>
                <Layout style={{height:'100%'}}>
                    <Sider>
                        <LeftNav/>
                    </Sider>
                    <Layout>
                        <Header/>
                        <Content>
                            <Switch>
                                <Route path='/admin/home' component={Home}/>
                                <Route path='/admin/category' component={Category}/>
                                <Route path='/admin/product' component={Product}/>
                                <Route path='/admin/user' component={User}/>
                                <Route path='/admin/role' component={Role}/>
                                <Route path='/admin/charts/bar' component={Bar}/>
                                <Route path='/admin/charts/line' component={Line}/>
                                <Route path='/admin/charts/pie' component={Pie}/>
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
