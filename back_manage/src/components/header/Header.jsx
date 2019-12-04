import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import  './Header.less'
import storageUtils from '../../utils/storageUtils'
import { Modal, Button } from 'antd';
import {reqWeather} from '../../api'
import menusConfig from '../../config/menusConfig'
const { confirm } = Modal;
class Header extends Component {

    state = {
        currentTime:new Date().toLocaleString(),  //currentTime 存放最新的时间
        weatherInfo:{},  //存储天气的信息
    }
    UNSAFE_componentWillMount(){
        this.user = storageUtils.getUser()
    }
    componentDidMount(){
        this.getCurrentTime()
        this.getWeather()
        this.getTitle()
    }
    getWeather = async ()=>{
       const result = await reqWeather('北京')
        this.setState({weatherInfo:result})
    }

    //该方法返回的结果就是 Header组件的标题
    getTitle = ()=>{
        const {pathname} = this.props.location
        // console.log(menusConfig.filter(item => {
        //     return pathname === item.key
        // }))
        let title = '';//存放标题
        menusConfig.forEach(item=>{
            //如果是从一级菜单的key中找到和pathname一致的
            if(pathname===item.key)title = item.title
            if(item.children){  //如果是从二级菜单的key中找到和pathname一致的
                const result = item.children.find(cItem=>pathname === cItem.key)
                if(result) title = result.title
            }

        })
        return title

    }

    //启动一个定时器  每隔1s获取设置最新的时间
    getCurrentTime = ()=>{
        setInterval(()=>{
            this.setState({currentTime:new Date().toLocaleString()})
        },1000)
    }
    //退出登录
    loginOut = ()=>{
        confirm({
            title: '确定退出吗?',
            onOk:()=>{ //点击ok按钮  退出登录状态 路径变成/login  删除本地存储的用户数据// console.log('OK');
                // console.log(this)
                storageUtils.removeUser()
                this.props.history.push('/login')
            },
            onCancel() { //点击cancel按钮
                console.log('Cancel');
            },
        });
    }

    render() {
        const {currentTime,weatherInfo} = this.state
        const {dayPictureUrl,temperature,wind,weather} = weatherInfo
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{this.user.username}</span>
                    <Button onClick={this.loginOut}>退出</Button>
                </div>
                <div className="header-bottom">
                    <span className="header-bottom-left">{this.getTitle()}</span>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="" />
                        <span>{weather}</span>
                        <span>{temperature}</span>
                        <span>{wind}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header)

