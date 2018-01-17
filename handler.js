'use strict'
const https = require('https')
const parseDate = require('./utils.js').parseDate
const getMonday = require('./utils.js').getMonday
const sumDistance = require('./utils.js').sumDistance
const parseDistance = require('./utils.js').parseDistance

module.exports.run = (event, context, callback) => {
  const today = new Date().getTime()
  const monday = getMonday()
  const key = process.env.STRAVA_API_KEY
  const url = `https://www.strava.com/api/v3/athlete/activities?&before=${parseDate(today)}&after=${parseDate(monday)}&access_token=${key}`
  
  const req = https.get(url, response => {
    let data = ''
    
    response.on('data', chunk => { data += chunk })
    
    response.on('end', () => {   
        const totalDistance = sumDistance(JSON.parse(data))

        callback(null, {
          statusCode: response.statusCode,
          headers: {
            "Access-Control-Allow-Origin" : "*",
          },
          body: JSON.stringify({ 
            from: monday,
            to: today,
            distance: parseDistance(totalDistance)
          })
        })
      })
  })

  req.on('error', (e) => console.error(e))
}
