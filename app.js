//jshint esversion: 6

const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require ("https");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended : true}));


app.get("/", function(req, res){

    res.sendFile(__dirname + '/Signup.html');
});




app.post("/",function(req, res){


    const firstName = req.body.fName; 

    const lastName = req.body.lName;

    const email = req.body.email;


    const data = {

     members: [

        {
             
        email_address: email,
       
        status :  "subscribed",

        merge_fields:{

            FNAME: firstName,
            LNAME: lastName
        }

        }
     ]
    }
   const jsonData = JSON.stringify(data);

   const  url = "https://us4.api.mailchimp.com/3.0/lists/2f54b8bd4b";

    const options= {

     method: "POST",
    
      auth: "uche.co:My API_Key"

        }


const request = https.request(url, options, function(response){

    if (response.statusCode === 200) {

     res.sendFile(__dirname + "/success.html")
    } else {
        res.sendFile(__dirname + "/failure.html")
    }

    response.on("data",function(data){
    
        console.log(JSON.parse(data));
    });


});

request.write(jsonData);

request.end();
});

app.post("/failure" , function(req, res){

res.redirect("/");
});

app.listen(3000, function(){

    console.log("server is running on port 3000");
});


