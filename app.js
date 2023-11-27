const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for handling form data
const upload = multer();

// Create a transporter with your email service credentials
const transporter = nodemailer.createTransport({
  host: "mail.graderz.org",
  port: 587,
  secure: false,
  auth: {
    user: "testing@graderz.org",
    pass: "$2tb3p1`1o@^",
  },
});

const storage = multer.memoryStorage();
const upload1 = multer({ storage });

app.post("/send-order-form", upload1.array("orderFiles[]"), (req, res) => {
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
    City,
    State,
    PostalCode,
    UserInfo,
    TotalAmount,
    PricePerPage,
    CurrencyUnit,
    notes,
    orderId,
  } = req.body;

  //   // Uploaded files are available in req.files array
  const orderFiles = req.files;

  //   // Create an email message with all the form fields
  const emailMessage = `
    Type of Paper: ${TypeOfPaper}
    Task Level: ${TaskLevel}llll
    dvdsufhdsiufhdsuifids
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
    State: ${State}
    City: ${City}
    Postal Code: ${PostalCode}
    User Info: ${UserInfo}
    Total Amount: ${TotalAmount}
    Price Per Page: ${PricePerPage}
    Currency Unit: ${CurrencyUnit}
    ${orderId} ${notes}
  `;

  //   // Email data
  const mailOptions1 = {
    from: "testing@graderz.org",
    to: "testing@graderz.org",
    subject: "Order Form | Gradesup.org",
    html: `
    <p style="font-weight: bold; font-size: 20px">Order Details</p>

    <hr />
  
    <b>Order ID</b> ${orderId} <br />
    <b>Type of Paper:</b> ${TypeOfPaper} <br />
    <b>Task/Acadamic Level:</b> ${TaskLevel} <br />
    <b>Order Subject:</b> ${SelectSubject} <br />
    <b>Referencing Style:</b> ${ReferencingStyle} <br />
    <b>Number of Sources:</b> ${NoOfSources} <br />
    <b>Paper Standard:</b> ${PaperStandard} <br />
    <b>Number of Pages:</b> ${NoOfPages} <br />
    <b>Preferred Language Style:</b> ${PreferredLanguage} <br />
    <b>Paper Format:</b> ${PaperFormat} <br />
    <b>Order Deadline:</b> ${Deadline} <br />
    <b>Order Topic:</b> ${topic} <br />
    <br />

    <p style="font-weight: bold; font-size: 20px">Contact Details</p>

    <hr />

    <b>Order Candidate Name:</b> ${UserName} <br />
    <b>Order Candidate Email:</b> ${UserEmail} <br />
    <b>Order Candidate Phone Number:</b> ${UserPhone} <br />
    <b>Country:</b> ${Country} <br />
    <b>Order Additional Notes:</b> ${notes} <br />
    <br />

    <p style="font-weight: bold; font-size: 20px">Price Details</p>

    <hr />
    
    <b>Payment Status:</b> Not Paid <br />
    <b>Payment Amount:</b> ${TotalAmount} <br />
    <b>Price Per Page:</b> ${PricePerPage} <br />
    <b>Payment Unit:</b> ${CurrencyUnit} <br />
  `,
    // Attach the uploaded files
    attachments: orderFiles.map((file) => ({
      filename: file.originalname,
      content: file.buffer,
    })),
  };

  //   // Send the email
  transporter.sendMail(mailOptions1, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Email sent successfully" });
    }
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
