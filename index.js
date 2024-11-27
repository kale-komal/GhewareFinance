const connection = require("./config/db");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const newsrouter = require("./routes/newsRouter");
const testimonialsRouter = require("./routes/testimonialsRoute");
const projectrouter = require("./routes/projectsRouter");
const galleryRouter = require("./routes/galleryRouter");
const authanticate = require("./routes/authanticate");
const path = require("path");
require('dotenv').config(); 

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/news', newsrouter);
app.use('/team', testimonialsRouter);
app.use('/project', projectrouter);
app.use('/event', galleryRouter);
app.use('/auth', authanticate)

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


app.post("/api/sendMail", async (req, res) => {
    const { name, email, contact, enquiry } = req.body;
  
    if (!name || !email || !contact || !enquiry) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    const transporter = nodemailer.createTransport({
        host: process.env.ZOHO_HOST, 
        port: process.env.ZOHO_PORT, 
        secure: false, 
        auth: {
          user: process.env.ZOHO_USER,
          pass: process.env.ZOHO_PASS,
        },
      });
    // Email data to send
    const mailOptions = {
      from: process.env.ZOHO_USER, // Sender's email
      to: process.env.OWNER_EMAIL, 
      subject: `Feedback from ${name}`, // Subject of the email
      text: `
        You have received a new feedback:
  
        Name: ${name}
        Email: ${email}
        Contact: ${contact}
        Enquiry: ${enquiry}
      `,
    };
  
    try {
      // Send email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email.", error });
    }
  });



app.listen(5000, () => {
    console.log("running server at 5000");
})