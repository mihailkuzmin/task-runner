/** @format */

const cp = require('child-process-promise')
const path = require('path')
const fs = require('fs')

class PascalRunner {
  async runProgram(programText) {
    const filePath = await this._createInputFile(programText)
    const compiledFilePath = await this._compileProgram(filePath)
    const result = await this._run(compiledFilePath)

    return result
  }

  async _compileProgram(sourceFilePath) {
    await cp.exec(`pabcnetc ${sourceFilePath}`)
    const filePath = this._getCompiledFilePath(sourceFilePath)
    return filePath
  }

  async _run(compiledFilePath) {
    const result = await cp.exec(`mono ${compiledFilePath}`)

    return result.stdout
  }

  _getCompiledFilePath(sourceFilePath) {
    const parsed = path.parse(sourceFilePath)

    const compiledFileName = `${parsed.name}.exe`
    const compiledFilePath = `${parsed.dir}/${compiledFileName}`

    return compiledFilePath
  }

  async _createInputFile(programText) {
    const fileName = `${Date.now()}.pas`
    const filePath = `${path.resolve(
      __dirname,
      '../../temp/pascal'
    )}/${fileName}`

    await fs.promises.writeFile(`${filePath}`, programText)
    return filePath
  }
}

module.exports = PascalRunner
