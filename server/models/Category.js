/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-06 00:32:16
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-26 17:33:13
 * @描述: 
 */ 
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name:{type : String},
    parent:{type:mongoose.SchemaTypes.ObjectId,ref:'Category'},
})

// 虚拟字段
schema.virtual('children',{
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList',{
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

module.exports = mongoose.model('Category',schema)