//api路由
//userApi.js —— 测试用 API 示例

var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1', msg: '操作失败'
        });
    }
    else {
        res.json(
            ret
        );
    }
};
// 增加用户接口
// router.post('/addUser', (req, res) => {
//     var sql = $sql.user.add;
//     var params = req.body;
//     console.log(params);
//     conn.query(sql, [params.username, params.password], function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//         if (result) {
//             jsonWrite(res, result);
//         }
//     })
// });

router.get('/query', (req, res) => {
    conn.query('select * from parksdetails ORDER BY ID ASC', function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});

router.get('/queryRank', (req, res) => {
    conn.query('select * from parksdetails ORDER BY AREA DESC', function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});

router.get('/queryScoreRank', (req, res) => {
    conn.query('select * from parksdetails ORDER BY SCORE DESC', function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});

router.get('/PolygonSelect', (req, res) => {
    //从前端请求中获取参数
    const parameter = req.query.parameter;
    //处理得到的字符串，书写正确的sql语句
    const parameterString = "'" + parameter.join("','") + "'";
    const sqlQuery = `SELECT * FROM parksdetails WHERE NAME IN (${parameterString})`;
    conn.query(sqlQuery, function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        console.log(data)
        res.end(data)
    })
});

router.get('/PointSelect', (req, res) => {
    //从前端请求中获取参数
    const parameter = req.query.parameter;
    const sqlQuery = `SELECT * FROM parksdetails WHERE NAME='${parameter}'`;
    conn.query(sqlQuery, function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        console.log(data)
        res.end(data)
    })
});

router.get('/ProvinceSelect', (req, res) => {
    //从前端请求中获取参数

    const parameter = req.query.parameter;
    console.log("parameter", parameter)
    const sqlQuery = `SELECT * FROM parksdetails WHERE PROVINCE='${parameter}'`;
    conn.query(sqlQuery, function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        console.log(data)
        res.end(data)
    })
});

router.get('/comments', (req, res) => {
    conn.query('select * from huangshan2', function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});

router.get('/notes', (req, res) => {
    const parameter = req.query.parameter;
    console.log("parameter", parameter)
    const final = "`" + `${parameter}` + "`"
    conn.query(`select * from ${final}`, function (err, row) {
        if (err) {
            console.log(err)
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});



// router.get('/query1',(req,res)=>{
//     conn.query('select * from user1',function(err,row){
//         if(err){
//              console.log(err)            
//         }
//         console.log(typeof row)
//         let data = JSON.stringify(row)
//         res.end(data)
//     })
// });

module.exports = router;

