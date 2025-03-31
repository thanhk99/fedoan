// src/app/components/payment/payment.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService ,PaymentRequest} from '../service/payment.service';
import { FormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-payment',
  imports:[FormsModule,NgIf],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentRequest: PaymentRequest = {
    amount: 10000, // Số tiền mặc định (đơn vị VND)
    orderInfo: 'Thanh toan don hang', // Thông tin đơn hàng
    orderType: '250000' // Mã loại hàng hóa, tham khảo tài liệu VnPay
  };

  isProcessing = false;
  paymentMessage = '';
  paymentStatus = '';

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Kiểm tra xem có phải là callback từ VnPay không
    this.route.queryParams.subscribe(params => {
      if (params['vnp_ResponseCode']) {
        this.handlePaymentCallback(params);
      }
    });
  }

  // Xử lý khi người dùng nhấn nút thanh toán
  processPayment(): void {
    this.isProcessing = true;
    this.paymentMessage = 'Đang xử lý yêu cầu thanh toán...';

    this.paymentService.createPayment(this.paymentRequest).subscribe({
      next: (response) => {
        // Chuyển hướng người dùng đến trang thanh toán của VnPay
        window.location.href = response.paymentUrl;
      },
      error: (error) => {
        this.isProcessing = false;
        this.paymentMessage = 'Đã xảy ra lỗi: ' + (error.message || 'Không thể tạo yêu cầu thanh toán');
        console.error('Payment error:', error);
      }
    });
  }

  // Xử lý callback từ VnPay
  private handlePaymentCallback(params: any): void {
    // Lưu ý: Trong ứng dụng thực tế, cần xử lý callback này ở backend để đảm bảo an toàn
    if (params['vnp_ResponseCode'] === '00') {
      this.paymentStatus = 'success';
      this.paymentMessage = 'Thanh toán thành công! Mã giao dịch: ' + params['vnp_TransactionNo'];
    } else {
      this.paymentStatus = 'failed';
      this.paymentMessage = 'Thanh toán thất bại! Mã lỗi: ' + params['vnp_ResponseCode'];
    }
  }
}