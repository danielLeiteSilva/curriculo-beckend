const express = require('express')
const Router = require('./src/Router')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerDoc= require('./swagger.json')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json({limit: "50mb"}))
app.use(Router)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

app.listen(port, () => console.log(`Connected on port -> ${port}`))