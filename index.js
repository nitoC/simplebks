
const { dbConnection } = require('./db/index.js')
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser')
const authRoute = require('./routes/authRoute.js')
const orderRoute = require('./routes/orderRoute.js')
const app = express()

dotenv.config()// configures environmental variables;

const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))




app.use('/api/v1/', authRoute)
app.use('/api/v1/', orderRoute)

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
  dbConnection()
})

