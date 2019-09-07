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
  //   let train;
  //   let destination;
  //   let time;
  //   let freq;

  //declare variables for administrator input

  $("#submit-button").on("click", function(event) {
    event.preventDefault();
    //$("#trainInput").attr("placeholder", "");
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
    database.ref().push({
      train,
      destination,
      time,
      freq
    });
  });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    let trainAdded = childSnapshot.val().train;
    let destinationAdded = childSnapshot.val().destination;
    let timeAdded = childSnapshot.val().time;
    timeAdded = moment(timeAdded, "HH:mm");
    console.log(timeAdded);
    let frequencyAdded = parseInt(childSnapshot.val().freq);
    // //let nextArrival = timeAdded.clone().add(frequencyAdded, "minutes");
    // console.log(nextArrival);
    let currentTime = moment();
    let minAway;
    let nextArrival;
    console.log(currentTime);
    if (timeAdded < currentTime) {
      minAway = currentTime.diff(timeAdded, "minutes") % frequencyAdded;
      nextArrival = moment(currentTime).add(minAway, "minutes");
    } else {
      minAway = timeAdded.diff(currentTime, "minutes");
      console.log(timeAdded);
      console.log(currentTime);
      console.log(minAway);
      nextArrival = timeAdded;
    }

    //  % frequencyAdded;
    console.log(minAway);

    console.log(nextArrival);
    // let currentMin = moment().minutes();
    // let currentHr = moment().hours();
    // // console.log(typeof currentHr);
    // // console.log(currentTime);
    // // console.log(typeof currentMin);
    // console.log(currentTime);
    // console.log(frequencyAdded);
    // let minAway = nextArrival.diff(currentTime, "minutes");
    // //let timeStatus = currentMin % frequencyAdded;
    // if (minAway === 0) {
    //   nextArrival = moment(currentTime)
    //     .clone()
    //     .add(frequencyAdded, "minutes");
    //   console.log(nextArrival);
    //   // } else {
    //   //   nextArrival = nextArrival;
    //   //   console.log(nextArrival);
    // }
    // // let nextArrivalMin = nextArrival.moment().minutes();
    // // let minAway = nextArrivalMin - currentMin;
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
