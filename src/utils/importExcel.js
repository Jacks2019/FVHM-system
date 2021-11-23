import ExcelJS from 'exceljs'
import WorkbookReader from 'exceljs'
import { findIndex } from 'lodash-es'

let numFunc
let errorList
export const setNumFunc = func => {
  numFunc = func
}

const getUtf8Length = c => {
  let n = 0
  if ((c & 0x80) == 0) {
    n = 1
  } else if ((c & 0xe0) == 0xc0) {
    n = 2
  } else if ((c & 0xf0) == 0xe0) {
    n = 3
  } else if ((c & 0xf8) == 0xf0) {
    n = 4
  } else if ((c & 0xfc) == 0xf8) {
    n = 5
  } else if ((c & 0xfe) == 0xfc) {
    n = 6
  } else {
    alert('数据二进制格式错误，请确认是否为utf8编码')
  }
  return n
}

const getWordFromUtf8 = wlist => {
  if (wlist[0] === 10) {
    return '\n'
  } else if (wlist[0] === 13) {
    return '\r'
  }
  const wdst = []
  wlist.forEach(item => {
    wdst.push('' + item.toString(16))
  })
  const str = '%' + wdst.join('%')
  const word = decodeURIComponent(str)
  return word
}

const shiftParseCell = str => {
  let dst = ''
  let isStart = false
  let idx = 0
  while (true) {
    if (!isStart && str[idx] === '"') {
      isStart = true
      idx += 1
      continue
    }
    if (isStart && str[idx] === '"' && str[idx + 1] !== '"') {
      idx += 1
      break
    }
    if (isStart && str[idx] === '"' && str[idx + 1] === '"') {
      dst += '"'
      idx += 2
      continue
    }
    dst += str[idx]
    idx += 1
  }
  return {
    dst,
    next: str.slice(idx + 1) || undefined,
  }
}

const shiftNormalCell = str => {
  const idx = str.indexOf(',')
  let dst = ''
  if (idx >= 0) {
    dst = str.slice(0, idx)
    return {
      dst,
      next: str.slice(idx + 1) || undefined,
    }
  } else {
    return {
      dst: str,
      next: undefined,
    }
  }
}

const shiftCell = str => {
  if (!str) {
    return {}
  }
  if (str[0] === '"') {
    return shiftParseCell(str)
  }
  return shiftNormalCell(str)
}

class CSVReader {
  constructor(file) {
    this.file = file
    this.stream = this.file.stream()
    this.reader = this.stream.getReader()
    this.index = 0
    this.lastIndex = 0
    this.list = []
    this.isDone = false
  }

  get isEndOfReader() {
    return this.lastIndex >= this.list.length
  }

  async read() {
    if (this.isDone || !this.isEndOfReader) {
      return
    }
    const readResult = await this.reader.read()
    this.isFirst = false
    this.lastIndex = this.lastIndex - this.index
    this.index = 0
    this.isDone = readResult.done
    this.list = [...this.list, ...(readResult.value || [])]
    if (this.isDone) {
      this.list = []
    }
    // console.log('10', readResult, this.list)
    // console.log('ad')
  }

  async readLine() {
    let readEnd = false
    if (this.isDone) {
      return undefined
    }
    let str = ''
    let count = 0
    while (!this.isDone && !this.readEnd) {
      // console.log('a', this.isDone, this.readEnd)
      count++
      if (count > 1000) {
        console.log('fuck')
        break
      }
      await this.read()
      while (this.index < this.list.length) {
        count++
        // console.log('b')
        const l = getUtf8Length(this.list[this.index])
        this.lastIndex = this.index + l
        const wlist = this.list.slice(this.index, this.lastIndex)
        if (wlist.length === l) {
          const word = getWordFromUtf8(wlist)
          if (word !== '\r' && word !== '\n') {
            str += word
          }
          this.index += l
          if (word === '\n') {
            readEnd = true
            return str
            // break
          }
        } else {
          break
        }
      }
    }
    return str
  }
}

const sleep = num => {
  return new Promise(resolve => {
    setTimeout(() => resolve(), num)
  })
}

export const readFile = async opt => {
  const res = {
    success: false,
    message: '',
  }
  let input = document.createElement('input')
  input.type = 'file'
  input.click()
  input.onchange = async () => {
    let file = input.files[0]
    let tmparr = file.name.split('.')
    let fileType = tmparr[tmparr.length - 1].toLowerCase()

    let filterArr = ['csv']
    let notFilter = true
    for (let i = 0; i < filterArr.length; i++) {
      if (fileType == filterArr[i].toLowerCase()) {
        notFilter = false
        break
      }
    }
    if (notFilter) {
      //reject("文件类型不符合要求");
      res.message = '文件类型不符合要求'
      console.log(res)
      return res
    }
    let sizeM = file.size / 1024 / 1024
    if (sizeM > 50) {
      //reject("文件大小不符合要求");
      res.message = '文件大小不符合要求'
      console.log(res)
      return res
    }

    // const t = new CSVReader(file)
    // for (let i = 0; i < 130; i++) {
    //   const a = await t.readLine()
    //   console.log(a, typeof a)
    // }
    const normalParser = origin => {
      return parseFloat(origin) || undefined
    }
    const normalValidator = (item, origin, row) => {
      if (!item) {
        return false
      }
      return true
    }
    const config = [
      {
        name: 'a',
        label: 'la',
        parser: normalParser,
        validator: normalValidator,
      },
      {
        name: 'b',
        label: 'lb',
        parser: normalParser,
        validator: normalValidator,
      },
      {
        name: 'c',
        label: 'lc',
        parser: normalParser,
        validator: normalValidator,
      },
      {
        name: 'd',
        label: 'ld',
        parser: normalParser,
        validator: normalValidator,
      },
    ]
    let rowNumber = 0
    const result = {
      errorList: [],
      successList: [],
    }
    const t = new CSVReader(file)
    let c = 0
    let i = 0
    while (true) {
      i += 1
      const a = await t.readLine()
      console.log(a, typeof a)
      if (!a || rowNumber >= 1000000) {
        console.log('100')
        // await sleep(100000)
        break
      }
      c += 1
      rowNumber += 1
      // console.log('line', a)
      const row = {}
      const rowRes = {}
      rowRes._hasError = false
      let str = a
      // 获取单元格并转化
      config.forEach((item, index) => {
        const r = shiftCell(str)
        str = r.next
        row[item.name] = {
          origin: r.dst,
          item: item.parser(r.dst),
        }
      })
      // 校验值
      let hasError = false
      config.forEach(item => {
        const valid = item.validator(row[item.name].item, row[item.name].origin, row)
        if (!valid) {
          hasError = true
          result.errorList.push({
            ...row[item.name],
            _name: item.name,
            _row: row,
            _rowNumber: rowNumber,
          })
        }
      })
      // 所有列无误进入成功list
      if (!hasError) {
        const res = {}
        config.forEach(item => {
          res[item.name] = row[item.name].item
        })
        result.successList.push(res)
      }
      if (c === 1000) {
        c = 0
        numFunc && numFunc(rowNumber, result.successList.length, result.errorList.length)
        await sleep(20)
      }
    }
    numFunc && numFunc(rowNumber, result.successList.length, result.errorList.length, result.errorList)
  }
}
