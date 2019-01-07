$(document).ready(function() {
  game.startGame();

  $("body").on("click", ".choose", function() {
      console.log(user.name)
        game.handleSubmit(event);
      game.nextQuestion();
  });
});

var user = {
  name: $("#userName").val(),
  photo: $("#userPic").val(),
  answers: []
};

var Questions = [
  {
    q: `You believe life is a simulatin`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Creative`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Prefer kickacks over parties`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Sympathetic`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Care about peoples opinion of you`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Open to new experiences`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    img:"./images/blok3.png",
    answers: ["tetter", 'tote']
  },
  {
    q: `Talkative`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Critical`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Easily Upset`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Passionate`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    img: "./images/blok4.png",
    answers: ["tetter", 'tote']
  },
];

var game = {
  startGame: function() {
    this.renderQuestion();
  },
  currentQuestion: 0,
  nextQuestion: function() {
    if (game.currentQuestion < Questions.length -1 ) {
      game.currentQuestion += 1;
      game.renderQuestion();
    } else {
        $("#q").html("");
      game.mate();
    }
  },
  renderQuestion: function() {
    var question = Questions[this.currentQuestion];

    $("#q").html("");
    $("label").html("")
    $(".question img").attr("src", "")


    if (question.q) {
    $("label").html(question.q);
    } else if (question.img) {
        $(".question img").attr("src", question.img)
    }

    for (var i = 0; i < question.answers.length; i++) {
        $("#q").append(`<button class="choose" data-value="${[i]}">${question.answers[i]}</button>`)
    }
  },
  handleSubmit: function(event) {
    selectedAnswer = $(event.target).data("value");
    user.answers.push(selectedAnswer);
    console.log(user.answers)
  },
  mate: function() {
    $.post("/api/friends", user, function(data) {
        
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);
    });
  }
};
