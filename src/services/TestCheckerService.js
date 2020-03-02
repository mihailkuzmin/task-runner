/** @format */

const fs = require('fs')
const path = require('path')

class TestCheckerService {
  async runTest(output, taskId) {
    const testOutput = await this._getTestOutput(taskId)
    return {
      passed: output === testOutput,
      testOutput,
    }
  }

  async _getTestOutput(taskId) {
    const filePath = `${path.resolve(__dirname, `../tests/${taskId}.txt`)}`

    const output = await fs.promises.readFile(filePath, 'utf-8')
    return output
  }
}

module.exports = { TestCheckerService }
