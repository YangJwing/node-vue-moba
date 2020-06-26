/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-06 00:32:16
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-26 22:03:26
 * @描述: 
 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    title: { type: String },
    body: { type: String },
}, {
    timestamps: true        // 插入时间戳
})

module.exports = mongoose.model('Article', schema)