import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-slot777',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './slot777.component.html',
  styleUrl: './slot777.component.css'
})
export class Slot777Component {
  @ViewChild('slotCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;

  // Kích thước canvas
  canvasWidth = 500;
  canvasHeight = 300;

  // Số cột (reels) và số hàng (rows)
  numReels = 5;
  numRows = 3;

  symbols= [
    '7red.png',
    '7blue.png',
    '7green.png',
    '7yellow.png',
    'bar.jpg',
  ];
  images: HTMLImageElement[] = [];

  // Tọa độ của các cuộn
  reels: { y: number; speed: number }[] = [];

  constructor() {}

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = this.canvasWidth;
    canvas.height = this.canvasHeight;

    // Tải ảnh và khởi tạo game
    this.loadImages().then(() => {
      this.initReels();
      this.draw();
    });
  }

  // Tải ảnh vào bộ nhớ trước khi hiển thị
  async loadImages() {
    const promises = this.symbols.map(src => this.loadImage(`${src}`));
    this.images = await Promise.all(promises);
    console.log("✅ Ảnh đã tải xong!", this.images);
    
    this.initReels();
    this.draw(); //  Gọi lại hàm vẽ
  }

  // Tạo cuộn với vị trí và tốc độ ngẫu nhiên
  initReels() {
    for (let i = 0; i < this.numReels; i++) {
      this.reels.push({ y: Math.random() * -200, speed: 0 });
    }
  }

  // Hàm tải ảnh
  loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
    });
  }

  // Hàm vẽ slot machine
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  
    const reelWidth = this.canvasWidth / this.numReels;
    const symbolHeight = this.canvasHeight / this.numRows;
  
    for (let i = 0; i < this.numReels; i++) {
      const reel = this.reels[i];
  
      for (let j = 0; j < this.numRows + 1; j++) {
        const symbolIndex = Math.floor(Math.abs(reel.y / symbolHeight) + j) % this.images.length;
        const img = this.images[symbolIndex] || this.images[0]; // Tránh lỗi undefined
        
  
        this.ctx.drawImage(img, i * reelWidth, reel.y + j * symbolHeight, reelWidth, symbolHeight);
      }
  
      // Di chuyển cuộn
      reel.y += reel.speed;
      if (reel.y >= symbolHeight) reel.y = -symbolHeight * this.images.length;
    }
  
    requestAnimationFrame(() => this.draw());
  }

  // Khi nhấn "SPIN"
  spin() {
    console.log("🔄 Đang quay slot:", this.reels);
    this.reels.forEach((reel, index) => {
      reel.speed = 10 + Math.random() * 5; // Tốc độ ngẫu nhiên
      setTimeout(() => this.stopReel(index), 3000 + index * 500); // Dừng từng cuộn một
    });
  }

  // Khi dừng từng cuộn
  stopReel(index: number) {
    let stopInterval = setInterval(() => {
      this.reels[index].speed *= 0.9; // Giảm tốc độ dần dần
      if (this.reels[index].speed < 0.5) {
        this.reels[index].speed = 0;
        clearInterval(stopInterval);
      }
    }, 50);
  }
  
}
