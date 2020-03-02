/** @format */

const router = require('express').Router()
const Runners = require('./runners')
const { RunnerService, TestCheckerService } = require('./services')

router.post('/process', async (req, res) => {
  try {
    const { language, programText, taskId } = req.body
    const runner = new RunnerService(Runners, language)
    const checker = new TestCheckerService()

    const result = await runner.runTask(programText)
    const testResult = await checker.runTest(result.output, taskId)

    res.send({ ...result, testResult })
  } catch (e) {
    res.status(500).send({
      error: 'Internal server error',
    })
  }
})

router.post('/processAll', async (req, res) => {
  try {
    const { programs } = req.body
    
    const tasks = programs.map(({language, programText}) => {
      const runner = new RunnerService(Runners, language)
      return runner.runTask(programText)
    })

    const result = await Promise.all(tasks)

    res.send(result)
  } catch (e) {
    console.log(e)
    res.status(500).send({
      error: 'Internal server error',
    })
  }
})

module.exports = router
