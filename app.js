//jshint esversion:6
const mailchimp = require("@mailchimp/mailchimp_marketing");
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
const listId = "6fe4b76154";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mailchimp.setConfig({
  //apiKey
  //server
});


app.get("/", async(req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", async(req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const addMembers = async () => {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        },
      });
      res.sendFile(__dirname + "/success.html");
      console.log("Successfully added contact as an audience member");
    }
    catch(err) {
      res.sendFile(__dirname + "/failure.html");
      console.log("Unsuccessful try.");
      console.log(err);
    }
  };

  addMembers();

});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started running on Port 3000.");
});
