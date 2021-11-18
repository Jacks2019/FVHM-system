export const addAttrToEach = (ori, attr, generator) => {
  return ori.map(item => {
    return {
      ...item,
      [attr]: generator(),
    }
  })
}

export const genList = (length, generator) => {
  const res = []
  for (let i = 0; i < length; i++) {
    res.push(generator())
  }
  return res
}

export const replaceEach = (ori, generator) => {
  return ori.map(() => {
    return generator()
  })
}

export const mountedToArrPrototype = () => {
  Array.prototype.addAttrToEach = function (attr, generator) {
    return addAttrToEach(this, attr, generator)
  }
  Array.prototype.replaceEach = function (generator) {
    return replaceEach(this, generator)
  }
}
