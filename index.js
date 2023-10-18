const express = require(`express`)
const { v4: uuid } = require(`uuid`)

const app = express()
const PORT = 1488

app.use(cors())
app.use(express.json())

app.get(`/outfit`, (req, res) => {
    res.send(`Here`)
})

app.listen(PORT, () => {
    console.log(`Server is listening: http://localhost:${PORT}`)
})