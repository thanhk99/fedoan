import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { endWith, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class userService {
  private apiLogin= environment.apiLogin; 
  private apiGetInfo= environment.apiGetInfo;
  private apiGetAtm=environment.apiGetAtm;
  private username:any =''
  private keySecret :string ='anhthanhdz'
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
  getAtmUser(id:any) : Observable<any>{
    const body ={"idPlayer":id}
    return this.http.post(this.apiGetAtm,body)
  }
  getCookies(){
    return this.decryptData(this.cookieService.get('id'))
  }
  getNameCookies(){
    let tempName=this.cookieService.get('fullname')
    return this.decryptData(tempName)
  }
  getBalanceCookies(){
    let tempBalance=this.cookieService.get('balance')
    return this.decryptData(tempBalance)
  }
  setUserName(fullname:any){
    this.username = fullname;
  }

  saveBetHis(namegame:any,playerId:any,time:any,rs:any,bet:any,reward:any,choice:any){
    const body ={"nameGame":namegame,"playerId":playerId,"timeoccurs":time,"result":rs,"bet":bet,"reward":reward,"choice":choice}
    return this.http.post(environment.apiSaveHisPlayer,body)
  }

  encryptData(dataEncrypt:any) {
    if (typeof dataEncrypt !== 'string' || dataEncrypt.trim() === '') {
      console.error('Dữ liệu đầu vào không hợp lệ');
    }
    return CryptoJS.AES.encrypt(dataEncrypt, this.keySecret).toString();
  }
  decryptData(dataEncrypt:any) {
    const bytes = CryptoJS.AES.decrypt(dataEncrypt, this.keySecret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}