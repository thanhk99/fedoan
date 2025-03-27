import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endWith, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service'
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';
import { userService } from './users.service';
@Injectable({
  providedIn: 'root'
})
export class FriendService {

  constructor(private http: HttpClient,private cookieService: CookieService , 
    private userService : userService){}
  private apigetListFriend = environment.apigetListFriend;
  private apiaddFriend = environment.apiaddFriend;
  private apideleFriend = environment.apideleFriend;
  private apiacceptFriend = environment.apiacceptFriend;
  private apigetFriendRequets = environment.apiGetrequets;
  private apideleFriendRequets = environment.apideleFriendRequets;

  getListFriends(): Observable<any> {
    const idMy = this.userService.getCookies();
    return this.http.post(this.apigetListFriend, {idMy});
  }

  getIdFriend(): void {
    this.userService.getUser().subscribe(user => {
        const idFriend = user.id; // Lấy ID từ getUser()
        console.log("ID của bạn bè:", idFriend);
    }, error => {
        console.error("Lỗi khi lấy ID:", error);
    });
}
  
  getFriendRequets():Observable<any>{
    const idMy = this.userService.getCookies();
    return this.http.post(this.apigetFriendRequets,{idMy});
  }

  // Gửi lời mời kết bạn
  addFriend(): Observable<any> {
    const idMy = this.userService.getCookies();
    const idFriend = this.getIdFriend();
    return this.http.post<any>(this.apiaddFriend, { idMy , idFriend });
  }

  // Xóa bạn bè
  deleteFriend(): Observable<any> {
    const idMy = this.userService.getCookies();
    const idFriend = this.getIdFriend();
    return this.http.delete<any>(`${this.apideleFriend}/${idMy}/${idFriend}`);
  }

  //Xóa lời mời kb

  deleteFriendRequets(): Observable<any>{
    const idFriend = this.getIdFriend();
    const idMy = this.userService.getCookies();
    return this.http.delete<any>(`${this.apideleFriend}/${idMy}/${idFriend}`);

  }



  // Chấp nhận lời mời kết bạn
  acceptFriend(): Observable<any> {
    const idMy = this.userService.getCookies();
    const idFriend = this.getIdFriend();
    return this.http.post<any>(this.apiacceptFriend, {idMy , idFriend});
  }
  
}
