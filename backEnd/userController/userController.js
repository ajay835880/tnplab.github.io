const connection = require("../model/dbconnect");
const nodemailer = require("nodemailer");


/////configure email credentail///


const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ajaykushwaha68968@gmail.com",
    pass: "gegw hdev mqih vuci",
  },
});

exports.post = (req, res) => {
  const { name, email, address, state, password, city } = req.body;

  // Validate required fields
  if (!name || !email || !city || !state || !address || !password) {
    return res.status(400).json({ message: "Missing or invalid request body" });
  }
  // Insert query without id
  const query =
    "INSERT INTO users (name, address, state,city, password,email) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [name, address,state,city, password, email];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return res.status(500).json({ message: "Database error", error: err });
    }
    res.status(201).json({ message: "User created successfully", result });
  
///////send email
    var emailOption = {
      from: "ajaykushwaha68968@gmail.com",
      to: email,
      subject: "users Successful",
    
    
      html: `
             <h1>Welcome to Our Platform, ${name}!</h1>
             <p>Hello,</p>
             <p>Thank you for registering with us. Here are your details:</p>
             <ul>
                 <li><strong>Name:</strong> ${name}</li>
                 <li><strong>Address:</strong> ${address}</li>
                 <li><strong>State:</strong> ${state}</li>
                 <li><strong>City:</strong> ${city}</li>
                 <li><strong>Email:</strong> ${email}</li>
             </ul>
              <p>We hope you have a great experience!</p>
            <p>Best regards,</p>
            <p>Ajay</p>
        `,
    };

    transporter.sendMail(emailOption, function (error, _info) {
      if (error) {
        console.log(error,"eMail send failed!!!!");
      } else {
        console.log("Email sent successfully");
      }
    });
  });
};
