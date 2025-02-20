import { Component, OnInit } from '@angular/core';
import { usesService } from '../service/users.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  standalone : true,
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email:string ="";
  password:string="";
  fullname: string =""
  constructor(
    private http:HttpClient,
    private usesService :usesService
  ) { }

  onSubmit() {
    console.log(this.email)
    console.log(this.password)
  }
  ngOnInit(){
    this.loadUser()
  }
  loadUser(){
    this.usesService.getUsers().subscribe(
      (data) =>{
        console.log(data)
      },
      (error) =>{
        console.log(error)
      }
    )
  }
}
