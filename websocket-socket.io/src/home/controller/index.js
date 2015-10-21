'use strict';

import Base from './base.js';

var usernames = {};
var numUsers = 0;

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  openAction(self){
    var socket = self.http.socket;
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: self.http.data
    });
  }
  adduserAction(self){
    var socket = self.http.socket;
    var username = self.http.data;
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('userjoin', {
      username: socket.username,
      numUsers: numUsers
    });
  }
  closeAction(self){
    var socket = self.http.socket;
    // remove the username from global usernames list
    if (socket.username) {
      delete usernames[socket.username];
      --numUsers;
      // echo globally that this client has left
      socket.broadcast.emit('userleft', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  }
  chatAction(self){
    var socket = self.http.socket;
    // we tell the client to execute 'chat'
    socket.broadcast.emit('chat', {
      username: socket.username,
      message: self.http.data
    });
  }
  typingAction(self){
    var socket = self.http.socket;
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  }
  stoptypingAction(self){
    var socket = self.http.socket;
    socket.broadcast.emit('stoptyping', {
      username: socket.username
    });
  }
}