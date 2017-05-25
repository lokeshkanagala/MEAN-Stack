import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  socket = null;
  chatip = '';
  chatmsg = new Array();
  currentUser: any;
  olUsers: any;
  port = "http://localhost:3000"

  constructor() {
    this.socket = io('/');

    let listener = Observable.fromEvent(this.socket, 'message');
    listener.subscribe((payload) => {
      this.chatmsg.push(payload);
    });

    let userListener = Observable.fromEvent(this.socket, 'getUsers');
    userListener.subscribe((payload) => {
      
      this.olUsers = payload;
      console.log(payload);
    });

  }

  send(msg) {
    this.chatip = '';
    this.socket.emit('message', msg);
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.socket.emit('newUser', this.currentUser.username);
  }
}