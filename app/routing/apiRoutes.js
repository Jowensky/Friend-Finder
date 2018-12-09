var user = require("../data/friends");

function answerInt(answers) {
  var scoreInt = [];

  answers.forEach(function(vaule, index, array) {
    array[index] = scoreInt.push(parseInt(vaule));
  });
  return scoreInt;
}

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(user);
  });

  app.post("/api/friends", function(req, res) {
    newUser = {
      name: req.body.name,
      photo: req.body.photo,
      answers: answerInt(req.body.answers)
    };
    // turn into function

    var lowestdiff = [];
    var lowest = 0;
    var obj = 0;

    for (var obj in user) {
      for (var diff in newUser.answers) {
        lowest += Math.abs(user[obj].answers[diff] - newUser.answers[diff]);
      }
      lowestdiff.push(lowest);
    }

    var lowestnumber = Math.min(...lowestdiff);
    var i = lowestdiff.indexOf(Math.min(...lowestdiff));
    // turn into function
    console.log(i)
    console.log(lowestdiff);
    console.log(lowestnumber);
    user.push(newUser);
    res.json(user[i]);
  });
};
