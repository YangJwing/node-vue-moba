/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-16 00:44:00
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-16 00:56:47
 * @描述: 
 */ 

const jwt = require('jsonwebtoken')
const assert = require('http-assert')
const AdminUser = require("../models/AdminUser");

module.exports = options =>{
    return async (req, res, next) => {
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录!')
        const { id } = jwt.verify(token, req.app.get('secret'))     // 解释token得到id,并最终找到用户
        assert(id, 401, '请先登录!!')
        req.user = await AdminUser.findById(id)                 // 要挂载到req上,否则后续请求访问不到
        assert(req.user, 401, '请先登录!!!')
        await next()
    }
}