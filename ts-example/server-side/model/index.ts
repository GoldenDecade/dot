const mysql = require('mysql')
const mysqlConfig = require('../config/mysql.config')

const sql = mysql.createConnection(mysqlConfig)
sql.connect()

// 连接成功之后就建表
require('./tables/image')(sql)

export = sql
