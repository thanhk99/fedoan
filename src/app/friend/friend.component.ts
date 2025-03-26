import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FriendService } from '../service/friend.service';
import { map, forkJoin } from 'rxjs';
import { userService } from '../service/users.service';

@Component({
  selector: 'app-friend',
  imports: [CommonModule, FormsModule],
  templateUrl: './friend.component.html',
  styleUrl: './friend.component.css',
})
export class FriendComponent {
  [x: string]: any;
  showFriendsList = false; // Biến kiểm soát hiển thị danh sách bạn bè
  showFriendRequest = false; // Biến kiểm soát hiển thị danh sách lời mời kết bạn
  searchQuery = ''; // Biến lưu trữ từ khóa tìm kiếm
  showSearchResults = false; // Biến kiểm soát hiển thị kết quả tìm kiếm người kết bạn
  searchResults: string[] = []; // Danh sách kết quả tìm kiếm người kết bạn

  friends: string[] = []; // Danh sách bạn bè
  friendRequests : {name : string }[] = []; // Danh sách lời mời kết bạn
  btn_add = 'Thêm bạn bè';

  constructor(private friendService: FriendService , private userService: userService) {}

  ngOnInit() {
    this['loadFriends']();
  }

  loadFriends() {
    this.friendService.getFriends().subscribe(
      (data) => {
        this.friends = data;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách bạn bè:', error);
      }
    );
  }

  showListFriend() {
    this.showFriendsList = true;
    this.showFriendRequest = false; // Ẩn danh sách lời mời kết bạn
  }

  showFriendRequests(): void {
    this.showFriendsList = false;
    this.showFriendRequest = true;

    const idMy = this.userService.getCookies(); // Lấy ID người dùng hiện tại

    this.friendService.getFriendRequets().subscribe({
        next: (response: string[]) => {
            this.friendRequests = response.map(name => ({ name })); // Lưu danh sách tên bạn bè
            console.log("Danh sách lời mời kết bạn:", this.friendRequests);
        },
        error: (error: any) => {
            console.error("Lỗi khi lấy danh sách lời mời kết bạn:", error);
            alert("Không thể tải danh sách lời mời kết bạn!");
        }
    });
}





  searchFriends() {
    this.showFriendsList = false;
    this.showFriendRequest = false;
    this.showSearchResults = true;

    const query = this.searchQuery.trim().toLowerCase();
    if (!query) {
        this.searchResults = [];
        return;
    }

    // Gọi API để lấy danh sách fullname
    this.userService.getFullname(query).subscribe({
        next: (fullNames: string[]) => {
            this.searchResults = fullNames.length > 0 
                ? fullNames.filter(name => name.toLowerCase().includes(query))
                : [];
            
            if (this.searchResults.length === 0) {
                console.warn("Không tìm thấy fullname nào từ API.");
            }
        },
        error: (error: any) => {
            console.error('Lỗi khi tìm kiếm bạn bè:', error);
            this.searchResults = [];
        }
    });
}

  
  sendMessage(friend: string) {
    alert(`Nhắn tin với ${friend}`);
  }

  removeFriend(friend: string) {
    this.friends = this.friends.filter((f) => f !== friend);
    alert(`${friend} đã bị xóa khỏi danh sách bạn bè`);
  }
  
  addFriend(friend: string) {
    const idMy = this.userService.getCookies(); // Lấy ID của người dùng hiện tại

    this.userService.getUser().subscribe(user => {
        const idFriend = user.id; // Lấy ID của bạn bè từ API getUser()

        this['http'].post(this['apiaddFriend'], { idMy, idFriend }).subscribe({
            next: (response:any) => {
                console.log("Kết quả gửi lời mời:", response);
                this.btn_add = 'Hủy lời mời';
                alert("Đã gửi lời mời kết bạn!");
            },
            error: (error:any) => {
                console.error("Lỗi khi gửi lời mời kết bạn:", error);
                if (error.status === 400) {
                    alert("Hai bạn đã là bạn bè!");
                } else {
                    alert("Gửi lời mời kết bạn thất bại!");
                }
            }
        });
    });
}
acpRequests(request: any) {
  this.userService.getUser().subscribe(user => {
      const idMy = user.id; // Lấy ID của người dùng hiện tại
      const idFriend = request.id; // ID của người gửi lời mời

      this['http'].post(this['apiacceptFriend'], { idMy, idFriend }).subscribe({
          next: (response:any) => {
              console.log("Kết quả chấp nhận:", response);
              this.friends.push(request.name); // Thêm vào danh sách bạn bè
              this.friendRequests = this.friendRequests.filter(r => r !== request); // Xóa khỏi danh sách yêu cầu
              alert(`Bạn đã chấp nhận lời mời kết bạn từ ${request.name}`);
          },
          error: (error: any) => {
              console.error("Lỗi khi chấp nhận lời mời:", error);
              alert("Chấp nhận lời mời thất bại!");
          }
      });
  });
}


deleteFriendRequets(request: any) {
  this.userService.getUser().subscribe(user => {
      const idMy = user.id; // Lấy ID của người dùng hiện tại
      const idFriend = request.id; // ID của người gửi lời mời

      this['http'].delete(`${this['apideleFriend']}/${idMy}/${idFriend}`).subscribe({
          next: (response : any) => {
              console.log("Kết quả xóa bạn:", response);
              this.friendRequests = this.friendRequests.filter(r => r !== request); // Xóa khỏi danh sách yêu cầu
              alert(`Bạn đã từ chối lời mời kết bạn từ ${request.name}`);
          },
          error: (error : any) => {
              console.error("Lỗi khi xóa bạn:", error);
              alert("Từ chối lời mời kết bạn thất bại!");
          }
      });
  });
}

}
