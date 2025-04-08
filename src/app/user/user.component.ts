import { Component } from '@angular/core';
import { userService } from '../service/users.service';
import { FriendService } from '../service/friend.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(
    private userService: userService,
    private friendService : FriendService,
  ){}
  fullname:any;
  money:any;
  numberFriend:any=0;
  friends: any[] = []
  lichSuCuoc = [
    {
      game: 'Tài Xỉu',
      nguoiCuoc: 'Nguyễn Văn A',
      ketQua: 'Tài',
      soTienCuoc: 500000,
      phanThuong: 1000000,
      datCuoc: 'Tài',
      thoiGian: new Date('2025-04-05T14:20:00')
    },
    {
      game: 'Tài Xỉu',
      nguoiCuoc: 'Trần Văn B',
      ketQua: 'Xỉu',
      soTienCuoc: 1000000,
      phanThuong: 0,
      datCuoc: 'Tài',
      thoiGian: new Date('2025-04-05T15:00:00')
    }
  ];
  
  
  ngOnInit(): void {
    this.fullname=this.userService.getNameCookies()
    this.money=this.userService.getBalanceCookies()

    this.friendService.getListFriends().subscribe(
      (data: any[]) => {
        this.friends = data; 
        this.numberFriend = this.friends.length; // Đếm số lượng bạn bè
        console.log('Số lượng bạn bè:', this.numberFriend); // Kiểm tra trong console
        console.log('Danh sách bạn bè:', this.friends); // Kiểm tra trong console
      },
      (error:any) => {
        console.error('Lỗi khi tải danh sách bạn bè:', error);
      }
    );

  }
}
