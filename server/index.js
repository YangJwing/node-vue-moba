/*
 * @作者: Edwin Yeung
 * @Date: 2020-06-05 23:13:18
 * @修改人: Edwin Yeung
 * @LastEditTime: 2020-06-09 11:39:15
 * @描述: 
 */ 
const express = require('express')

const app =express()

app.use(require('cors')())
app.use(express.json())
app.use('/uploads',express.static(__dirname + '/uploads'))

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000,()=>{
    console.log('http://localhost:3000')
})
