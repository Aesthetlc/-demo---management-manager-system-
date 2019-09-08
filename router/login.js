const express = require('express');
const router = express.Router();
const mysql = require('../db');


//1.注册
router.post('/register', (req, res) => {
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

//2.登录
router.post('/login', (req, res) => {
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

//3.实现提供验证码的一个接口
const svgCaptcha = require('svg-captcha');
router.get('/getSvgCaptcha', (req, res) => {
    //创建
    const captcha = svgCaptcha.create();
    //将生成的数据保存起来,存入到session中,为了登录之后进行比较
    req.session.captcha = captcha.text;
    res.type('svg');
    res.status(200).send(captcha.data);
});

module.exports = router;