const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// import routes

const usersRoutes = require('./routes/users')

// configure dotenv

const dotenv = require('dotenv')
dotenv.config()

// init app

const app = express()

// Middlewares

app.use(cors())

app.use(bodyParser({
    extended: false,
}))

// Connect to mongo database via mongoose

if (process.env.NODE_ENV === 'development') {
    mongoose.connect(process.env.LOCAL_DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) 
            throw new Error(err);
        console.log('Successfully connected to database')
    })
}

// Routes

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    res.send('Hello from express!')
})

// Run app on port

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server running on port ${ PORT }`)
})