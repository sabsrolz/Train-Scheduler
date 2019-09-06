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
  let train;
  let destination;
  let time;
  let freq;

  //declare variables for administrator input

  $("#submit-button").on("click", function() {
    event.preventDefault();
    train = $("#trainInput")
      .val()
      .trim();
    destination = $("#destinationInput")
      .val()
      .trim();
    time = $("#timeInput")
      .val()
      .trim();
    freq = $("#frequencyInput")
      .val()
      .trim();
    database.ref().push({
      train,
      destination,
      time,
      freq
    });
  });

  //   database.ref().on("value", function(snapshot) {
  //     event.preventDefault();
  //     console.log(snapshot.val());

  //     trainAdded = snapshot.val().train;
  //     destinationAdded = snapshot.val().destination;
  //     timeAdded = snapshot.val().time;
  //     frequencyAdded = snapshot.val().freq;

  //     let rowAdded = `<tr>
  //     <th scope="row">${trainAdded}</th>
  //     <td>${destinationAdded}</td>
  //     <td>${frequencyAdded}</td>
  //     <td>New Arrival 1</td>
  //     <td>Minutes Away 1</td>
  //      </tr>`;
  //     $("#train-schedule").append(rowAdded);
  //   });

  database
    .ref()
    .limitToLast(1)
    .on("child_added", function(childSnapshot) {
      //console.log(snapshot.key);
      let trainAdded = childSnapshot.val().train;
      let destinationAdded = childSnapshot.val().destination;
      let timeAdded = childSnapshot.val().time;
      let frequencyAdded = childSnapshot.val().freq;

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
