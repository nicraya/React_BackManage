import React, {Component} from 'react';
import { Menu, Icon } from 'antd';
import {NavLink,withRouter} from 'react-router-dom'
import menusConfig from '../../config/menusConfig'
const { SubMenu } = Menu;

class LeftNav extends Component {
    UNSAFE_componentWillMount(){
        //初始化菜单栏的结构  因为初始化是同步的 所以放在该钩子中
        this.menus = this.getMenus(menusConfig)
    }
    getMenus = (menus)=>{
        const {pathname} = this.props.location
        return menus.map(item=>{
            if(item.children){  //如果是可收缩的选项
                //从有子菜单中寻找初始打开的一级菜单
                const result =  item.children.filter(cItem=>pathname===cItem.key)
                if(result.length){  //如果在有children的数组中找到了匹配pathname的key值
                    this.defaultOpenKeys = item.key
                }
                return  <SubMenu
                    key={item.key}
                    title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}
                >
                    {this.getMenus(item.children)}
                </SubMenu>
            }else{  //如果是不可收缩的选项
                return <Menu.Item key={item.key}>
                    <NavLink to={item.key}>
                        <Icon type={item.icon}/>
                        <span>{item.title}</span>
                    </NavLink>
                </Menu.Item>
            }
        })
    }
    render() {
        const {pathname} = this.props.location
        return (          
            <div>
                <Menu
                    defaultSelectedKeys = {[pathname]}
                    defaultOpenKeys = {[this.defaultOpenKeys]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menus}
                </Menu>        
            </div>
        )   
    }
}

//使用withRouter 高阶组件让非路由组件 具有路由组件的三个属性 history location match
export default withRouter(LeftNav)
