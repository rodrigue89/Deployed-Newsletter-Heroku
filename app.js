
//jshint version: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));


// app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");

});

app.post("/", function(req, res){
var firstName = req.body.fName;
var lastName = req.body.lName;
var email = req.body.email;

var data = {
  members:[
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,

      }
    }
  ]
};

var jsondata = JSON.stringify(data);

// https://usX.api.mailchimp.com/3.0/lists/57afe96172/
var options = {
  url: "https://us4.api.mailchimp.com/3.0/lists/a1c20a722f",
  method: "POST",
  headers: {
    "Authorization": "rodrigue89 91a067dd224f8089ad7fe57f48a4bcf8-us4"
  },
  body: jsondata
};

request(options, function(error, response, body){
  if (error) {
    res.sendFile(__dirname + "/failure.html");
    // ("There was an error with signing up, please try again!")
    // console.log(error);

  } else {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
      // ("Successfully subscribed!");
    } else {
      res.sendFile(__dirname + "/failure.html");
      //
      // "There was an error with signing up, please try again!"
      // res.send("There was an error with signing up, please try again!")
    }
    // console.log(response.statusCode);
  }
});
// console.log(firstName, lastName, email);

});
app.post("/failure", function(req, res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
});

// 91a067dd224f8089ad7fe57f48a4bcf8-us4
// {list id}
// a1c20a722f
