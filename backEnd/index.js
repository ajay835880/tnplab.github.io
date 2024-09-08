const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const morgan = require("morgan");
/////let nodemailer = require("nodemailer")
///Configure email credentials///
/////let trans

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("tiny"));
// Routes middleware
app.use("/api", userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});