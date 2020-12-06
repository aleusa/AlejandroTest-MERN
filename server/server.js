const express = require('./config/express.js')

require("dotenv").config();
 
// Use env port or default for local testing
const port = process.env.PORT || 5000;

//initialize all of our middleware, routers, etc.
const app = express.init()

app.listen(port, () => console.log(`Server now running on port ${port}!`));
