function db(sql, values, cb) {
    // 1.加载mysql模块
    const mysql = require('mysql');
    // 2.创建连接对象，设置连接参数
    const conn = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'heroes',
        multipleStatements: true,
    });
    // 3.连接mysql数据库
    conn.connect();
    // 4.查询
    conn.query(sql, values, cb)
    // 5.关闭连接
    conn.end();
}

//模块到出
module.exports = db;