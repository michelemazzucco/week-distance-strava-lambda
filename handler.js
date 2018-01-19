'use strict'
const getMonday = require('./utils.js').getMonday
const getData = require('./utils.js').getData
const setResponse = require('./utils.js').setResponse
const sumDistance = require('./utils.js').sumDistance
const parseDistance = require('./utils.js').parseDistance
const parseDate = require('./utils.js').parseDate

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
