const API_KEY = require("./config/keys.js").emailAPIKEY;
const DOMAIN = require("./config/keys.js").MailgunDomain;
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.json())


app.post("/", (req, res) => {
  // Specifing Email config
 const data = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };

  //Sending Data
  mailgun.messages().send(data, function(error, body) {
    console.log(body);
    res.send(body);
  });
});

const PORT = process.env.PORT || 8888

app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))


// Test Data below
/*
 from: 'safi.hasan@symcloud.net',
        "to": "safi.hasan@symcloud.net",
        "subject": "Hello",
        "text": "Testing some Mailgun awesomness!"
        */
