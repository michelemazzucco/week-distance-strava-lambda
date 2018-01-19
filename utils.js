const https = require('https')

const getData = url => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      const code = res.statusCode
      let body = []
      
      if (code < 200 || code > 299) reject(new Error(code))
      res.on('data', chunk => body.push(chunk))
      res.on('end', () => resolve(body))
    })

    req.on('error', (err) => reject(err))
  })
}

const getMonday = () => {
  const today = new Date()
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  
  return new Date(today.setDate(diff)).getTime()
}

const setResponse = (statusCode, body) => ({
  statusCode: statusCode,
  headers: {
    "Access-Control-Allow-Origin" : "*",
  },
  body: JSON.stringify(body)
})

const sumDistance = arr => arr.reduce((a, v) => a + v.distance, 0)

const parseDistance = d => Math.floor((d / 1000) * 100) / 100

const parseDate = d => Math.round(d / 1000)

module.exports = {
  getData: getData,
  getMonday: getMonday,
  setResponse: setResponse,
  sumDistance: sumDistance,
  parseDistance: parseDistance,
  parseDate: parseDate,
}
