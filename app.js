//加载mysql
const mysql = require('./db');
//加载body-parser处理post请求
const bodyParser = require('body-parser');
//使用express创建服务器
const express = require('express');
const app = express();
app.listen(3000, () => {
    console.log("服务开启了")
});

//处理静态资源
app.use(express.static('manager'));

//处理post请求
app.use(bodyParser.urlencoded({
    extended: false
}));

//获取数据
app.get('/getMsg', (req, res) => {
    let selectSql = 'select id,file,name,skill from heroes order by id limit 10';
    mysql(selectSql, null, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// 删除数据
app.get('/delMsg', (req, res) => {
    let deleteSql = 'delete from heroes where id=?';
    mysql(deleteSql, req.body.deleteId, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// //修改数据
// let updateSql = 'update heroes set ? where id=?';
// let values = {
//     name:?,
//     skill:?,
//     file:uploads\8c725103a570c3163a4c2b61f412e7a8,
// }
// app.post('/editMsg', (req, res) => {
//     mysql(updateSql, , (err, result) =>{
//         if (err) throw err;
//         res.send(result);
//     })
// });