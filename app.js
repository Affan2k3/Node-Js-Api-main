const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for handling form data
const upload = multer();

// Create a transporter with your email service credentials
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: 'support@gradesup.org',
    pass: '#MmeProduct@UPGrades@1109',
  },
});

// Define a route to handle POST requests
app.post('/send-email', upload.none(), (req, res) => {
  // Extract user data from the form data
  const { name, email, phone, message } = req.body;

  // Email data
  const mailOptions = {
    from: 'support@gradesup.org',
    to: 'support@gradesup.org,Apexessayz@gmail.com',
    subject: 'DLF Form Entry | Gradesup.org',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

const storage = multer.memoryStorage();
const upload1 = multer({ storage });

app.post('/send-order-form', upload1.array('orderFiles[]'), (req, res) => {
  const {
    TypeOfPaper,
    TaskLevel,
    SelectSubject,
    ReferencingStyle,
    NoOfSources,
    PaperStandard,
    PreferredLanguage,
    NoOfPages,
    PaperFormat,
    Deadline,
    topic,
    UserName,
    UserEmail,
    UserPhone,
    Country,
    PostalCode,
    UserInfo,
    TotalAmount,
    PricePerPage,
    CurrencyUnit,
  } = req.body;

//   // Uploaded files are available in req.files array
  const orderFiles = req.files;

//   // Create an email message with all the form fields
  const emailMessage = `
    Type of Paper: ${TypeOfPaper}
    Task Level: ${TaskLevel}
    Select Subject: ${SelectSubject}
    Referencing Style: ${ReferencingStyle}
    No of Sources: ${NoOfSources}
    Paper Standard: ${PaperStandard}
    Preferred Language: ${PreferredLanguage}
    No of Pages: ${NoOfPages}
    Paper Format: ${PaperFormat}
    Deadline: ${Deadline}
    Topic: ${topic}
    User Name: ${UserName}
    User Email: ${UserEmail}
    User Phone: ${UserPhone}
    Country: ${Country}
    Postal Code: ${PostalCode}
    User Info: ${UserInfo}
    Total Amount: ${TotalAmount}
    Price Per Page: ${PricePerPage}
    Currency Unit: ${CurrencyUnit}
  `;

//   // Email data
  const mailOptions1 = {
    from: 'support@gradesup.org',
    to: 'support@gradesup.org,Apexessayz@gmail.com',
    subject: 'Order Form | Gradesup.org',
    text: emailMessage,
    // Attach the uploaded files
    attachments: orderFiles.map(file => ({
      filename: file.originalname,
      content: file.buffer,
    })),
  };

//   // Send the email
  transporter.sendMail(mailOptions1, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ message: 'Email sent successfully' });
    }
  });
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
