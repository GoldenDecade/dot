// 创建 images table;  图片上传 需要filed:  id  file_key file_name
module.exports = sql => {
    sql.query(
        `SELECT table_name FROM information_schema.TABLES WHERE table_name="image"`,
        (err, res) => {
            // 如果这个表已存在就 return
            if(res.length) return
            // 如果这个表不存在, 那么新建 image 表
            sql.query(
                `CREATE TABLE 'image' (
                    'id' INT NOT NULL AUTO_INCREMENT,
                    'file_key' VARCHAR(45) NOT NULL,
                    'file_name' VARCHAR(45) NOT NULL,
                    PRIMARY KEY ('id')
                )`
            )
        }
    )
}
