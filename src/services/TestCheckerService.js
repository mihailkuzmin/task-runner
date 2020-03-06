/** @format */

const fs = require('fs')
const path = require('path')

class TestCheckerService {
  async runTest({ output, taskId }) {
    const validResult = await this._getValidResult(taskId)
    const passed = output === validResult
    return {
      passed,
      validResult,
    }
  }

  async _getValidResult(taskId) {
    const filePath = `${path.resolve(__dirname, `../tests/${taskId}.txt`)}`
    const output = await fs.promises.readFile(filePath, 'utf-8')
    return output
  }
}

module.exports = { TestCheckerService }
