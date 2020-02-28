/** @format */

class RunnerService {
  constructor(Runners, language) {
    const Runner = this._getRunner(Runners, language)
    this.runner = new Runner()
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

    return {
      output: `${result}`,
    }
  }
}

module.exports = RunnerService
