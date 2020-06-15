/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-06 00:32:16
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-12 23:02:33
 * @描述: 
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password: {
        type: String,
        select: false,  //不显示出来
        set(val) {
            return require('bcrypt').hashSync(val, 10)
        }
    },
})

module.exports = mongoose.model('AdminUser', schema)