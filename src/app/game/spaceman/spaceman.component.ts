import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spaceman',
  imports: [CommonModule, FormsModule],
  templateUrl: './spaceman.component.html',
  styleUrls: ['./spaceman.component.css'],
})
export class SpacemanComponent {
  @Input() label1: string = 'Tùy chọn rút tiền';
  @Input() label2: string = 'Tùy chọn rút tiền 50%';
  @Input() defaultValue1: number = 2.0;
  @Input() defaultValue2: number = 1.5;

  constructor() {}

  isActive: boolean = false;
  isActive1: boolean = false;
  isActive2: boolean = false;
  bet: boolean = false;
  selectedBet: number | null = null;
  value1: number = this.defaultValue1;
  value2: number = this.defaultValue2;
  value: number = 10000000000000;
  sumbet: number = 0;
  router: any;
  betButton: string = 'Đặt cược';
  countdown: number = 0;
  isMoon: boolean = false;
  isFlying: boolean = false;
  isMoving: boolean = false;
  showWithdrawButtons: boolean = false;

  toggleSwitch() {
    this.isActive = !this.isActive;
  }
  toggleSwitch1() {
    this.isActive1 = !this.isActive1;
  }

  changeValue(step: number) {
    this.value1 = Math.max(1.0, parseFloat((this.value1 + step).toFixed(2))); // Giới hạn min 1.00
  }
  changeValue1(step: number) {
    this.value2 = Math.max(1.0, parseFloat((this.value2 + step).toFixed(2))); // Giới hạn min 1.00
  }

  betAmounts: number[] = [
    5000, 25000, 50000, 125000, 250000, 500000, 1000000, 2500000,
  ];
  startIndex: number = 0; // Chỉ mục bắt đầu hiển thị

  // Lấy danh sách 3 số hiển thị hiện tại
  get visibleBets(): number[] {
    return this.betAmounts.slice(this.startIndex, this.startIndex + 3);
  }

  moveRight() {
    if (this.startIndex < this.betAmounts.length - 3) {
      this.startIndex++;
    }
  }

  moveLeft() {
    if (this.startIndex > 0) {
      this.startIndex--;
    }
  }
  selectBet(bet: number) {
    this.isActive2 = !this.isActive2;
    this.selectedBet = bet;
  }
  betchoice() {
    // let sound = new Audio('http://localhost:4200/NhacXoSo-VA_4512353.mp3');
    // sound.play();
    let audio = new Audio('mucsic.mp3');
    audio.load();

    if (this.betButton === 'Hủy đặt cược') {
      const result = confirm('Bạn có chắc chắn muốn hủy đặt cược?');
      if (result) {
        this.selectedBet = null;
        this.betButton = 'Đặt cược';
        this.countdown = 0;
        return;
      } else {
        return;
      }
    }

    if (this.selectedBet !== null) {
      if (this.value > this.selectedBet) {
        this.value -= this.selectedBet;
        this.sumbet += this.selectedBet;
        alert(`Bạn đã cược ${this.selectedBet} VND`);
        this.selectedBet = null;
      } else {
        alert('Số tiền cược không đủ');
        return;
      }
    } else {
      alert('Vui lòng chọn số tiền cược');
      return;
    }

    if (this.betButton === 'Đặt cược') {
      this.betButton = 'Hủy đặt cược';
      this.countdown = 5;
    }

    const countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(countdownInterval);
        this.betButton = 'Đặt cược thành công';
        audio.play();
        this.isFlying = true; // Kích hoạt trạng thái bay của phi hành gia
        this.isMoon = true; // Thay đổi hình ảnh của phi thuyền thành mặt trăng
        this.isMoving = true;
        setTimeout(() => {
          this.betButton = 'Đặt cược';
          audio.pause();
          this.isFlying = false; // Tắt trạng thái bay của phi hành gia sau khi hoàn thành
          this.isMoon = false; // Đặt lại hình ảnh của phi thuyền
          this.isMoving = false;
        }, 5000); // 2 seconds to show "Đặt cược thành công"
      }
    }, 1000); // Cập nhật mỗi giây
  }

  withdraw() {
    // Logic for withdrawing money
    alert('Bạn đã rút tiền thành công');
  }

  withdraw50() {
    // Logic for withdrawing 50% money
    alert('Bạn đã rút 50% tiền thành công');
  }

  exit() {
    const result = confirm('Bạn có chắc chắn muốn tiếp tục?');
    if (result) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/game/spaceman']);
    }
  }
}
