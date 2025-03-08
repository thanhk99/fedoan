import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-leftside',
  imports: [],
  templateUrl: './leftside.component.html',
  styleUrl: './leftside.component.css'
})
export class LeftsideComponent {
  constructor(
    private cookieService: CookieService
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
}
