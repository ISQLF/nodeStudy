/**
 * Created by QLF on 2018/5/6.
 */

var fs = require('fs')
var dbPath = './db.json'
//获取学生列表
exports.find = function (callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        callback(null, JSON.parse(data).students)
    })
}
//通过id获取学生列表
exports.findId = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        for (var i = 0; i < students.length; i++) {
            if (students[i].id == id) {
                var student = students[i]
                callback(null, student)
            }
        }
    })
}
//保存学生信息
exports.save = function (student, callback) {

    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        if(students.length == 0)
        {
            student.id=1
        }
        // 添加 id ，唯一不重复
        else{
            student.id = students[students.length - 1].id + 1
        }


        // 把用户传递的对象保存到数组中
        students.push(student)

        // 把对象数据转换为字符串
        var fileData = JSON.stringify({
            students: students
        })

        // 把字符串保存到文件中
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}
//删除学生信息（id）
exports.delete = function (id, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        for (var i = 0; i < students.length; i++) {

            if (students[i].id === parseInt(id)) {
               for(var j=i;j<students.length-1;j++){
                  students[j]=students[j+1]
                   //后一个覆盖前一个，下标不要超出范围不然报错（students[i].id is undefined）
               }
               students.pop() //删除最后一个
            }
        }

        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                // 错误就是把错误对象传递给它
                return callback(err)
            }
            // 成功就没错，所以错误对象是 null
            callback(null)
        })
    })
}
//编辑学生信息
exports.update = function (student, callback) {
    fs.readFile(dbPath, 'utf8', function (err, data) {
        if (err) {
            return callback(err)
        }
        var students = JSON.parse(data).students
        for (var i = 0; i < students.length; i++) {
            if (students[i].id == student.id) {
                students[i] = student
                students[i].id = parseInt(student.id)
            }
        }

        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dbPath, fileData, function (err) {
            if (err) {
                return callback(err)
            }
            callback(null)
        })
    })
}
