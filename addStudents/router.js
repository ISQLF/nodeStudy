/**
 * Created by QLF on 2018/5/5.
 */

var fs = require('fs')
var url = require('url')
var express = require('express')
var students = require('./students')

var router = express.Router()

router.get('/', function (req, res) {
    students.find(function (err, students) {
        if (err) {
            return res.status(500).send('Server error...')
        }
        res.render('index.html', {
            students: students
        })
    })

})
router.get('/students/new', function (req, res) {
    res.render('new.html')
})

router.post('/students/new', function (req, res) {
    students.save(req.body, function (err) {
        if (err) {
            // 错误就是把错误对象传递给它
            return res.status(500).send('Server error.')
        }

        res.redirect('/')
    })
})

router.get('/students/edit', function (req, res) {
    var pathObj = url.parse(req.url, true)

    //通过id获取到学生信息
    console.log(pathObj.query)
    students.findId(pathObj.query.id, function (err, student) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

router.post('/students/edit', function (req, res) {
    students.update(req.body, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/')
    })
})

router.get('/students/delete', function (req, res) {
    var pathObj = url.parse(req.url, true)

    students.delete(pathObj.query.id, function (err) {
        if (err) {
            return res.status(500).send('Server error.')
        }
        res.redirect('/')

    })
})

module.exports = router