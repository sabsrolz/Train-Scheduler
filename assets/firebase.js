$(document).ready(function() {
  //declare variable to store Firebase SDK
  const firebaseConfig = {
    apiKey: "AIzaSyDYjRkZUQ_uVg_YPdmzJAqCrLSMX083lPo",
    authDomain: "train-scheduler-f0c2a.firebaseapp.com",
    databaseURL: "https://train-scheduler-f0c2a.firebaseio.com",
    projectId: "train-scheduler-f0c2a",
    storageBucket: "",
    messagingSenderId: "339788187661",
    appId: "1:339788187661:web:7822c8897f00f256936d44"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  //declare variables for input
  //function that will submit inputted data
  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    //declare variables that store input of added entry
    let train = $("#trainInput")
      .val()
      .trim();
    let destination = $("#destinationInput")
      .val()
      .trim();
    let time = $("#timeInput")
      .val()
      .trim();
    let freq = $("#frequencyInput")
      .val()
      .trim();
    //reference db and create object with input variables
    database.ref().push({
      train,
      destination,
      time,
      freq
    });
  });
  //function that will reference db and store current values of variables
  database.ref().on("child_added", function(childSnapshot) {
    //console.log(childSnapshot.val());
    //declare variables that will capture value of input in db
    let trainAdded = childSnapshot.val().train;
    let destinationAdded = childSnapshot.val().destination;
    let timeAdded = childSnapshot.val().time;
    timeAdded = moment(timeAdded, "HH:mm"); //transform timeAdded to moment object
    let frequencyAdded = parseInt(childSnapshot.val().freq); //transform frequency from string to integer
    let currentTime = moment(); //store current time in moment object
    let minAway;
    let nextArrival;
    //determine next arrival time based on current time of day
    if (timeAdded < currentTime) {
      let timeFactor = Math.ceil(
        //multiplier used to calculate next arrival time
        currentTime.diff(timeAdded, "minutes") / frequencyAdded
      );
      nextArrival = moment(timeAdded).add(
        timeFactor * frequencyAdded,
        "minutes"
      );
      minAway = nextArrival.diff(currentTime, "minutes");
    } else {
      nextArrival = timeAdded.add(frequencyAdded, "minutes");
      minAway = nextArrival.diff(currentTime, "minutes");
    }
    //create a new row every time an entry is submitted
    let rowAdded = `<tr>;
    <th scope="row">${trainAdded}</th>
    <td>${destinationAdded}</td>
    <td>${frequencyAdded}</td>
    <td>${nextArrival}</td>
    <td>${minAway}</td>
     </tr>`;
    $("#train-schedule").append(rowAdded);
  });
});
