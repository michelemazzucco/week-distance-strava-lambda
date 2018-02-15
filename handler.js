'use strict'
const { 
  getMonday, 
  getData, 
  setResponse, 
  sumDistance, 
  parseDistance, 
  parseDate
} = require('./utils.js')

module.exports.run = (event, context, callback) => {
  const today = new Date().getTime()
  const monday = getMonday()
  const key = process.env.STRAVA_API_KEY
  const url = `https://www.strava.com/api/v3/athlete/activities?before=${parseDate(today)}&after=${parseDate(monday)}&access_token=${key}`
  
  getData(url)
    .then(data => JSON.parse(data))
    .then(json => callback(null, setResponse(200, {
      from: monday,
      to: today,
      distance: parseDistance(sumDistance(json))
    })))
    .catch(e => callback(null, setResponse(e.message, { error: true })))
}
