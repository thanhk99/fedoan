import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../service/socket.service';
import { Subscription } from 'rxjs';
import { url } from 'inspector';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true
})
export class HomeComponent implements OnInit {
  urlSocket:string = 'ws://localhost:8082';
  messages: any[] = [];
  messageInput: string = '';
  isConnected = false;
  // private messageSubscription !: Subscription;
  private connectionSubscription !: Subscription;
  constructor (private router:Router,
    private socket:WebSocketService) { }
    ngOnInit() {
      // Kết nối tới WebSocket
      this.socket.connect(this.urlSocket);
  
      // Lắng nghe tin nhắn
      // this.messageSubscription = this.socket.getMessages().subscribe(
      //   messageData => {
      //     if (messageData.url === this.websocketUrl) {
      //       this.messages.push(messageData.message);
      //     }
      //   }
      // );
  
      // Theo dõi trạng thái kết nối
      this.connectionSubscription = this.socket.getConnectionStatus().subscribe(
        status => {
          this.isConnected = status[this.urlSocket] || false;
        }
      );
      this.socket.sendMessage(this.urlSocket,"Hello")
    }
  login():void{
    this.router.navigate(['/login']);
  }
}
