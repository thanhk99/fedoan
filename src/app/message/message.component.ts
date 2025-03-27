import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WebSocketService } from '../service/socket.service';
import { userService } from '../service/users.service';
import { environment } from '../../environments/environment';
import { FriendService } from '../service/friend.service';
import { MessageService } from '../service/message.service';
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
    private friendService: FriendService,
    private messageService: MessageService,
  ){}
  urlSocketMess=environment.urlSocketMess
  users :any
  selectedUser: { id: number; fullname: string } | null = null;
  newMessage: string = '';

  chatHistory: { [idFriend: number]: { idMy:number;content: string }[] } = {
  };

  messages: { content: string; type: string }[] = [];

  selectUser(user: { id: number; fullname: string }) {
    this.selectedUser = user;
    // this.messages = this.chatHistory[user.id] || [];
    this.messageService.getChatHis(parseInt(this.userService.getCookies()),this.selectedUser.id).subscribe(
      (data:any)=>{
        this.messages=data
      },
      (error:any)=>{
        console.log(error)
      }
    )
  }

  sendMessage() {
    if (this.newMessage.trim() && this.selectedUser) {
      const newMsg = { text: this.newMessage, type: 'sent' };
      
      // Đảm bảo đã khởi tạo danh sách tin nhắn cho user này
      // if (!this.chatHistory[this.selectedUser.id]) {
      //   this.chatHistory[this.selectedUser.id] = [];
      // }
  
      // Cập nhật tin nhắn vào lịch sử
      // this.chatHistory[this.selectedUser.id].push(newMsg);
  
      // Cập nhật danh sách tin nhắn đang hiển thị
      // this.messages = [...this.chatHistory[this.selectedUser.id]];
  
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
    this.friendService.getListFriends().subscribe(
      (data:any)=>{
        this.users=data
      },
      (error:any)=>{
        console.log(error)
      }
    )
    this.urlSocketMess +='?id=' +this.userService.getCookies()
    this.socketService.connect(this.urlSocketMess);
    console.log(this.urlSocketMess)
  }
}
