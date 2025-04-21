import { Component,OnInit } from '@angular/core';
import { userService } from '../../service/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AtmService } from '../../service/atm.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor (
    private userService: userService,
    private cookie:CookieService,
    private router: Router,
    private atmService: AtmService,
    private toastr: ToastrService
  ) { }
  fullname:any =""
  money:any=""
  ngOnInit(): void {
    if (this.router.url === '/login') {
      return;
    }
    this.userService.getUser().subscribe(
      (data)=>{
        this.fullname=data.fullname
      }
    )
    this.userService.getAtmUser(this.userService.getCookies()).subscribe(
      (data)=>{
        this.money=data.balance
      },
      (error)=>{
        this.toastr.warning("Chưa có Atm , Vui lòng tạo","Thông báo")
      }
    )
  }
  Login(){
    this.router.navigate(['/login'])
  }
  recharge(){
    this.router.navigate(['/payment'])
  }
  userInfo(){
    this.router.navigate(["/user"])
  }
}
