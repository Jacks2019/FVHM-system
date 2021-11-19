import Mock from 'mockjs'

export const floatGeneratorFactory = (min, max) => {
  return () => {
    return Mock.Random.float(min, max, 0, 2)
  }
}

export const intGeneratorFactory = (min, max) => {
  return () => {
    return Mock.Random.integer(min, max)
  }
}

export const wordGeneratorFactory = (min, max) => {
  return () => {
    return Mock.Random.ctitle(min, max)
  }
}

export const randWordGeneratorFactory = list => {
  return () => {
    return list[Mock.Random.integer(0, list.length - 1)]
  }
}

export const fullAddressGenerator = () => {
  return Mock.Random.province() + Mock.Random.city() + Mock.Random.county() + Mock.Random.ctitle(4, 6)
}

export const zipGenerator = () => {
  return Mock.Random.zip()
}

export const phoneGenerator = () => {
  return '13' + Mock.Random.integer(100000000, 999999999)
}

export const idcardGenerator = () => {
  return Mock.Random.id()
}

export const rateGeneratorFactory = opt => {
  let rateSum = 0
  // 补充配置概率
  opt = opt.map(item => {
    rateSum += item.rate
    return {
      ...item,
      rateSum,
    }
  })
  // 根据概率选定 generator
  return () => {
    const rate = Math.random()
    for (let item of opt) {
      if (rate < item.rateSum) {
        return item.generator()
      }
    }
  }
}

export const cityGenerator = () => {
  return Mock.Random.city()
}

export const countryGenerator = () => {
  return Mock.Random.county()
}

export const datetimeGenerator = () => {
  return Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
}

export const idGenerator = () => {
  return Mock.Random.increment(1)
}

export const nameGenerator = () => {
  return Mock.Random.cname()
}
