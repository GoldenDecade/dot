// 数据库的配置
const devConfig = {
    host: 'localhost',
    database: 'ts',
    user: 'root',
    password: 'root1234',
    port: '3306'
}
const prodConfig = {
    host: 'xxx',
    database: 'ts',
    port: '3306',
    user: 'root',
    password: 'root1234'
}
module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
