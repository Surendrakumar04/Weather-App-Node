const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

const profiles = [ 'suri0786', 'ayushbasak' ]

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Spark',
        profiles
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        profiles
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'WhatsApp Head office, Indra Vihar, 911035 Dhokla.',
        title: 'Help',
        profiles
    })
})

app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    await geocode(req.query.address)
        .then(response => {
            if (response.error) {
                return res.send({
                    error: response.error
                })
            }
            forecast(response.latitude, response.longitude)
                .then(forecastResponse => {
                    const forecastString = 'It is currently ' + forecastResponse.temperature + ' °C out. There is a ' + forecastResponse.description + '.';
                    res.send({
                        location: response.location,
                        forecast: forecastString,
                        address: req.query.address
                    })
                })
                .catch(error => {
                    res.send({
                        error: error
                    })
                })
        })
        .catch(error => {
            res.send({
                error: error
            })
        })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        profiles,
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        profiles,
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port : ' + port)
})