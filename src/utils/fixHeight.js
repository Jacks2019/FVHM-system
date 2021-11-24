export const fixHeight = () => {
  const eles = document.getElementsByClassName('p-body')
  let h = 90
  if (eles && eles.length > 0) {
    const ele = eles[0]
    h += ele.getBoundingClientRect().height + 120
    h += 'px'
  } else {
    h = '100%'
  }
  const res = document.getElementsByClassName('p-page')
  if (res && res.length > 0) {
    const re = res[0]
    re.style.height = h
  }
}
