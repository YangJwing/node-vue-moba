/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-06 00:27:03
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-25 14:00:45
 * @描述: 
 */
module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://192.168.0.3:27017/node-vue-moba', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    
    // 全部引用一遍模型
    require('require-all')(__dirname + '/../models')
}