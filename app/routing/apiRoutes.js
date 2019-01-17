var user = require("../data/friends");
// turns req.body.answers into integers
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

  // handle's compatibility logic.
  app.post("/api/friends", function(req, res) {
    // Post request is turned into object
    newUser = {
      name: req.body.name,
      social: req.body.social,
      answers: answerInt(req.body.answers)
    };

    var lowestdiff = []; // array for tracking differences between users

    for (var ob in user) {
      var lowest = 0; // variable used to count differences
      
      for (var i = 0; i < newUser.answers.length - 2; i++) {
        lowest += Math.abs(user[ob].answers[i] - newUser.answers[i]);
      }
      lowestdiff.push(lowest);
    }

    var i = lowestdiff.indexOf(Math.min(...lowestdiff)); // index of the lowest number is found to locate lowest differentiate user
    console.log(lowestdiff[i])

    user.push(newUser); // the new user is now in friendsdata object
    console.log(user[i])
    res.json(user[i]); // most compatiable user is sent to client
  });
};
