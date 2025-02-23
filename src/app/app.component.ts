import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from "./shared/leftside/leftside.component";
import { RightsideComponent } from "./shared/rightside/rightside.component";
@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet, HeaderComponent, LeftsideComponent, RightsideComponent],
=======
  imports: [RouterOutlet, HeaderComponent, LoginComponent, NgIf],
>>>>>>> 8329f1fc7d918ee2da28575058418bb988bfb68d
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private route: Router) {}

  isLoginPage(): boolean {
    return this.route.url === '/login';
  }
  // ngOnInit() {
  // this.webSocket = new WebSocket('ws://localhost:8082/users/send');
  // this.webSocket.onmessage = (event) => {
  //   try {
  //     const data = JSON.parse(event.data);
  //     this.message = data.message;
  //   } catch (e) {
  //     this.message = event.data;
  //   }
  // };
  // this.webSocket.onerror = (error) => {
  //   console.error('Lỗi WebSocket:', error);
  // };
}
