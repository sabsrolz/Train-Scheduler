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
  //   function trainUpdate() {
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
    //console.log(childSnapshot.val());

    let trainAdded = childSnapshot.val().train;
    let destinationAdded = childSnapshot.val().destination;
    let timeAdded = childSnapshot.val().time;
    timeAdded = moment(timeAdded, "HH:mm");
    //console.log(timeAdded);
    let frequencyAdded = parseInt(childSnapshot.val().freq);
    // //let nextArrival = timeAdded.clone().add(frequencyAdded, "minutes");
    // console.log(nextArrival);
    let currentTime = moment();
    let minAway;
    let nextArrival;

    if (timeAdded < currentTime) {
      let timeFactor = Math.ceil(
        currentTime.diff(timeAdded, "minutes") / frequencyAdded
      );
      nextArrival = moment(timeAdded).add(
        timeFactor * frequencyAdded,
        "minutes"
      );
      minAway = nextArrival.diff(currentTime, "minutes");
    } else {
      nextArrival = timeAdded.add(frequencyAdded, "minutes");
      console.log(nextArrival);
      minAway = nextArrival.diff(currentTime, "minutes");
      console.log(nextArrival);
      console.log(timeAdded);
      console.log(minAway);
    }
    // //console.log(currentTime);
    // if (timeAdded < currentTime) {
    //   nextArrival = moment(timeAdded).add(frequencyAdded, "minutes");
    //   console.log(timeAdded);
    //   console.log(frequencyAdded);
    //   minAway = nextArrival.diff(currentTime, "minutes");
    // } else {
    //   let timeFactor = Math.ceil(
    //     currentTime.diff(timeAdded, "minutes") / frequencyAdded
    //   );
    //   nextArrival = moment(timeAdded).add(
    //     timeFactor * frequencyAdded,
    //     "minutes"
    //   );
    //   //minAway = timeAdded.diff(currentTime, "minutes");
    //   minAway = nextArrival.diff(currentTime, "minutes");
    //   //nextArrival = moment(currentTime).add(minAway, "minutes");
    //   //console.log(timeAdded);
    //   //console.log(currentTime);
    //   //console.log(minAway);
    //   //nextArrival = timeAdded;
    // }

    //console.log(minAway);

    //console.log(nextArrival);

    let rowAdded = `<tr>;
    <th scope="row">${trainAdded}</th>
    <td>${destinationAdded}</td>
    <td>${frequencyAdded}</td>
    <td>${nextArrival}</td>
    <td>${minAway}</td>
     </tr>`;
    $("#train-schedule").append(rowAdded);
  });
  //}

  //setTimeout(trainUpdate, 60000);
});
