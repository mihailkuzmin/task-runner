/** @format */

const express = require('express')
const app = express()
const routes = require('./routes')

const PORT = 5000

app.use(express.json({ limit: '5mb' }))
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`task-runner: listening at ${PORT}`)
})
