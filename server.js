var express = require("express");
var app = express();



var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//const firebase = require("firebase");
// Required for side-effects
//require("firebase/firestore");
var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://lwcgiddjtbmhdx:69b00ca84a3bf00a6ffc4b26fb7fc3df3fbfd4b1bd38623e096f9028bfc65405@ec2-184-73-202-112.compute-1.amazonaws.com:5432/dc9d3cs6oinv8d';

//var client = new pg.Client(connectionString);

var client = new pg.Client({
    user: "lwcgiddjtbmhdx",
    password: "69b00ca84a3bf00a6ffc4b26fb7fc3df3fbfd4b1bd38623e096f9028bfc65405",
    database: "dc9d3cs6oinv8d",
    port: 5432,
    host: "ec2-184-73-202-112.compute-1.amazonaws.com",
    ssl: true
});
client.connect();
var port = process.env.PORT || 8080


var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(__dirname));

app.get("/",function(req,res){
  res.render("index");
})

app.listen(port,function(){
  console.log("app running");
})

/*  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});*/

app.post("/faq", function(request, response) {
  console.log("hello went in here");
  var firstname = request.body.FirstName;
  var lastname = request.body.lastName;
  var gender =  request.body.Gender;
  var class1 = request.body.ClassYear;
  var housing = request.body.Housing;
  var school = request.body.School;
  var intern = request.body.InternshipNum;
  var gpa = request.body.gpaNum;



  const text = "INSERT INTO student (id,username, firstname, lastname, gender, class_standing, housing, schools, num_internships, gpa) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
  const values = [19,"username",firstname, lastname, gender, class1, housing,school,intern,gpa];

  var xhr = new XMLHttpRequest();
  //console.log(xhr.open("GET", "http://localhost:8080/faq"));
//xhr.send();


  client.query(text, values, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(res.rows[0])

    }
  })
  client.query(text, values)
  .then(res => {
    console.log(res.rows[0])
  })
  .catch(e => console.error(e.stack))

  });
