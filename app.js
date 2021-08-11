const dotenv = require('dotenv').config()
const APIKEY = process.env.APIKEY || console.warn("WARNING: APIKEY not set, some functions may not work")
const PORT = 3000
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.all('/*', checkApiKey)

app.listen(PORT, async () => {
    console.log('Server is running...')
    require('./bot')
})

function checkApiKey(req, res, next) {
    if (req.header('X-API-KEY') !== APIKEY) {
        return res.status(401).json({status: 'UNAUTHORIZED'})
    }
    next()
}
