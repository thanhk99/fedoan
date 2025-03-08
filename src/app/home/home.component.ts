import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from '../service/socket.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { userService } from '../service/users.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true
})
export class HomeComponent implements OnInit {
  urlSocket:string = 'ws://192.168.1.191:8082';
  messages: any[] = [];
  messageInput: string = '';
  isConnected = false;
  private messageSubscription !: Subscription;
  private connectionSubscription !: Subscription;
  constructor (private router:Router,
    private socket:WebSocketService,
    private cookieService:CookieService,
    private userService: userService
  ) { }
    ngOnInit() {
      this.userService.getUser()
      // Kết nối tới WebSocket
      let username:any =this.userService.getNameCookies()
      this.urlSocket +="?username="+username
      this.socket.connect(this.urlSocket)
      //Lắng nghe tin nhắn
      this.messageSubscription = this.socket.getMessages().subscribe(
        messageData => {
          if (messageData.url === this.urlSocket) {
            this.messages.push(messageData.message);
          }
        }
      );
  
      // Theo dõi trạng thái kết nối
      this.connectionSubscription = this.socket.getConnectionStatus().subscribe(
        status => {
          this.isConnected = status[this.urlSocket] || false;
          if (this.isConnected) {
            this.socket.sendMessage(this.urlSocket, "Hello");
          }
        }
      );
    }
}
