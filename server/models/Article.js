/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-06 00:32:16
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-10 21:38:10
 * @描述: 
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { type: String },
    body: { type: String },
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Catetory'}],
})

module.exports = mongoose.model('Article', schema)