
const { dbConnection } = require('./db/index.js')
const dotenv = require('dotenv');
const express = require('express');
//const router = require('express').Router()
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const authRoute = require('./routes/authRoute.js')
const orderRoute = require('./routes/orderRoute.js')
const accountRoute = require('./routes/accountRoute.js')

const app = express()

dotenv.config()// configures environmental variables;

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.use('/api/v1/', authRoute)
app.use('/api/v1/', orderRoute)
app.use('/api/v1/', accountRoute)

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
  dbConnection()
})

module.exports = app
