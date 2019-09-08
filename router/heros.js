//存放英雄处理的相关接口
const mysql = require('../db');
const multer = require('multer');
const upload = multer({
    dest: 'uploads/'
})

//使用路由文件的步骤
//一。加载express
const expres = require('express');
//二。创建路由对象
const router = expres.Router();
//三。将所以有的接口挂载到路由对象上
//四。导出路由对象

//五。app.js中，导入路由模块，并注册成中间件

//1.获取数据
router.get('/getMsg', (req, res) => {
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
router.get('/delMsg', (req, res) => {
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
router.post('/addMsg', upload.single('heroIcon'), (req, res) => {
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



//4.获取指定id的数据
router.get('/getMsgById', (req, res) => {
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

//5.保存修改数据
router.post('/saveEditMsg', upload.single('heroIcon'), (req, res) => {
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

module.exports = router;