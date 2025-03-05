import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { userService } from '../../service/users.service';
import { error } from 'node:console';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor (
    private userService: userService,
    private cookie:CookieService
  ) { }
  fullname:any =""
  money:any=""
  ngOnInit(): void {
    this.fullname=this.cookie.get('fullname')
    this.money=this.cookie.get('balance')
  }

}
