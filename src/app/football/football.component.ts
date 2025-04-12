import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';
import { userService } from '../service/users.service';
import { AtmService } from '../service/atm.service';
@Component({
  selector: 'app-football',
  imports: [CommonModule, FormsModule],
  templateUrl: './football.component.html',
  styleUrl: './football.component.css'
})
export class FootballComponent {
  matches: any[] = [];
  betAmount: number = 1000; // Số tiền cược mặc định
  money: number = 0; // Số tiền cược cho mỗi trận

  apiFootball=environment.apiFootball
    
    constructor (
      private router:Router,
      private http :HttpClient,
      private userService: userService,
      private atmService: AtmService, // Injecting atmService
    ) { }


      ngOnInit() {
        this.fetchMatches();
        this.money = parseInt(this.userService.getBalanceCookies());
      }

      private fetchMatches() {
        const dayStart = format(new Date(Date.now() - 86400000*4), 'yyyy-MM-dd'); 
        const dayEnd = format(new Date(Date.now() + 86400000 * 4), 'yyyy-MM-dd'); 
        const apiUrl = `${this.apiFootball}?dateFrom=${dayStart}&dateTo=${dayEnd}`;
        console.log("ok");
        const headers = new HttpHeaders({
          'X-Auth-Token': environment.keyFootball
        });
    
        this.http.get(apiUrl, { headers }).subscribe(
          (data: any) => {
            this.matches = data.matches.map((match: any) => ({
              ...match,
              prediction: { // Khởi tạo prediction cho mỗi trận
                home: 0,
                away: 0
              },
              betAmount: 0 // Khởi tạo betAmount cho mỗi trận
            })) || [];
            console.log(data);
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
      
      placeBet(match: any) {
        if (parseInt(this.userService.getBalanceCookies()) >= this.betAmount) {
          let amount = 0 ;
          amount = - this.betAmount;
          this.money -= this.betAmount;
          
          // Cập nhật số dư trong giao diện ( Tìm phần tử có class "gold" và cập nhật nội dung của nó)
          const goldElement = document.querySelector('.gold');
          if (goldElement) {
              goldElement.innerHTML = this.money.toString();
          }
          // Cập nhật số dư trong cookie
          this.userService.setBalanceCookies(this.money.toString());

          // Gọi API cập nhật số dư
          this.atmService.updateBalan(amount, this.userService.getCookies()).subscribe(response => {
            console.log('Đã trừ tiền cược', response);
            alert("Đặt cược thành công!");
          }, error => {
            console.error('Lỗi cập nhật số dư:', error);
            alert("Có lỗi xảy ra khi trừ tiền. Vui lòng thử lại.");
          });

          
      }
      else {
        alert("Bạn không đủ tiền để đặt cược!");  
      }
    }



}
