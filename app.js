require('dotenv').config()
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const port = 3001

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
        secure: true, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        }
    })  

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            res.status(400).send(error.message);
            return;
        }

        console.log(req.body);

        transporter.sendMail({
<<<<<<< HEAD
            from: "Michał <kowalsky2608@wp.pl>",
            // from: req.body.from,
            to: "",
=======
            from: "You <yourmail@mail.com>",
            // from: req.body.from,
            to: "recipientmail@mail.com",
>>>>>>> b0ec6e6e736b8d6638a27a2053ff043551f30f6a
            subject: "Dyspozycja",
            text: req.body,
            html: req.body,
            // html: req.body.message,
        }, (err) => {
            if (err) {
                res.status(400).send(error.message)
                return;
            }
            res.send('OK')
        })
    });
})
