// payment-result.component.ts
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtmService } from '../service/atm.service';
import { userService } from '../service/users.service';
@Component({
  selector: 'app-payment-result',
  imports: [NgIf],
  styleUrls: ['./payment-result.component.css'],
  templateUrl:'./payment-result.component.html' 
})
export class PaymentResultComponent implements OnInit {
  responseCode = '';
  responseMessage = '';
  amount = 0;
  constructor(
    private route: ActivatedRoute,
    private atmService: AtmService,
    private userService: userService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params:any) => {
      console.log(params.vnp_Amount);
      this.responseCode = params['vnp_ResponseCode'];
      this.responseMessage = params.message;
      this.amount = params.vnp_Amount ? parseInt(params.vnp_Amount) / 100 : 0; // Chia cho 100 để chuyển đổi từ VND sang VNĐ
      this.userService.setBalanceCookies(parseInt(this.userService.getBalanceCookies()) + this.amount)
      this.atmService.saveHisBalance(this.userService.getCookies(),"Nạp tiền",this.amount,this.userService.getBalanceCookies()).subscribe((response:any) => {
        console.log('Lưu lịch sử thành công:', response);
      }
      , (error:any) => {
        console.log('Lưu lịch sử thất bại:', error);
      }
      );
      this.atmService.updateBalan(this.amount,this.userService.getCookies()).subscribe(
        (response:any) => {
          console.log('Cập nhật số dư thành công:', response);
        },
        (error:any) => {
          console.log('Cập nhật số dư thất bại:', error);
        }
      )
    });

  }
}