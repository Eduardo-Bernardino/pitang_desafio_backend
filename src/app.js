const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

dotenv.config()

const PORT = process.env.PORT || 3033

const app = express()
app.use(express.json())
app.use(morgan("dev"))

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
