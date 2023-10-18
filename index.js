const app = require(`./app`)
const PORT = 1488

app.listen(PORT, () => {
    console.log(`Server is listening: http://localhost:${PORT}`)
})
