var express = require('express');
var router = express.Router();

import apis = require('../controller/api')
// 接口
router.post('/file_upload', async (req, res, next) => {
    try {
        await apis.upload(req)
        res.send('success')
    }catch (err) {
        res.send('error')
    }
})

router.get('/list', async (req, res, next) => {
    try {
        const result = await apis.getList()
        res.send(result)
    }catch (err) {
        res.send(err)
    }
})

module.exports = router;
