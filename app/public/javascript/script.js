$(document).ready(function() {
  game.startGame();

  $("body").on("click", "#submit", game.nextQuestion);
});

var user = {
    name: $("#userName").val(),
    photo: $("#userPic").val(),
    answers: []
};

var Questions = [
  `You believe life is a simulatin`,
  `Creative`,
  `Prefer kickacks over parties`,
  `Sympathetic`,
  `Care about peoples opinion of you`,
  `Open to new experiences`,
  `Talkative`,
  `Critical`,
  `Easily Upset`,
  `Passionate`
];

var game = {
  startGame: function() {
    game.renderQuestion();
  },
  currentQuestion: 0,
  nextQuestion: function() {
    if (game.currentQuestion < Questions.length - 1) {
      game.handleSubmit();
      game.currentQuestion += 1;
      game.renderQuestion();
    } else {
      mate();
    }
  },
  renderQuestion: function() {
    $("label").html(Questions[game.currentQuestion]);
  },
  handleSubmit: function() {
    selectedAnswer = $("#q").val();
    user.answers.push(selectedAnswer);
  },
  mate: function() {
    $.post("/api/friends", user, function(data) {
        // Data will be posted on modal on return
  
        $("#match-name").text(data.name);
        $("#match-img").attr("src", data.photo);
      });
  }
};


