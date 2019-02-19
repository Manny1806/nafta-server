const express = require('express')
const nodemailer = require("nodemailer")
const config = require('../config')

const router = express.Router()

router.post('/', (req, res, next) => {
  const {subject, comment, firstName, lastName, email, phone, zip, state} = req.body
  // create reusable transporter object using the default SMTP transport

  console.log(config.GMAIL_USER)

  let transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true, // true for 465, false for other ports
    auth: {
      user: config.GMAIL_USER,
      pass: config.GMAIL_PASSWORD
    }
  });
  const text = `First Name: ${firstName} Last Name: ${lastName} Email: ${email}
    Phone: ${phone} Zipcode: ${zip} State: ${state} Comment: ${comment}`

  const htmlText = `First Name: ${firstName}<br/>Last Name: ${lastName}<br/>Email: ${email}
    <br/>Phone: ${phone}<br/>Zipcode: ${zip}<br/>State: ${state}<br/>Comment: ${comment}`

  let mailOptions = {
    from: '"NAFTA Reactor" <naftareactor@gmail.com>', // sender address
    to: "alex.dean.widner@gmail.com, manny1806@gmail.com", // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: `<b>${htmlText}</b>` // html body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if(err){
      console.log(err)
      res.json("There was an error sending your feedback.<br/>Please try again later.")
    }
    else{
      console.log(info);
      res.json("Your feedback has been sent!")
    }
      
 });

//   let info = await transporter.sendMail(mailOptions)

//   res.json(`Message sent: ${info.messageId}`)
  

})

module.exports = router