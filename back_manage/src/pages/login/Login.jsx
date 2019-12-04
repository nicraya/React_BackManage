import React, {Component} from 'react'
import {Form, Icon, Input, Button, message} from 'antd'
import {reqLogin} from '../../api'
import './login.less'
import storgeUtils from '../../utils/storageUtils'
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
          if (!err) {   //若通过前台验证，通过axios把信息发给后台
            const result = await reqLogin(values)
            const {msg,data,status} = result
            if(status===0){
                //如果用户登录成功  才跳转到/admin
                //如果人为在地址栏中输入/admin   是不可以跳转到/admin
                //解决方案  登录成功就把用户的信息存放到本地
                storgeUtils.saveUser(data)
                message.success(msg);
                this.props.history.push('/admin')
            }else{
                message.error(msg);
            }
          }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login-form'>
                <h2 className='login-title'>React后台管理系统</h2>
                <Form>
                    <Form.Item>
                        {getFieldDecorator('username',{
                            rules: [
                                { required: true, message: 'Please input your username!' },
                                { min: 5, message: '用户名最少为5位'},
                                { max: 12, message: '用户名最多为12位'}
                            ],
                        })(
                            <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                            />
                        )}
                        
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your Password!' },
                                { min: 6, message: '密码最少为6位'},
                                { max: 12, message: '密码最多为12位'}
                            ],
                        })(
                            <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button 
                            type='primary'
                            htmlType='submit'
                            block
                            onClick={this.handleSubmit}
                            className='login-form-button'>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>               
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm
