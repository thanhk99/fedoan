import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slot777',
  imports: [CommonModule, FormsModule],
  templateUrl: './slot777.component.html',
  styleUrl: './slot777.component.css'
})
export class Slot777Component {
  symbols: string[] = [
    'assets/images/7.png',
    'assets/images/bar.png',
    'assets/images/scatter.png'
  ];

  // Mảng chứa các cột quay
  reels = [
    ['assets/images/7.png', 'assets/images/bar.png', 'assets/images/scatter.png'],
    ['assets/images/bar.png', 'assets/images/7.png', 'assets/images/scatter.png'],
    ['assets/images/scatter.png', 'assets/images/7.png', 'assets/images/bar.png']
  ];

  // Hàm quay ngẫu nhiên
  spinReels() {
    this.reels = this.reels.map(reel => reel.map(() => this.getRandomSymbol()));
  }

  // Hàm chọn ảnh ngẫu nhiên
  getRandomSymbol(): string {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
