/** @format */

const router = require('express').Router()
const Runners = require('./runners')
const { RunnerService } = require('./services')

router.post('/process', async (req, res) => {
  try {
    const { language, programText } = req.body
    const runner = new RunnerService(Runners, language)

    const result = await runner.runTask(programText)

    res.send(result)
  } catch (e) {
    res.status(500).send({
      error: 'Internal server error',
    })
  }
})

module.exports = router
