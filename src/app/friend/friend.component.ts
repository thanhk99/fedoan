import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-friend',
  imports: [CommonModule, BrowserModule, FormsModule],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css'
})
export class FriendComponent {
[x: string]: any;
showFriendsList = false; // Biến kiểm soát hiển thị danh sách bạn bè
showFriendRequest = false; // Biến kiểm soát hiển thị danh sách lời mời kết bạn
searchQuery = ''; // Biến lưu trữ từ khóa tìm kiếm
showSearchResults = false; // Biến kiểm soát hiển thị kết quả tìm kiếm người kết bạn
searchResults: string[] = []; // Danh sách kết quả tìm kiếm người kết bạn




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
  
searchFriends() {
  this.showFriendsList = false;
  this.showFriendRequest = false;
  this.showSearchResults = true;

  const query = this.searchQuery.toLowerCase();
  this.searchResults = this.friends.filter(friend => friend.toLowerCase().includes(query));
}

}
