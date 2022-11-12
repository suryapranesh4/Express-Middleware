var express = require("express");
var app = express();

app.get("/html", (req, res) => {
  res.send("<html><head></head><body><h1>Hello World!</h1></body></html>");
});

app.get("/json", (req, res) => {
  res.json({ firstName: "John", lastName: "Smith" });
});

app.get("/:var(toronto)(.?)*(team)", (req, res) => {
  console.log("req", req.url);
  res.send("<html><head></head><body><h1>Go Toronto!</h1></body></html>");
});

app.listen(3000, () => {
  console.log("Server started at port : 3000");
});
