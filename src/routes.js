/** @format */

const router = require('express').Router()
const Runners = require('./runners')
const { RunnerService } = require('./services')

router.post('/process', async (req, res) => {
  try {
    const { language, programText, taskId } = req.body
    const runner = new RunnerService(Runners, language, taskId)

    const result = await runner.runTask(programText)

    res.send(result)
  } catch (e) {
    res.status(500).send({
      error: 'Internal server error',
    })
  }
})

router.post('/processAll', async (req, res) => {
  try {
    const { programs } = req.body

    const tasks = programs.map(({ language, programText, taskId }) => {
      const runner = new RunnerService(Runners, language, taskId)
      return runner.runTask(programText)
    })

    const result = await Promise.all(tasks)

    res.send(result)
  } catch (e) {
    res.status(500).send({
      error: 'Internal server error',
    })
  }
})

module.exports = router
