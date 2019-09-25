# Train-Scheduler

App Description:

This application is a train scheduler that displays realtime arrival and departure data for different train destinations. A firebase project was created to push and retrieve train data from a realtime database. App administrator can add train entries which will create a copy of inputted data in RT DB and will append row to HTML table. Arrival and departure calculations were generated using Moment.js library and a currentTime variable which is used as reference for other time calculations. Math module was used to determine the next departure times, given a set frequency that is inputted by the user. Train data is updated without refreshing the page, with the use of the setTimeout function in JS.

Technology used:

In this assignment, I created a train schedule application that incorporates Firebase to host arrival and departure data. Application retrieves and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, namely their arrival times and how many minutes remain until they arrive at their station.
