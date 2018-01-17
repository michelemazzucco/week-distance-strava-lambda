const parseDate = date => Math.round(date / 1000)

const getMonday = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  
  return new Date(today.setDate(diff)).getTime()
}

const sumDistance = arr => arr.reduce((a, v) => a + v.distance, 0)

const parseDistance = distance => Math.floor((distance / 1000) * 100) / 100

module.exports = {
  parseDate: parseDate,
  getMonday: getMonday,
  sumDistance: sumDistance,
  parseDistance: parseDistance
}
