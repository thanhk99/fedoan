import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { LeftsideComponent } from './shared/leftside/leftside.component';
import { RightsideComponent } from './shared/rightside/rightside.component';
import { userService } from './service/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    LeftsideComponent,
    RightsideComponent,
    LoginComponent,
    NgIf,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  stock:any={}
  // message:any=""
  constructor(
    private route: Router,
    private userService: userService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.userService.getCookies() === '') {
      this.router.navigate(['/login']);
    }
  }

  isLoginPage(): boolean {
    return this.route.url === '/login';
  }
}
