var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var result = [];
var resultInternship = [];
var resultSchool = [];

server.listen(process.env.PORT || 8080,function(){
  console.log("app running");
  getClassStandingGPA();
})

io.on('connection', function (socket) {
  socket.emit('news', { hello: getClassStandingGPA(),hello1: getNumInternshipsGPA(),hello2: getSchoolGpa()});
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
  var x = new XMLHttpRequest();
  x.open("GET", "http://localhost:8080/graphs1", true);
  x.setRequestHeader("Content-type", "application/json");
  x.send(JSON.stringify({
    Freshman: freshmanGPA/numOfFreshman + "",
    Sophmore: sophmoreGPA/numOfSophmore + "",
    Junior: juniorGPA/numOfJunior + "",
    Senior: seniorGPA/numOfSenior + ""
  }));
  //console.log(gpaStanding);
  return gpaStanding;
}

function getNumInternshipsGPA(){
  const text = "SELECT username, num_internships, gpa FROM STUDENT";
  var gpaStanding = [];
  var realRes;
  client.query(text,(err, res) => {
    if (err) {
      //console.log(err.stack)
    } else {
    resultInternship = res.rows;

    }
    resultInternship = res.rows;

    //console.log(juniorGPA/numOfJunior);
    //console.log(seniorGPA/numOfSenior);
  })
  client.query(text)
  .then(res => {
  })
  .catch(e => console.error(e.stack))

  var zero = 0;
  var zeroGPA = 0;
  var one = 0;
  var oneGPA = 0;
  var two = 0;
  var twoGPA = 0;
  var three = 0;
  var threeGPA = 0;
  var four = 0;
  var fourGPA = 0;
  var five  = 0;
  var fiveGPA = 0;
  //console.log("res length: " , result.length);
  for(i = 0; i < resultInternship.length; i++){
    var numOfInternships = resultInternship[i].num_internships;
    console.log("Num of internships: ", numOfInternships);
    if(numOfInternships == 0){
      zero++;
      zeroGPA += resultInternship[i].gpa;
    }
    if(numOfInternships == 1){
      one++;
      oneGPA += resultInternship[i].gpa;
    }
    if(numOfInternships == 2){
      two++;
      twoGPA += resultInternship[i].gpa;
    }
    if(numOfInternships == 3){
      three++;
      threeGPA += resultInternship[i].gpa;
    }
    if(numOfInternships == 4){
      four++;
      fourGPA += resultInternship[i].gpa;
    }
    if(numOfInternships == 5){
      five++;
      fiveGPA += resultInternship[i].gpa;
    }
  }
  /*console.log("zero ", zero);
  console.log("one ", one);
  console.log("two ", two);
  console.log("three ", three);
  console.log("four ", four);
  console.log("five ", five);*/




var gpaInternship = [zeroGPA/zero,oneGPA/one, twoGPA/two, threeGPA/three, fourGPA/four, fiveGPA/five];
  var x = new XMLHttpRequest()
  x.open("GET", "http://localhost:8080/graphs2", true);
  x.setRequestHeader("Content-type", "application/json");
  /*x.send(JSON.stringify({
    Freshman: freshmanGPA/numOfFreshman + "",
    Sophmore: sophmoreGPA/numOfSophmore + "",
    Junior: juniorGPA/numOfJunior + "",
    Senior: seniorGPA/numOfSenior + ""
  }));*/
  //console.log(gpaInternship);
  return gpaInternship;

}

function getSchoolGpa(){
  const text = "SELECT username, schools, gpa FROM STUDENT";

  client.query(text,(err, res) => {
    if (err) {
      //console.log(err.stack)
    } else {
    resultSchool = res.rows;

    }
    resultSchool = res.rows;

    //console.log(juniorGPA/numOfJunior);
    //console.log(seniorGPA/numOfSenior);
  })
  client.query(text)
  .then(res => {
  })
  .catch(e => console.error(e.stack))

  var agrirculture = 0;
  var agrircultureGPA =  0;
  var education = 0;
  var educationGPA = 0;
  var health = 0;
  var healthGPA = 0;
  var liberal = 0;
  var liberalGPA = 0;
  var management = 0;
  var managementGPA = 0;
  var pharmacy = 0;
  var pharmacyGPA = 0;
  var polytechnic = 0;
  var polytechnicGPA = 0;
  var science = 0;
  var scienceGPA = 0;
  var medicine = 0;
  var medicineGPA = 0;
  var honors = 0;
  var honorsGPA = 0;
  var graduate = 0;
  var graduateGPA = 0;

  //console.log("res length: " , result.length);
  for(i = 0; i < resultSchool.length; i++){
    var school = resultSchool[i].schools;
    //console.log("Num of internships: ", numOfInternships);
    if(school == "College of Agriculture"){
      agrirculture++;
      agrircultureGPA += resultInternship[i].gpa;
    }
    if(school == "College of Education"){
      education++
      educationGPA += resultInternship[i].gpa;
    }
    if(school == "College of Health and Human Sciences"){
      health++;
      healthGPA += resultInternship[i].gpa;
    }
    if(school == "College of Liberal Arts"){
      liberal++;
      liberalGPA += resultInternship[i].gpa;
    }
    if(school == "Krannert School of Management"){
      management++;
      managementGPA += resultInternship[i].gpa;
    }
    if(school == "College of Pharmacy"){
      pharmacy++;
      pharmacyGPA += resultInternship[i].gpa;
    }
    if(school == "Purdue Polytechnic Institute"){
      polytechnic++;
      polytechnicGPA += resultInternship[i].gpa;
    }
    if(school == "College of Science"){
      science++;
      scienceGPA+= resultInternship[i].gpa;
    }
    if(school == "College of Veterinary Medicine"){
      medicine++;
      medicineGPA += resultInternship[i].gpa;
    }
    if(school == "Honors College"){
      honors++;
      honorsGPA += resultInternship[i].gpa;
    }
    if(school == "The Graduate School"){
      graduate++;
      graduateGPA += resultInternship[i].gpa;
    }


  }
  var gpaSchool = [agrircultureGPA/agrirculture,educationGPA/education, healthGPA/health, liberalGPA/liberal, managementGPA/management,
    pharmacyGPA/pharmacy, polytechnicGPA/polytechnic,scienceGPA/science,medicineGPA/medicine,honorsGPA/honors, graduateGPA/graduate];

  var x = new XMLHttpRequest()
  x.open("GET", "http://localhost:8080/graphs3", true);
  x.setRequestHeader("Content-type", "application/json");
  /*x.send(JSON.stringify({
    Freshman: freshmanGPA/numOfFreshman + "",
    Sophmore: sophmoreGPA/numOfSophmore + "",
    Junior: juniorGPA/numOfJunior + "",
    Senior: seniorGPA/numOfSenior + ""
  }));*/
  //console.log(gpaInternship);
  return gpaSchool;


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

  var uname =firstname+lastname;
  var num12 = Math.floor(100000 + Math.random() * 900000);
  const text = "INSERT INTO student (id,username, firstname, lastname, gender, class_standing, housing, schools, num_internships, gpa) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)";
  const values = [num12,uname,firstname, lastname, gender, class1, housing,school,intern,gpa];

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
