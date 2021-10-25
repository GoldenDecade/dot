
const express = require('express')
const app = express()
const port = 3000

let count = 0;
app.get('/', (req, res) => {
  console.log('///');
  res.header("Access-Control-Allow-Origin", "*");
  res.send('Hello World!')
})

app.get('/a', (req, res) => {
  console.log('/a');
  setTimeout(() => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send('Hello a!')
  }, 3000)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
