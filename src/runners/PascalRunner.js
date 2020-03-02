/** @format */

const util = require('util')
const cp = require('child_process')
const exec = util.promisify(cp.exec)
const path = require('path')
const fs = require('fs')

class PascalRunner {
  async runProgram(programText) {
    const filePath = await this._createInputFile(programText)
    const compiledFilePath = await this._compileProgram(filePath)
    const { stderr, stdout } = await this._run(compiledFilePath)

    if (stderr) {
      return {
        ok: false,
        error: stderr,
      }
    }

    return {
      ok: true,
      output: stdout,
    }
  }

  async _compileProgram(sourceFilePath) {
    await exec(`pabcnetc ${sourceFilePath}`)
    const filePath = this._getCompiledFilePath(sourceFilePath)
    return filePath
  }

  async _run(compiledFilePath) {
    const { stdout, stderr } = await exec(`mono ${compiledFilePath}`)

    return { stdout, stderr }
  }

  _getCompiledFilePath(sourceFilePath) {
    const parsed = path.parse(sourceFilePath)

    const compiledFileName = `${parsed.name}.exe`
    const compiledFilePath = `${parsed.dir}/${compiledFileName}`

    return compiledFilePath
  }

  async _createInputFile(programText) {
    const fileName = `${Date.now()}.pas`
    const dirPath = path.resolve(__dirname, '../temp/pascal')
    const filePath = `${dirPath}/${fileName}`

    try {
      await fs.promises.writeFile(`${filePath}`, programText)
      return filePath
    } catch (e) {
      const notExists = e.code === 'ENOENT'
      if (notExists) {
        await fs.promises.mkdir(dirPath)
        await fs.promises.writeFile(`${filePath}`, programText)
        return filePath
      }

      return e
    }
  }
}

module.exports = { PascalRunner }
