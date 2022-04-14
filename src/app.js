const express = require('express')
const dotenv = require('dotenv')

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3033

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
