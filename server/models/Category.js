/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-06 00:32:16
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-07 12:47:24
 * @描述: 
 */ 
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type : String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
})

module.exports = mongoose.model('Category',schema)