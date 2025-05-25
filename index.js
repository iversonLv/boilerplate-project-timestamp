// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const {date} = req.params
  let result;
  // check the date params is empty or not
  if(!date) {
    result = new Date()
    return res.json({unix: result.getTime(), utc: result.toUTCString()});
  }
  // check the non-empty date params is string or 
  result = isNaN(+date) ? new Date(date) : new Date(+date) 
  if(isNaN(result)) {
    return res.json({ error : "Invalid Date" })
  }
  // check the date is valida date or not
  res.json({unix: result.getTime(), utc: result.toUTCString()});
  
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
