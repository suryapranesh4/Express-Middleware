var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

let users = [
  { name: "Alex", age: 20, id: 1 },
  { name: "Butler", age: 25, id: 2 },
  { name: "Stokes", age: 30, id: 3 },
];

var requestTime = function (req, res, next) {
  var d = new Date();
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = d.getFullYear();
  var month = months[d.getMonth()];
  var date = d.getDate();
  var hour = d.getHours();
  var min = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();
  var sec = (d.getSeconds() < 10 ? "0" : "") + d.getSeconds();
  var time =
    date + ". " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  req.requestTime = time;
  next();
};

app.use(requestTime);

app.get("/greet", (req, res) => {
  console.log("GET received :", req.requestTime);
  res.send("Hello World!");
});

app.get("/user", (req, res) => {
  console.log("GET Users received :", req.requestTime);
  res.status(200).send(users);
});

app.post("/user", (req, res) => {
  console.log("POST user received :", req.requestTime);
  console.log("req", req.body);
  let { name, age } = req.body;
  console.log("name", name);
  console.log("age", age);
  users.push({ name, age: parseInt(age), id: users.length + 1 });
  console.log("Added user", users);
  res.status(201).send(users);
});

app.put("/user/:id", (req, res) => {
  console.log("PUT user received :", req.requestTime);
  let { name, age } = req.body;
  let id = req.params.id;
  console.log("name", name);
  console.log("age", age);
  console.log("id", id);
  users[id - 1] = { name, age: parseInt(age), id: users[id - 1].id };
  console.log("Updated user", users);
  res.status(200).send(users);
});

app.delete("/user/:id", (req, res) => {
  console.log("Delete user received :", req.requestTime);
  let id = req.params.id;
  console.log("id", id);
  let updatedUsers = users.filter((user) => user.id != parseInt(id));
  users = updatedUsers;
  console.log("Updated users after delete", users);
  res.status(200).send(users);
});

app.listen(3000, () => {
  console.log("Server started at port : 3000");
});
