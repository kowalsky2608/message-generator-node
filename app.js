require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const port = 3000

const app = express()
app.set('view engine','hbs')

app.use(express.static('public'))

app.use(bodyParser.text())
// app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/kontakt', (req,res) => {
    res.send('dane node')
})

app.listen(port, () => {
    console.log(`App is listening on ${port}`)
})

app.post('/wyslij-maila', (req, res) =>{

    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        }
    })  

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            res.statusCode(400).send(error.message);
            return;
        }

        console.log(req.body);

        transporter.sendMail({
            from: "Michał Kowalski <kowalsky2608@wp.pl>",
            // from: req.body.from,
            to: "kowalsky2608@gmail.com",
            subject: "Dyspozycja",
            text: req.body,
            html: req.body,
            // html: req.body.message,
        }, (err) => {
            if (err) {
                res.statusCode(400).send(error.message)
                return;
            }
            res.send('OK')
        })
    });
})