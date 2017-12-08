function loginForm(){
    var userName = document.getElementById('u').value;
    var password = document.getElementById('p').value;
    console.log(userName);
    console.log(password);
    console.log("went in here");
    var data1 = {
      Username: userName,
        Password: password
    }
    var x = new XMLHttpRequest()

    x.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    window.location.href = "index.html"
    }
    }

    x.open("POST", "http://localhost:8080/password", true);
    x.setRequestHeader("Content-type", "application/json");
    x.send(JSON.stringify({Username: userName,
      password: password
      }));
    return data1;
}

function submitForm() {
    var totalSum = 0;
    var totalCredits = 0;
    var totalClasses = 7;
    var values = [4.0, 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0];
    for (i = 1; i < 8; i++) {
        var classID = document.getElementById("class" + i);
        console.log(classID.children[1].selectedIndex);
        console.log(classID.children[2].selectedIndex);
        var gpaNum = values[classID.children[2].selectedIndex];
        var hoursNum = classID.children[1].selectedIndex;
        totalSum += (gpaNum*hoursNum);
        totalCredits += classID.children[1].selectedIndex;
    }
    console.log(totalSum);
    console.log(totalCredits);
    var gpa = round(totalSum / totalCredits, 2);
    var div = document.getElementById("gpa");
    div.innerHTML = "Your Purdue GPA is " + gpa;
}

function submitForm1() {
  var count = 0;
  for (i = 1; i < 4; i++) {
    var name = "ClassName"+i;
      console.log();
    if (document.getElementById("ClassName"+i).value > 0) {
      count++;
    }
  }
  var totalSum = 0;
  console.log(count);
}

function sendData(){


  var firstNames1 = document.getElementById('FirstName').value;
//  console.log(firstNames);
  var lastNames1 = document.getElementById('LastName').value;

  var gender =document.getElementsByName('gender')[0];
  var genderType = gender.options[gender.selectedIndex].getAttribute('value');

  var classStanding =document.getElementsByName('classStanding')[0];
  var classStandingType = classStanding.options[classStanding.selectedIndex].getAttribute('value');


  var housing =document.getElementsByName('HousingSituation1')[0];
  var housingType = housing.options[housing.selectedIndex].getAttribute('value');

  var schoolComp =document.getElementsByName('School1')[0];
  var schoolType = schoolComp.options[schoolComp.selectedIndex].getAttribute('value');

  var Internship =document.getElementsByName('numInternship')[0];
  var numInternship = Internship.options[Internship.selectedIndex].getAttribute('value');

  var gpa = document.getElementById('gpa').value;


  var data = {
    FirstName: firstNames1,
    lastName: lastNames1,
    Gender: genderType,
    ClassYear: classStandingType,
    Housing: housingType,
    School: schoolType,
    InternshipNum: numInternship,
    gpaNum: gpa
  };

  var x = new XMLHttpRequest()

x.onreadystatechange = function() {
if (this.readyState == 4 && this.status == 200) {
window.location.href = "youtube.html"
}
}

x.open("POST", "https://shielded-ravine-59791.herokuapp.com/faq", true);
x.setRequestHeader("Content-type", "application/json");
x.send(JSON.stringify({FirstName: firstNames1,
  lastName: lastNames1,
  Gender: genderType,
  ClassYear: classStandingType,
  Housing: housingType,
  School: schoolType,
  InternshipNum: numInternship,
  gpaNum: gpa}));

  console.log(data);

  console.log("went in send data");
  return data;
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
