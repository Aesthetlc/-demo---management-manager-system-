//加载body-parser处理post请求
const bodyParser = require('body-parser');
//使用express创建服务器
const express = require('express');

//加载express-session模块
const session = require('express-session');

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

//导入路由文件，并注册成中间件
app.use(require('./router/heros'))
app.use(require('./router/login'))