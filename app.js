//加载mysql
const mysql = require('./db');
//加载body-parser处理post请求
const bodyParser = require('body-parser');
//使用express创建服务器
const express = require('express');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
})
const app = express();
app.listen(3000, () => {
    console.log("服务开启了")
});

//处理静态资源
app.use(express.static('manager'));
app.use(express.static('uploads'));

//处理post请求
app.use(bodyParser.urlencoded({
    extended: false
}));

//1.获取数据
app.get('/getMsg', (req, res) => {
    let selectSql = 'select * from heroes order by id desc limit 10';
    mysql(selectSql, null, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//2.删除数据
app.get('/delMsg', (req, res) => {
    let deleteSql = 'delete from heroes where id=?';
    mysql(deleteSql, req.query.deleteId, (err, result) => {
        if (err) throw err;
        res.send({
            code: 200,
            msg: "删除失败"
        });
    });
});

//3.新增英雄数据
app.post('/addMsg', upload.single('heroIcon'), (req, res) => {
    console.log(req.body);
    //upload.single() 文件域的name值
    let insertSql = 'insert into heroes set ?';
    let values = {
        name: req.body.heroName,
        nickname: req.body.heronickName,
        skill: req.body.skillName,
        file: req.file.filename,
    }
    mysql(insertSql, values, (err, result) => {
        if (err) {
            res.send({
                code: 210,
                msg: '添加失败'
            });
        } else {
            res.send({
                code: 200,
                msg: '添加成功'
            });
        }

    })
});

//4.注册
app.post('/register', (req, res) => {
    let registerSql = "insert into user set ?"
    //方式1
    /*  let values = {
        username:req.body.name,
        password:req.body.password
    } */
    //方式2
    // 直接传入req.body
    mysql(registerSql, req.body, (err, result) => {
        if (err) {
            res.send({
                code: 210,
                msg: "注册失败"
            });
        } else {
            res.send({
                code: 200,
                msg: "注册成功"
            })
        }
    });
});

//5.登录
app.post('/login', (req, res) => {
    let loginSql = "select * from user where username = ? and password = ?"
    const username = req.body.username;
    const password = req.body.password;
    mysql(loginSql, [username,password], (err, result) => {
        if (result.length > 0) {
            res.send({
                code: 200,
                msg: "登录成功"
            });
        } else {
            res.send({
                code: 210,
                msg: "登录失败"
            });
        }
    })
});