const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const weather = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicPathDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPathDir))
    // app.use(express.static(aboutPathDir))
    // app.use(express.static(helpPathDir))

// app.get('', (req, res) => {
//     res.send("Hello express")
// })

// app.get('/help', (req, res) => {
//     res.send("We are here to help you!")
// })

// app.get('/about', (req, res) => {
//     res.send("<h1>About Us !</h1>")
// })
app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Saferio'
    })

    // if (!req.query.search) {
    //     res.render('weatherError', {
    //         title: 'Weather App',
    //         name: 'Saferio',
    //         message: "! Error. Please provide the address"
    //     })
    // } else {
    //     geoCode(req.query.search, (error, { latitude, longitude, location } = {}) => {
    //         if (error) {

    //             return res.render('weatherError', {
    //                 title: 'Weather App',
    //                 name: 'Saferio',
    //                 message: error
    //             })
    //         }
    //         weather(latitude, longitude, (error, forecastData) => {
    //             if (error) {
    //                 return res.render('weatherError', {
    //                     title: 'Weather App',
    //                     name: 'Saferio',
    //                     message: error
    //                 })
    //             }
    //             res.render('index', {
    //                 title: 'Weather App',
    //                 name: 'Saferio',
    //                 location: location,
    //                 message: forecastData
    //             })
    //             console.log(location);
    //             console.log(forecastData);
    //         })
    //     })
    // }



})

app.get('/weather', (req, res) => {
    var text = ""
    if (!req.query.search) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geoCode(req.query.search, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        weather(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: location,
                forecast: forecastData,
                message: req.query.search
            })
            console.log(location);
            console.log(forecastData);
        })
    })


})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        name: 'Saferio'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Saferio'
    })
})

app.get('/help/*', (req, res) => {
    res.render('siterError', {
        title: 'Page not found !',
        name: 'Saferio',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('pageError', {
        title: '404 Page Not Found',
        name: 'Saferio',
        message: 'Go back to home page !'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})