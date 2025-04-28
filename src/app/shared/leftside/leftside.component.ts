import { Component, HostListener, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leftside',
  imports: [CommonModule, FormsModule],
  templateUrl: './leftside.component.html',
  styleUrls: ['./leftside.component.css'],
})
export class LeftsideComponent implements OnInit{
  constructor(private cookieService: CookieService, private route: Router) {}
  isSidebarActive = false;
  isMobile = false;
  ngOnInit(): void {
    this.checkScreenSize();
  }
  logout() {
    const allCookies = this.cookieService.getAll();
    for (const cookie in allCookies) {
      if (allCookies.hasOwnProperty(cookie)) {
        this.cookieService.delete(cookie);
      }
    }
    localStorage.clear();
    location.reload();
  }
  MessagePage() {
    this.route.navigate(['/message']);
  }
  MenuGame() {
    this.route.navigate(['/menugame']);
  }
  HomePage() {
    this.route.navigate(["/"]);
  }
  TransPage(){
    this.route.navigate(['/atm/transfer'])
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth <= 768 && window.innerHeight<= 450;
    if (!this.isMobile) {
      this.isSidebarActive = false; // Ensure sidebar is not active on desktop
    }
  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }
  private closeSidebar(): void {
    if (this.isMobile) {
      this.isSidebarActive = false;
    }
  }
}
