//加载mysql
const mysql = require('./db');
//加载body-parser处理post请求
const bodyParser = require('body-parser');
//使用express创建服务器
const express = require('express');
const multer = require('multer');
//加载express-session模块
const session = require('express-session');
const upload = multer({
    dest: 'uploads/'
})
const app = express();
app.listen(3000, () => {
    console.log("服务开启了")
});
// 配置session
app.use(session({
    secret: 'asdfasfd23f', // 秘钥，可以随便填
    resave: false, // 其实这项不用指定。但是不指定会给一个提示，提示该项没有默认值
    saveUninitialized: true, // 其实这项不用指定。但是不指定会给一个提示，提示该项没有默认值
    cookie: {
        maxAge: 3600000
    } // session的过期时间。设置上也没用
    // session默认保存到内存中了，只要服务器重启，session全部丢失了
    // 正常的开发，session都需要保存到文件中、数据库中、缓存中（memcache、Redis、MongoDB）
}))

//处理静态资源
//设置如果用户没有登录除了注册页面,以及登录页面,其他页面不让访问的功能
//自定义中间件
app.use(express.static('uploads'));
app.use('/lib', express.static('manager/lib'));
app.use('/images', express.static('manager/images'));
app.use((req, res, next) => {
    if (req.url.endsWith('.html')) {
        if (req.url === "/login.html" || req.url === "/register.html") {
            res.sendFile(__dirname + '/manager' + req.url);
        } else {
            if (req.session.isLogin) {
                res.sendFile(__dirname + '/manager' + req.url)
            } else {
                res.send('<script>alert("您好,请先登录在访问"); location.href="/login.html"</script>')
            }
        }
    } else {
        next();
    }

});

//处理post请求
app.use(bodyParser.urlencoded({
    extended: false
}));

//1.获取数据
app.get('/getMsg', (req, res) => {
    let keywords = req.query.keywords;
    let page = req.query.page || 1;
    let pagesNum = 5;
    let keySql = "";
    if (keywords != "") {
        keySql = " where name like '%" + keywords + "%' " + " or nickname like '%" + keywords + "%'";
    }
    let selectSql = 'select * from heroes' + keySql + ' order by id desc limit ' + (page - 1) * pagesNum + "," + pagesNum;
    selectSql += ';select count(*) count from heroes' + keySql;
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
    const vcode = req.body.vcode.toUpperCase();
    if (vcode != req.session.captcha.toUpperCase()) {
        res.send({
            code: 220,
            msg: "验证码错误"
        });
    } else {
        mysql(loginSql, [username, password], (err, result) => {
            if (result.length > 0) {
                //将登录成功的状态存在session中,此状态为了以后访问页面的权限使用
                req.session.isLogin = true;
                res.send({
                    code: 200,
                    msg: "登录成功"
                });
            } else {
                res.send({
                    code: 210,
                    msg: "用户名或密码错误"
                });
            }
        })
    }

});

//6.获取指定id的数据
app.get('/getMsgById', (req, res) => {
    var id = req.query.id;
    if (!id || isNaN(id)) {
        res.send("参数错误");
        return;
    }
    let selectSql = 'select * from heroes where id = ?';
    mysql(selectSql, id, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

//7.保存修改数据
app.post('/saveEditMsg', upload.single('heroIcon'), (req, res) => {
    //upload.single() 文件域的name值
    let insertSql = 'update heroes set ? where id =?';
    let values = {
        name: req.body.heroName,
        nickname: req.body.heroNickName,
        skill: req.body.skillName,
    }
    // 判断图像是否修改了
    // console.log(req.file); // 如果没选择头像，req.file 的值为 undefined
    if (req.file != undefined) {
        values.file = req.file.filename;
    }
    mysql(insertSql, [values, req.body.id], (err, result) => {
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

//8.实现提供验证码的一个接口
const svgCaptcha = require('svg-captcha');
app.get('/getSvgCaptcha', (req, res) => {
    //创建
    const captcha = svgCaptcha.create();
    //将生成的数据保存起来,存入到session中,为了登录之后进行比较
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});