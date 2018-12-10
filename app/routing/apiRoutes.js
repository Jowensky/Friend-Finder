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
      photo: req.body.photo,
      answers: answerInt(req.body.answers)
    };
 

   
    var lowestdiff = []; // array for tracking differences between users
    var lowest = 0; // variable used to count differences 

    for (var obj in user) { // iterates through existing user data 
      for (var diff in newUser.answers) { // iterates through  existing user answers and the newUsers
        lowest += Math.abs(user[obj].answers[diff] - newUser.answers[diff]); // finds differences between users
      }
      lowestdiff.push(lowest); // the tallied difference is pushed into an array 
    }
    var i = lowestdiff.indexOf(Math.min(...lowestdiff)); // index of the lowest number is found to locate lowest differentiate user
  

    user.push(newUser); // the new user is now in data object
    res.json(user[i]); // lowest user is sent to client 
  });
};
