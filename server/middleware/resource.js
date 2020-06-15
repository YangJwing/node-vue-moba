/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-16 00:50:05
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-16 00:58:36
 * @描述: 
 */ 
module.exports = options => {
    return async (req, res, next) => {
        // inflection 可以把复数转为类名形式,转换以后用这个拼接模型的路径
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}