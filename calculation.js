

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

  console.log("went in send data");
  return data;



/*  const client = new pg.Client({
    user: 'lwcgiddjtbmhdx',
    host: 'ec2-184-73-202-112.compute-1.amazonaws.com',
    database: 'dc9d3cs6oinv8d',
    password: '69b00ca84a3bf00a6ffc4b26fb7fc3df3fbfd4b1bd38623e096f9028bfc65405',
    port: 5432,

  })
  client.connect();

  const text = "INSERT INTO student (username, firstname, lastname, gender, class_standing, housing, schools, num_internships, gpa)";
  const values = [firstNames1, lastNames1, genderType, classStandingType, housingType,schoolType,numInternship,gpa];

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
  .catch(e => console.error(e.stack))*/


  console.log(firstNames1);
  console.log(lastNames1);
  console.log(genderType);
  console.log(classStandingType);
  console.log(housingType);
  console.log(schoolType);
  console.log(numInternship);
  console.log(gpa);

  console.log("went in send data");
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
          data: [2478,5267,734,784,433]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Predicted world population (millions) in 2050'
      }
    }
});
