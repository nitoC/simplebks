
const { dbConnection } = require('./db/index.js')
const dotenv = require('dotenv');
const express = require('express');
const authRoute = require('./routes/authRoute.js')
const app = express()

dotenv.config()// configures environmental variables;

const PORT = process.env.PORT

app.use(express.json())




app.use('/api/v1/', authRoute)

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`)
  dbConnection()
})

