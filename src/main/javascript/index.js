const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
