/*
 * 传进来的参数 excel - object
 * props: [{ label, name }]
 * body: [{ name: value }]
 * fileName: 导出文件的名字
 */

function exportE() {
  let str = ''
  for (let i = 0; i < 100; i++) {
    let list = []
    for (let j = 0; j < 4; j++) {
      const rate = Math.random()
      if (rate > 0.98) {
        list.push('')
      } else {
        list.push(Math.floor(Math.random() * 10000) / 10 + '')
      }
    }
    str += list.join(',') + '\r\n'
  }
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
  // 通过创建a标签实现
  const link = document.createElement('a')
  link.href = uri
  let fileName = 'test'
  link.download = fileName + '.csv'
  link.click()
}

export function exportExcel({ props, body, fileName }) {
  //   exportE()
  //   return
  console.log('in exportExcel')
  if (!props || !body || !fileName) {
    console.error('exportExcel need { props, body, fileName } !')
  }
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = props.map(item => item.label).join(',') + '\n'
  // 增加\t为了不让表格显示科学计数法或者其他格式
  body.forEach(item => {
    props.forEach(it => {
      str +=
        ((it.render ? it.render(item[it.name]) : item[it.name]) || (it.default === undefined ? '' : it.default)) + '\t,'
    })
    str += '\n'
  })
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
  // 通过创建a标签实现
  const link = document.createElement('a')
  link.href = uri
  // 对下载的文件命名
  var myDate = new Date()
  const year = myDate.getFullYear()
  const month = myDate.getMonth() + 1
  const date = myDate.getDate()
  const hour = myDate.getHours()
  const minute = myDate.getMinutes()
  const second = myDate.getSeconds()
  const now =
    year +
    '-' +
    fillZero(month) +
    '-' +
    fillZero(date) +
    ' ' +
    fillZero(hour) +
    '-' +
    fillZero(minute) +
    '-' +
    fillZero(second)
  fileName += now
  console.log(fileName)

  link.download = fileName + '.csv'
  link.click()
}

function fillZero(str) {
  var realNum
  if (str < 10) {
    realNum = '0' + str
  } else {
    realNum = str
  }
  return realNum
}
