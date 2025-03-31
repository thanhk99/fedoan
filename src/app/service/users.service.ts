import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endWith, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';
@Injectable({
  providedIn: 'root',
})
export class userService {
  private apiLogin = environment.apiLogin;
  private apiGetInfo = environment.apiGetInfo;
  private apiGetAtm = environment.apiGetAtm;
  private apiSearchFullname = environment.apiSearchFullname;
  private username: any = '';
  private apiSearch = environment.apiSearchFullname;
  private keySecret: string = environment.keysecret;
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  login(account: string, password: string): Observable<any> {
    const body = { tk: account, mk: password };
    return this.http.post(this.apiLogin, body);
  }
  getFullname(fullname: string): Observable<{ id: number; fullname: string }[]> {
    const body = { fullname };
    return this.http.post<{ id: number; fullname: string }[]>(this.apiSearch, body);
}


  getUser():Observable<any>{
    const id =this.getCookies()
    const body={id:id}
    return this.http.post(this.apiGetInfo, { params: body });
  }

  getAtmUser(id: any): Observable<any> {
    const body = { idPlayer: id };
    return this.http.post(this.apiGetAtm, body);
  }
  getCookies() {
    return this.decryptData(this.cookieService.get('id'));
  }
  getNameCookies() {
    let tempName = this.cookieService.get('fullname');
    return this.decryptData(tempName);
  }
  getBalanceCookies() {
    let tempBalance = this.cookieService.get('balance');
    return this.decryptData(tempBalance);
  }
  setUserName(fullname: any) {
    this.username = fullname;
  }

  saveBetHis(
    namegame: any,
    playerId: any,
    rs: any,
    bet: any,
    reward: any,
    choice: any
  ) {
    let time = new Date().getTime();
    const formattedDate = format(time, 'yyyy-MM-dd HH:mm:ss');
    const body = {
      nameGame: namegame,
      playerId: playerId,
      timeoccurs: formattedDate,
      result: rs,
      bet: bet,
      reward: reward,
      choice: choice,
    };
    return this.http.post(environment.apiSaveHisPlayer, body);
  }
  encryptData(dataEncrypt: any) {
    if (typeof dataEncrypt !== 'string' || dataEncrypt.trim() === '') {
      console.error('Dữ liệu đầu vào không hợp lệ');
    }
    return CryptoJS.AES.encrypt(dataEncrypt, this.keySecret).toString();
  }
  decryptData(dataEncrypt: any) {
    const bytes = CryptoJS.AES.decrypt(dataEncrypt, this.keySecret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
