var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var result = [];

server.listen(8080,function(){
  console.log("app running");
  getClassStandingGPA();
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: getClassStandingGPA()});
  socket.on('my other event', function (data) {
    console.log(data);
  });
});


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

function getClassStandingGPA(){

  const text = "SELECT username, class_standing, gpa FROM STUDENT";
  var gpaStanding = [];
  var realRes;
  client.query(text,(err, res) => {
    if (err) {
      //console.log(err.stack)
    } else {
    result = res.rows;

    }
    result = res.rows;

    //console.log(juniorGPA/numOfJunior);
    //console.log(seniorGPA/numOfSenior);
  })
  client.query(text)
  .then(res => {
  })
  .catch(e => console.error(e.stack))


  var numOfFreshman = 0;
  var freshmanGPA = 0;
  var numOfSophmore = 0;
  var sophmoreGPA = 0;
  var numOfJunior = 0;
  var juniorGPA = 0;
  var numOfSenior = 0;
  var seniorGPA = 0;
  for(i = 0; i < result.length; i++){
    var standing = result[i].class_standing;
    if(standing == "Freshman"){
      numOfFreshman++;
      freshmanGPA += result[i].gpa;
    }
    if(standing == "Sophmore"){
      numOfSophmore++;
      sophmoreGPA += result[i].gpa;
    }
    if(standing == "Junior"){
      numOfJunior++;
      juniorGPA += result[i].gpa;
    }
    if(standing == "Freshman"){
      numOfSenior++;
      seniorGPA += result[i].gpa;
    }
  }
  var gpaStanding = [freshmanGPA/numOfFreshman, sophmoreGPA/numOfSophmore,juniorGPA/numOfJunior,seniorGPA/numOfSenior];
  if (sophmoreGPA == null){
    sophmoreGPA = 0;
  }
  var x = new XMLHttpRequest()
  x.open("GET", "http://localhost:8080/graphs1", true);
  x.setRequestHeader("Content-type", "application/json");
  x.send(JSON.stringify({
    Freshman: freshmanGPA/numOfFreshman + "",
    Sophmore: sophmoreGPA/numOfSophmore + "",
    Junior: juniorGPA/numOfJunior + "",
    Senior: seniorGPA/numOfSenior + ""
  }));
  console.log(gpaStanding);
  return gpaStanding;
}


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
