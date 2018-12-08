var user = require("../data/friends")

function answerInt (answers) {
  var scoreInt = [];

  answers.forEach(function(vaule, index, array) {
    array[index] = scoreInt.push(parseInt(vaule))
  })
  return scoreInt;
};

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(user);
  });

  app.post("/api/friends", function(req, res) {
    
    newUser = {
      name: req.body.name,
      photo: req.body.photo,
      answers: answerInt(req.body.answers)
    }

    user.push(newUser)
    totalDifference = 0;

    console.log(user)

    res.json(newUser)
  });
};

