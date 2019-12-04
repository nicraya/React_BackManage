const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    create_time:{ type: String, default:new Date() }
})

//backManage数据库下的users 使用userSchema这个数据格式
module.exports = mongoose.model('users',userSchema)