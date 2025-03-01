import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { userService } from '../../service/users.service';
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor (private userService: userService) { }
  fullname:any =""
  ngOnInit(): void {
      this.loadUser()
  }
  loadUser(){
    this.userService.getUser().subscribe(
      (data:any)=>{
        this.fullname=data.fullname
        console.log(this.fullname)
      },
      error=>{
        console.log(error)
      }
    )
  }
}
