$(document).ready(function() {
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
  //   let trainAdded;
  //   let destinationAdded;
  //   let timeAdded;
  //   let frequencyAdded;

  //declare variables for administrator input

  $("#submit-button").on("click", function() {
    event.preventDefault();
    let trainAdded = $("#trainInput")
      .val()
      .trim();
    let destinationAdded = $("#destinationInput")
      .val()
      .trim();
    let timeAdded = $("#timeInput")
      .val()
      .trim();
    let frequencyAdded = $("#frequencyInput")
      .val()
      .trim();
    database.ref().set({
      train: trainAdded,
      destination: destinationAdded,
      time: timeAdded,
      freq: frequencyAdded
    });
  });

  database.ref().on("value", function(snapshot) {
    //event.preventDefault();
    console.log(snapshot.val());

    trainAdded = snapshot.val().train;
    destinationAdded = snapshot.val().destination;
    timeAdded = snapshot.val().time;
    frequencyAdded = snapshot.val().freq;

    let rowAdded = `<tr>
    <th scope="row">${trainAdded}</th>
    <td>${destinationAdded}</td>
    <td>${frequencyAdded}</td>
    <td>New Arrival 1</td>
    <td>Minutes Away 1</td>
     </tr>`;
    $("#train-schedule").append(rowAdded);
  });
});
