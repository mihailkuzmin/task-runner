/** @format */

const router = require('express').Router()
const Runners = require('./runners')
const { RunnerService } = require('./services')

router.post('/process', async (req, res) => {
  const { language, programText } = req.body
  const runner = new RunnerService(Runners, language)

  const result = await runner.runTask(programText)

  res.send(result)
})

module.exports = router
