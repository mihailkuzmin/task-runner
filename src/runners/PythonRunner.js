/** @format */

const util = require('util')
const cp = require('child_process')
const exec = util.promisify(cp.exec)
const path = require('path')
const fs = require('fs')

class PythonRunner {
  async runProgram(programText) {
    const filePath = await this._createInputFile(programText)
    const { stderr, stdout } = await this._run(filePath)

    if (stderr) {
      return {
        ok: false,
        error: stderr,
      }
    }

    return {
      ok: true,
      result: stdout,
    }
  }

  async _run(filePath) {
    try {
      const { stdout, stderr } = await exec(`python3 ${filePath}`)
      return { stdout, stderr }
    } catch (e) {
      const { stdout, stderr } = e
      return { stdout, stderr }
    }
  }

  async _createInputFile(programText) {
    const fileName = `${Date.now()}.py`
    const filePath = `${path.resolve(__dirname, '../temp/python')}/${fileName}`

    await fs.promises.writeFile(`${filePath}`, programText)
    return filePath
  }
}

module.exports = PythonRunner
