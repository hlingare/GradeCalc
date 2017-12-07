var $ = require("jquery");
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
  console.log("weny in here");

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

  var x = new XMLHttpRequest();
  x.open("POST", "http://localhost:8080/faq", true);
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
  return data;

}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

// function getSomething(){
//   var http = new XMLHttpRequest();
//   http.open("GET","http://localhost:8080/graphs1",true);
//   //var x = http.send();
//   ///console.log(x);
//   return http.send();
// }

$.get("graphs1.html", function(data){
  var temp = JSON.parse(data);
  console.log("temp: ", temp);
});

new Chart(document.getElementById("bar-chart"), {

      type: 'bar',
      data: {
        labels: ["Freshman", "Sophmore","Junior","Senior"],
        datasets: [
          {
            label: "Number of Internship",
            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"],
            data: getSomething()
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'GPA Based On Class Standing'
        },
        layout: {
              padding: {
                  left: 50,
                  right: 50,
                  top: 10,
                  bottom: 50
              }
        },
        scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
        }

      }
  });
