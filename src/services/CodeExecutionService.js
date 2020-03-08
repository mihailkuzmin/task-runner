/** @format */

class CodeExecutionService {
  constructor(Runners, TestChecker) {
    this._Runners = Runners
    this._testChecker = new TestChecker()
  }

  async runTasks(tasks) {
    const runningTasks = tasks.map((t) => this.runTask(t))
    const result = await Promise.all(runningTasks)
    return result
  }

  async runTask({ language, programText, taskId }) {
    const runner = this._createRunner({ language })
    const { ok, output, error } = await runner.runProgram(programText)

    if (!ok) {
      return { ok, error }
    }

    const testResult = await this._runTest({ output, taskId })
    return { ok, output, testResult }
  }

  async _runTest({ output, taskId }) {
    const testResult = await this._testChecker.runTest({ output, taskId })
    return testResult
  }

  _createRunner({ language }) {
    const Runner = this._Runners[language]
    if (Runner === undefined) {
      throw Error(`Unsupported language: ${language}`)
    }

    const runner = new Runner()
    return runner
  }

  getAvailableLanguages() {
    const languages = Object.keys(this._Runners)
    return languages
  }
}

module.exports = { CodeExecutionService }
