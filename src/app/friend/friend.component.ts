import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-friend',
  imports: [CommonModule],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent {
[x: string]: any;
showFriendsList = false; // Biến kiểm soát hiển thị danh sách bạn bè
showFriendRequest = false; // Biến kiểm soát hiển thị danh sách lời mời kết bạn

friends = ['Nguyễn Chí Thành', 'Nguyễn Đức Trí', 'Phạm Như Thành', 'Phạm Trường Giang']; // Danh sách bạn bè
friendRequests = [{ name: 'Lê Hồng Phong' }, { name: 'Bùi Thị Phương Mỹ' }]; // Danh sách lời mời kết bạn

showListFriend() {
  this.showFriendsList = true;
  this.showFriendRequest = false; // Ẩn danh sách lời mời kết bạn
}

showFriendRequests() {
  this.showFriendsList = false; 
  this.showFriendRequest = true; // Hiển thị danh sách lời mời kết bạn
}
  
}
