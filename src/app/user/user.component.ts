import { Component } from '@angular/core';
import { userService } from '../service/users.service';
@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(
    private userService: userService,
  ){}
  fullname:any
  money:any
  numberFriend:any=0
  ngOnInit(): void {
    this.fullname=this.userService.getNameCookies()
    this.money=this.userService.getBalanceCookies()
  }
}
