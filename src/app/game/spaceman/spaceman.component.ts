import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { Howl } from 'howler';
=======
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268

@Component({
  selector: 'app-spaceman',
  imports: [CommonModule, FormsModule],
  templateUrl: './spaceman.component.html',
<<<<<<< HEAD
  styleUrls: ['./spaceman.component.css']
=======
  styleUrls: ['./spaceman.component.css'],
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268
})
export class SpacemanComponent {
  @Input() label1: string = 'Tùy chọn rút tiền';
  @Input() label2: string = 'Tùy chọn rút tiền 50%';
<<<<<<< HEAD
  @Input() defaultValue1: number = 2.00;
  @Input() defaultValue2: number = 1.50;

  constructor(private router: Router) {}
=======
  @Input() defaultValue1: number = 2.0;
  @Input() defaultValue2: number = 1.5;

  constructor() {}
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268

  isActive: boolean = false;
  isActive1: boolean = false;
  isActive2: boolean = false;
  bet: boolean = false;
  selectedBet: number | null = null;
  value1: number = this.defaultValue1;
  value2: number = this.defaultValue2;
  value: number = 10000000000000;
  sumbet: number = 0;
<<<<<<< HEAD
=======
  router: any;
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268
  betButton: string = 'Đặt cược';
  countdown: number = 0;
  isMoon: boolean = false;
  isFlying: boolean = false;
  isMoving: boolean = false;
  showWithdrawButtons: boolean = false;
  multiplier: number = 1.0;
  multiplierInterval: any;
  hasWithdrawn: boolean = false;
  betTimeout: any;

  audio = new Audio('mucsic.mp3');
  loadAudio() {
    this.audio.load(); 
  }
  playAudio() {
    this.audio.play();
  }
  pouseAudio() {
    this.audio.pause(); 
  }

  toggleSwitch() {
    this.isActive = !this.isActive;
  }

  toggleSwitch1() {
    this.isActive1 = !this.isActive1;
  }

  changeValue(step: number) {
<<<<<<< HEAD
    this.value1 = Math.max(1.00, parseFloat((this.value1 + step).toFixed(2))); // Giới hạn min 1.00
=======
    this.value1 = Math.max(1.0, parseFloat((this.value1 + step).toFixed(2))); // Giới hạn min 1.00
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268
  }

  changeValue1(step: number) {
<<<<<<< HEAD
    this.value2 = Math.max(1.00, parseFloat((this.value2 + step).toFixed(2))); // Giới hạn min 1.00
=======
    this.value2 = Math.max(1.0, parseFloat((this.value2 + step).toFixed(2))); // Giới hạn min 1.00
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268
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
<<<<<<< HEAD


  startMultiplier() {
    this.multiplier = 1.0;
    this.hasWithdrawn = false;
    const stopAt = parseFloat((Math.random() * 19 + 1).toFixed(1)); // Dừng ngẫu nhiên từ 1.0 đến 20.0
    this.multiplierInterval = setInterval(() => {
      this.multiplier = parseFloat((this.multiplier + 0.1).toFixed(1));
      if (this.multiplier >= stopAt) {
        this.stopMultiplier();
        clearTimeout(this.betTimeout); // Dừng setTimeout khi hệ số nhân dừng lại
      }
    }, 100); // Tăng số nhân mỗi 100ms

    // Tính toán thời gian dừng dựa trên hệ số nhân ngẫu nhiên
    const stopTime = stopAt * 1000; // Chuyển đổi hệ số nhân thành thời gian dừng (ms)
    this.betTimeout = setTimeout(() => {
      this.betButton = 'Đặt cược';
      this.isFlying = false; // Tắt trạng thái bay của phi hành gia sau khi hoàn thành
      this.isMoon = false; // Đặt lại hình ảnh của phi thuyền
      this.isMoving = false;
      // this.multiplier = 1.0;
    }, stopTime);
  }
  stopMultiplier() {
    clearInterval(this.multiplierInterval);
    clearTimeout(this.betTimeout); // Dừng setTimeout khi hệ số nhân dừng lại
    if (!this.hasWithdrawn) {
      alert('Bạn đã thua cược vì không rút tiền kịp thời!');
      this.showWithdrawButtons = false;
      this.multiplier = 1.0;
      this.selectedBet = null;
      this.countdown = 0;
      this.pouseAudio();
      this.betButton = 'Đặt cược';

    }
    this.isFlying = false; // Tắt trạng thái bay của phi hành gia sau khi hoàn thành
    this.isMoon = false; // Đặt lại hình ảnh của phi thuyền
    this.isMoving = false;
    // this.multiplier = 1.0;
  }

  betchoice() {
=======
  betchoice() {
    // let sound = new Audio('http://localhost:4200/NhacXoSo-VA_4512353.mp3');
    // sound.play();
    let audio = new Audio('mucsic.mp3');
    audio.load();
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268

    if (this.betButton === 'Hủy đặt cược') {
      const result = confirm('Bạn có chắc chắn muốn hủy đặt cược?');
      if (result) {
        this.selectedBet = null;
        this.betButton = 'Đặt cược';
        this.countdown = 0;
        this.showWithdrawButtons = false; // Ẩn các nút rút tiền khi hủy đặt cược
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
        this.playAudio();
        // this.hasWithdrawn = true;
        this.isFlying = true; // Kích hoạt trạng thái bay của phi hành gia
        this.isMoon = true; // Thay đổi hình ảnh của phi thuyền thành mặt trăng
        this.isMoving = true;
        this.showWithdrawButtons = true; // Hiển thị các nút rút tiền sau khi đếm ngược kết thúc

        // Bắt đầu hiển thị số nhân
        this.startMultiplier();
        // audio.pause();
      }
    }, 1000); // Cập nhật mỗi giây
  }

  withdraw() {
    if(this.hasWithdrawn = true)
    {
    
      this.stopMultiplier();
      const winnings = (this.selectedBet ?? 0) * this.multiplier;
      this.value += winnings;
      alert(`Bạn đã rút tiền thành công và nhận được ${winnings} VND`);
      this.hasWithdrawn = false;
      this.isMoving = false;
      this.pouseAudio();
      this.showWithdrawButtons = false;
      this.multiplier = 1.0;
      this.betButton = 'Đặt cược';
      this.router.navigate(['/game/spaceman']); // Điều hướng về trang chủ game Spaceman
    }
  }

  withdraw50() {
    this.hasWithdrawn = true;
    this.stopMultiplier();
    const winnings = (this.selectedBet ?? 0 * this.multiplier) / 2;
    this.value += winnings;
    alert(`Bạn đã rút 50% tiền thành công và nhận được ${winnings} VND`);
    this.hasWithdrawn = false;
    this.isMoving = false;
    this.pouseAudio();
    this.showWithdrawButtons = false;
    this.multiplier = 1.0;
    this.betButton = 'Đặt cược';
    this.router.navigate(['/game/spaceman']); // Điều hướng về trang chủ game Spaceman
  }

  exit() {
<<<<<<< HEAD
    const result = confirm("Bạn có chắc chắn muốn tiếp tục?");
=======
    const result = confirm('Bạn có chắc chắn muốn tiếp tục?');
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268
    if (result) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/game/spaceman']);
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> 9b7508b7bcf70698d21ea8316aea3fb236fa2268
