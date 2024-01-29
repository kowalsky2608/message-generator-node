const express = require('express');
const port = 3000

const app = express()
app.set('view engine','hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/kontakt', (req,res) => {
    res.send('dane node')
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})