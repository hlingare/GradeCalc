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
