const express = require('express')
const Router = require('./src/Router')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())
app.use(Router)

app.listen(port, () => console.log(`Connected on port -> ${port}`))