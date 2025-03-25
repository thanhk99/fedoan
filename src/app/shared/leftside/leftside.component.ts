import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftside',
  imports: [CommonModule],
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.css']
})
export class LeftsideComponent {
  constructor(
    private cookieService: CookieService,
    private route: Router
  ){}
  logout(){
    const allCookies = this.cookieService.getAll();
    for (const cookie in allCookies) {
      if (allCookies.hasOwnProperty(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    location.reload()
  }
  MessagePage() {
    this.route.navigate(["/message"]);
  }
}
