const app = require(`./api/app`)
const PORT = 14880

app.listen(PORT, () => {
    console.log(`Server is listening: http://localhost:${PORT}`)
})
