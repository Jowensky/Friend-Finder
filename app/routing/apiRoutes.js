module.exports = function(app) {

  $.post("/api/friends", function() {

  });

  // The AJAX function uses the URL of our API to GET the data associated with it
  $.ajax({ url: "/api.friends", method: "GET" }).then(function() {

  });
};
