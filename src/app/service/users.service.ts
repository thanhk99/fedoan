import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root'
})
export class userService {
  private apiLogin= 'http://localhost:8082/user/login'; // Thay đổi URL cho phù hợp
  private apiGetInfo= "http://localhost:8082/user/info"
  constructor(private http: HttpClient,
              private cookieService: CookieService
  ) {}
  login(account:string, password:string) : Observable<any>{
    const body={"tk":account,"mk":password}
    return this.http.post(this.apiLogin,body);
  }
  getUser(){
    return this.http.get(this.apiGetInfo,{ withCredentials: true });
  }
  getCookies(){
    return this.cookieService.get('id');
  }
}