/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-06 00:32:16
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-10 22:59:30
 * @描述: 
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    items: [{
        image: { type: String },
        url: { type: String }
    }],
})

module.exports = mongoose.model('Ad', schema)