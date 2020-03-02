/** @format */
const { TestCheckerService } = require('./TestCheckerService')

class RunnerService {
  constructor(Runners, language, taskId) {
    const Runner = this._getRunner(Runners, language)
    this.runner = new Runner()
    this.checker = new TestCheckerService()
    this.taskId = taskId
  }

  _getRunner(Runners, language) {
    const runner = Runners[`${language}Runner`]

    if (runner === undefined) {
      throw { message: 'Unsupported language' }
    }

    return runner
  }

  async runTask(programText) {
    const result = await this.runner.runProgram(programText)

    const testResult = await this.checker.runTest(result.output, this.taskId)

    return { ...result, testResult }
  }
}

module.exports = { RunnerService }
