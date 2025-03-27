import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../service/socket.service';
import { userService } from '../service/users.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-message',
  imports: [CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  constructor(
    private socketService: WebSocketService,
    private userService: userService,
  ){}
  urlSocketMess=environment.urlSocketMess
  users = [
    { name: 'User 1',id: 1 },
    { name: 'User 2',id: 2 },
    { name: 'nhóm kéo',id: 3 }
  ];

  selectedUser: { id: number; name: string } | null = null;
  newMessage: string = '';

  chatHistory: { [key: number]: { text: string; type: string }[] } = {
    1: [
      { text: 'Hello!', type: 'received' },
      { text: 'Hi?', type: 'sent' }
    ],
    2: [
      { text: 'Hey there!', type: 'received' },
      { text: 'What?', type: 'sent' }
    ],
    3: [
      { text: 'Yo!', type: 'received' },
      { text: 'loo', type: 'sent' }
    ]
  };

  messages: { text: string; type: string }[] = [];

  selectUser(user: { id: number; name: string }) {
    this.selectedUser = user;
    this.messages = this.chatHistory[user.id] || [];
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      const newMsg = { text: this.newMessage, type: 'sent' };
  
      // Đảm bảo đã khởi tạo danh sách tin nhắn cho user này
      if (!this.chatHistory[this.selectedUser.id]) {
        this.chatHistory[this.selectedUser.id] = [];
      }
  
      // Cập nhật tin nhắn vào lịch sử
      this.chatHistory[this.selectedUser.id].push(newMsg);
  
      // Cập nhật danh sách tin nhắn đang hiển thị
      this.messages = [...this.chatHistory[this.selectedUser.id]];
  
      let data={
        "type":"message",
        "idReceiver":this.selectedUser.id,
        "content":this.newMessage
      }
      let jsonData=JSON.stringify(data)
      this.socketService.sendMessage(this.urlSocketMess,jsonData)
      this.newMessage = '';
    }
  }

  //be
  ngOnInit(): void {
    this.urlSocketMess +='?id=' +this.userService.getCookies()
    this.socketService.connect(this.urlSocketMess);
    console.log(this.urlSocketMess)
  }
}
