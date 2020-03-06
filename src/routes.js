/** @format */

const router = require('express').Router()
const RunnersList = require('./runners')
const { CodeExecutionService, TestCheckerService } = require('./services')

router.post('/process', async (req, res) => {
  try {
    const { language, programText, taskId } = req.body

    const runner = new CodeExecutionService(RunnersList, TestCheckerService)
    const result = await runner.runTask({ language, programText, taskId })

    res.send(result)
  } catch (e) {
    res.status(500).send({
      ok: false,
      error: 'Internal server error',
    })
  }
})

router.post('/processAll', async (req, res) => {
  try {
    const { tasks } = req.body

    const runner = new CodeExecutionService(RunnersList, TestCheckerService)
    const result = await runner.runTasks(tasks)

    res.send(result)
  } catch (e) {
    res.status(500).send({
      ok: false,
      error: 'Internal server error',
    })
  }
})

module.exports = router
