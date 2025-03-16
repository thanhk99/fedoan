import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-rr',
  imports: [CommonModule, FormsModule],
  templateUrl: './rr.component.html',
  styleUrl: './rr.component.css',
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' }))
      ])
    ])
  ]
})
export class RrComponent {
  money: number = 10000000000;
  betAmount: number = 50000;
  totalBombs: number = 4;
  isHidden: boolean = false;
  multipliers: number[] = [1.13, 1.38, 1.64, 2.01, 2.48, 3.1, 3.93, 5.05, 6.6, 8.8, 12.5, 14.5, 18.7, 22.9, 25.2];
  multiplierIndex: number = -1;
  lastWinning: number = 0;
  grid: { revealed: boolean; type: string }[][] = [];
  flatGrid: { revealed: boolean; type: string }[] = [];
  gameOver: boolean = false;
  diamondsCollected: number = 0;
  diamondProgress: number = 0;
  bombProgress: number = 0;
  
  history: { bet: number; winnings: number }[] = [];
  
  diamondSound = new Audio('diamond.mp3');
  bombSound = new Audio('bomb.mp3');

  // Trạng thái game
  gameStarted: boolean = false;  // Đã bấm cược chưa
  firstReveal: boolean = false;  // Đã mở ô đầu tiên chưa

  constructor() {
    this.initializeGrid();
  }

  toggleMoney() {
    this.isHidden = !this.isHidden;
  }

  initializeGrid() {
    this.gameOver = false;
    this.diamondsCollected = 0;
    this.lastWinning = 0;
    this.multiplierIndex = -1;
    this.diamondProgress = 0;
    this.bombProgress = 0;
    this.firstReveal = false;

    this.grid = Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => ({ revealed: false, type: 'unknown' }))
    );

    let items = Array(25).fill('diamond');
    items.fill('bomb', 0, this.totalBombs);
    items = this.shuffleArray(items);

    this.flatGrid = [];
    this.grid.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.type = items[i * 5 + j];
        this.flatGrid.push(cell);
      });
    });
  }

  adjustBet(action: string) {
    if (!this.gameStarted) {  // Chỉ chỉnh khi chưa cược
      if (action === 'half' && this.betAmount > 50000) {
        this.betAmount = Math.floor(this.betAmount / 2);
      } else if (action === 'double' && this.betAmount * 2 <= this.money) {
        this.betAmount *= 2;
      }
    }
  }

  changeBombs(change: number) {
    if (!this.gameStarted) {  // Chỉ chỉnh khi chưa cược
      const newTotal = this.totalBombs + change;
      if (newTotal >= 1 && newTotal <= 10) {
        this.totalBombs = newTotal;
        this.initializeGrid();
      }
    }
  }

  placeBet() {
    if (this.gameStarted) return; // Không cho phép cược lại khi chưa kết thúc ván trước

    if (this.money >= this.betAmount) {
      this.money -= this.betAmount;
      this.gameStarted = true;
      this.initializeGrid();
    } else {
      alert("Không đủ tiền để đặt cược!");
    }
  }

  revealCell(index: number) {
    if (this.gameOver || !this.gameStarted) return;
  
    const cell = this.flatGrid[index];
    if (!cell.revealed) {
      cell.revealed = true;
      this.firstReveal = true;
  
      if (cell.type === 'diamond') {
        this.diamondsCollected++;
        this.playSound(this.diamondSound);
  
        this.multiplierIndex++;
        
        // Cập nhật currentMultiplierIndex để chuyển sang dãy hệ số mới
        this.currentMultiplierIndex = Math.floor(this.multiplierIndex / 5) * 5;
  
        if (this.multiplierIndex >= this.multipliers.length) {
          this.multiplierIndex = this.multipliers.length - 1;
        }
  
        this.lastWinning = Math.floor(this.betAmount * this.multipliers[this.multiplierIndex]);
  
        this.diamondProgress = (this.diamondsCollected / (25 - this.totalBombs)) * 100;
      } 
      else if (cell.type === 'bomb') {
        this.gameOver = true;
        this.gameStarted = false;
        this.playSound(this.bombSound);
  
        setTimeout(() => {
          this.revealAllCells();
          setTimeout(() => {
            alert("Bạn thua! Trò chơi sẽ bắt đầu lại.");
            this.initializeGrid();
          }, 1000);
        }, 500);
        // Thêm vào lịch sử chơi
        this.history.unshift({ bet: this.betAmount, winnings: 0 });
          if (this.history.length > 10) {
          this.history.pop();
        }
      }
    }
  }

  autoPick() {
    if (this.gameOver || !this.gameStarted) return;

    let unrevealedCells = this.flatGrid.filter(cell => !cell.revealed);
    if (unrevealedCells.length > 0) {
      let randomIndex = Math.floor(Math.random() * unrevealedCells.length);
      let selectedIndex = this.flatGrid.indexOf(unrevealedCells[randomIndex]);
      this.revealCell(selectedIndex);
    }
  }

  cashOut() {
    if (!this.gameOver && this.lastWinning > 0 && this.firstReveal) {
      this.money += this.lastWinning;
      this.history.unshift({ bet: this.betAmount, winnings: this.lastWinning });
  
      if (this.history.length > 10) {
        this.history.pop();
      }
  
      this.revealAllCells(); // Mở tất cả các ô khi nhấn nút nhận tiền
  
      this.gameStarted = false; // Kết thúc ván cược
      setTimeout(() => {
        this.initializeGrid(); // Khởi tạo lại bảng sau khi mở hết các ô
      }, 1000);
    }
  }

  currentMultiplierIndex: number = 0;

  getVisibleMultipliers() {
    const start = this.calculateStartIndex(this.multiplierIndex);
    return this.multipliers.slice(start, start + 5);
  }

  calculateStartIndex(index: number): number {
    return (index / 5 | 0) * 5; // Thay thế Math.floor bằng phép dịch bit
  }

  nextMultipliers() {
    if (this.currentMultiplierIndex + 5 < this.multipliers.length) {
    this.currentMultiplierIndex += 5;
    }
  }

  prevMultipliers() {
    if (this.currentMultiplierIndex >= 5) {
    this.currentMultiplierIndex -= 5;
    }
  }

  getActiveIndex(i: number): number {
    return i + Math.max(0, this.multiplierIndex - 4);
  }

  revealAllCells() {
    this.flatGrid.forEach(cell => cell.revealed = true);
  }

  playSound(audio: HTMLAudioElement) {
    audio.currentTime = 0;
    audio.play();
  }

  private shuffleArray(array: string[]) {
    return array.sort(() => Math.random() - 0.5);
  }
  

}
