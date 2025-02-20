import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports : [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor () { }
  ngOnInit() {
    // this.webSocket = new WebSocket('ws://localhost:8082/users/send');

    // this.webSocket.onmessage = (event) => {
    //   try {
    //     const data = JSON.parse(event.data);
    //     this.message = data.message;
    //   } catch (e) {
    //     this.message = event.data; 
    //   }
    // };

    // this.webSocket.onerror = (error) => {
    //   console.error('Lỗi WebSocket:', error);
    // };
  }
}