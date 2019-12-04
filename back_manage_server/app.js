const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')
const app = new Koa()
const router = new Router()

const Users = require('./schema/userSchema')

app.use(bodyParser())
app.use(static('./public'))
app.use(router.routes())

router.post('/login',async cxt=>{
    // console.log(cxt.request.body)
    const {username,password} = cxt.request.body
    const user = await Users.findOne({username,password})
    if(user){
        cxt.body = {
            status:0,
            data:user,
            msg:'用户登录成功'
        }
    }else{
        cxt.body = {
            status:1,
            msg:'用户登录失败'
        }   
    }
})


//连接27019下的backManage数据库
mongoose.connect('mongodb://localhost:27019/backManage',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('27019数据库连接成功')
    app.listen(6006,()=>{
        console.log('6006端口启动成功')
    })
}).catch(()=>{
    console.log('数据库连接失败')
})