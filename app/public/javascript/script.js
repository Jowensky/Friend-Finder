$(document).ready(function() {

  $("body").on("click", ".choose", function() {
      game.handleSubmit(event);
      game.nextQuestion();
  });

  $("body").on("click", "#submit", function() {
    $("#finder").toggle();
    $(".opening input").toggle();
    $(".opening button").toggle();
    var data = {
      name: $("#userName").val(),
      contact: $("#contact").val()
    };
    game.contact(data)
    instruct();
  });

  function instruct() {
    setTimeout(function() {
        $(".instructions").toggle("slow");
    }, 1 * 1000);
    setTimeout(function(){
      $(".questionair").toggle();
      game.startGame();
    }, 3 * 1000);
  }
});

var user = {
  name: null,
  social: null,
  answers: []
};

var Questions = [
  {
    q: `You believe life is a simulatin`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `You rarely do something just out of sheer curiosity.`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Would prefer a kickacks over parties`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Difficult for you to relate to other people’s feelings.`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `People can rarely upset you`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Open to new experiences`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    img:"./images/blok3.png",
    answers: ["bat", 'cage', "death", "else"]
  },
  {
    q: `Talkative`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `You rarely get carried away by fantasies and ideas.`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Easily Upset`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    q: `Love the Arts`,
    answers:["1 (strong no)", "2", "3", "4", "5 (strong yes)"]
  },
  {
    img: "./images/blok4.png",
    answers: ["back", 'pimple', "grit", "teeth"]
  },
];

var game = {
  startGame: function() {
    $(".instructions").toggle();
    this.renderQuestion();
  },
  currentQuestion: 0,
  nextQuestion: function() {
    if (game.currentQuestion < Questions.length -1 ) {
      game.currentQuestion += 1;
      game.renderQuestion();
    } else {
        $(".q").html("");
      game.mate();
    }
  },
  renderQuestion: function() {
    var question = Questions[this.currentQuestion];

    $(".q").html("");
    $("label").html("")
    $(".questionair img").attr("src", "")


    if (question.q) {
    $("label").html(question.q);
    } else if (question.img) {
        $(".questionair img").attr("src", question.img)
    }

    for (var i = 0; i < question.answers.length; i++) {
        $(".q").append(`<button class="choose" data-value="${[i]}">${question.answers[i]}</button></br>`)
    }
  },
  contact: function(data) {
    user.name = data.name
    user.social = data.contact
  },
  handleSubmit: function(event) {
    selectedAnswer = $(event.target).data("value");
    user.answers.push(selectedAnswer);
  },
  mate: function() {
    $.post("/api/friends", user, function(data) {
      $(".questionair").toggle();
      $(".match #match-name").text(`Name's ${data.name}`);
      $(".match #match-social").text(data.social);
    });
  }
};
