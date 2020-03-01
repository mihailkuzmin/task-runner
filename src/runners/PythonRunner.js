/** @format */

const util = require('util')
const cp = require('child_process')
const exec = util.promisify(cp.exec)
const path = require('path')
const fs = require('fs')

class PythonRunner {
  async runProgram(programText) {
    const filePath = await this._createInputFile(programText)
    const result = await this._run(filePath)

    return result
  }

  async _run(filePath) {
    const result = await exec(`python3 ${filePath}`)

    return result.stdout
  }

  async _createInputFile(programText) {
    const fileName = `${Date.now()}.py`
    const filePath = `${path.resolve(__dirname, '../temp/python')}/${fileName}`

    await fs.promises.writeFile(`${filePath}`, programText)
    return filePath
  }
}

module.exports = PythonRunner
