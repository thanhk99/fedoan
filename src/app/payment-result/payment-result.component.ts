// payment-result.component.ts
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-result',
  imports: [NgIf],
  templateUrl:'./payment-result.component.html' 
})
export class PaymentResultComponent implements OnInit {
  responseCode = '';
  responseMessage = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.responseCode = params['vnp_ResponseCode'];
      this.responseMessage = params['vnp_Message'];
    });

  }
}