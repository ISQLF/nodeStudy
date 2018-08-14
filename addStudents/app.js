/**
 * Created by QLF on 2018/5/5.
 */

var express = require('express')
var router = require('./router')
var bodyParser= require('body-parser')


var app = express()

app.use('/node_modules/', express.static('./node_modules/'))
app.use('/public/', express.static('./public/'))
app.engine('html', require('express-art-template'))

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 把路由容器挂载到 app 服务中
app.use(router)

app.listen(3000,function () {
    console.log('running 3000......')
})

