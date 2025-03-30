import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endWith, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';
import { userService } from './users.service';
@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private userService: userService
  ) {}
  private apigetListFriend = environment.apigetListFriend;
  private apiaddFriend = environment.apiaddFriend;
  private apideleFriend = environment.apideleFriend;
  private apiacceptFriend = environment.apiacceptFriend;
  private apigetFriendRequets = environment.apiGetrequets;
  private apideleFriendRequets = environment.apideleFriendRequets;

  getListFriends(): Observable<any> {
    const idMy = this.userService.getCookies();
    return this.http.post(this.apigetListFriend, { idMy });
  }

  getIdFriend(): void {
    this.userService.getUser().subscribe(
      (user) => {
        const idFriend = user.id; // Lấy ID từ getUser()
        console.log('ID của bạn bè:', idFriend);
      },
      (error) => {
        console.error('Lỗi khi lấy ID:', error);
      }
    );
  }

  getFriendRequets(): Observable<any> {
    const idMy = this.userService.getCookies();
    return this.http.post(this.apigetFriendRequets, { idMy });
  }

  // Gửi lời mời kết bạn
  addFriend(): Observable<any> {
    const idMy = this.userService.getCookies();
    const idFriend = this.getIdFriend();
    return this.http.post<any>(this.apiaddFriend, { idMy, idFriend });
  }

  // Xóa bạn bè
  deleteFriend(idMy: number, idFriend: number): Observable<any> {
    const url = `${this.apideleFriend}`;
    const body = { idMy, idFriend };

    return this.http.delete<any>(url, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body // Chỉ hoạt động nếu backend hỗ trợ DELETE có body
    });
}


  //Xóa lời mời kb

<<<<<<< HEAD
  deleteFriendRequests(idMy: number, idFriend: number): Observable<any> {
    const url = `${this.apideleFriendRequets}`;
    console.log("Gửi request DELETE đến: ", url);

    const body = { idMy, idFriend };
    console.log("Dữ liệu gửi đi:", body);

    return this.http.delete<any>(url, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: body
    });
}
=======
  deleteFriendRequets(): Observable<any> {
    const idFriend = this.getIdFriend();
    const idMy = this.userService.getCookies();
    return this.http.delete<any>(`${this.apideleFriend}/${idMy}/${idFriend}`);
  }
>>>>>>> 1a11d705946f6ac9dd81a452bf2a2245108e7da1

  // Chấp nhận lời mời kết bạn
<<<<<<< HEAD
  acceptFriend(idMy: number , idFriend: number): Observable<any> {
    return this.http.post<any>(this.apiacceptFriend, {idMy , idFriend});
=======
  acceptFriend(): Observable<any> {
    const idMy = this.userService.getCookies();
    const idFriend = this.getIdFriend();
    return this.http.post<any>(this.apiacceptFriend, { idMy, idFriend });
>>>>>>> 1a11d705946f6ac9dd81a452bf2a2245108e7da1
  }
}
