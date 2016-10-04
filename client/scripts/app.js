
// YOUR CODE HERE:
var App = function() {

};

App.prototype.init = function() {
  app.fetch();
};

App.prototype.send = function(message) {
  // console.log('SENDING STUFF!!', message);
  // $('#chats').empty();
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://localhost:3000/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};

App.prototype.fetch = function() {

  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'http://localhost:3000/classes/messages',
    type: 'GET',
    success: function(data) {
      // console.log(data);
      var chat = $('#chats');
      data = JSON.parse(data);
      // chat.append($('<li>' + data.name + '<li>'));
      // chat.append($('<li class="user">').text(user).html() + '</li>' + ': ' + $('<li class="msg">').text(userWords).html() + '</li><br><br>');
      for (var i = 0; i < data.results.length; i++) {
        var user = data.results[i].username;
        var userWords = data.results[i].text;
        chat.append($('<li class="msg">').text(userWords).html() + '</li><br><br>');
      }
    },
    error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

App.prototype.clearMessages = function() {
  $('#chats').html(' ');
};

App.prototype.renderMessage = function(message) {


  var chat = $('#chats');

  // chat.append($('<li class="msg">').text(message.text).html() + '</li><br><br>');
  console.log(message.text);
  chat.append($('<li class="msg">' + message.text + '</li>'));
};

var app = new App();
var message = {
  username: 'Mel Brooks',
  text: 'Never underestimate the power of the Schwartz!',
  roomname: 'lobby'
};
// app.init();
// app.clearMessages();
// app.renderMessage(message);

$(document).ready(function() {

  $('form').submit('click', function(e) {
    e.preventDefault();
    console.log("this is a test")
    var messageVal = $('#txtMsg').val();
    var usernameVal = $('#name').val();
    var roomnameVal = $('#roomname').val(); 

    var newMessage = {
      username: usernameVal,
      text: messageVal,
      roomname: roomnameVal
    };
     
    window.location.reload();
    app.send(newMessage);
  });
});

// setInterval(function() {
//   app.fetch();
// }, 750);  
app.fetch();
  
  


