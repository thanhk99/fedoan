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
    '7purple.jpg',
    'bar.png'
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
    const targetWidth = 100; // Độ rộng cố định
    const targetHeight = 100; // Độ cao cố định

    const promises = this.symbols.map(src => this.resizeImage(src, targetWidth, targetHeight));
    this.images = await Promise.all(promises);

    console.log("✅ Ảnh đã tải và resize xong!", this.images);

    this.initReels();
    this.draw(); // Bắt đầu vẽ khi ảnh đã chuẩn bị xong
  }

  resizeImage(src: string, targetWidth: number, targetHeight: number): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d")!;

            // Đảm bảo ảnh được resize theo đúng tỉ lệ
            const aspectRatio = img.width / img.height;
            let drawWidth = targetWidth;
            let drawHeight = targetHeight;

            if (aspectRatio > 1) {
                drawHeight = targetWidth / aspectRatio;
            } else {
                drawWidth = targetHeight * aspectRatio;
            }

            const offsetX = (targetWidth - drawWidth) / 2;
            const offsetY = (targetHeight - drawHeight) / 2;

            ctx.clearRect(0, 0, targetWidth, targetHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

            // Chuyển canvas thành ảnh mới
            const resizedImg = new Image();
            resizedImg.src = canvas.toDataURL(); // Base64
            resizedImg.onload = () => resolve(resizedImg);
        };
    });
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
            let symbolIndex = Math.abs(Math.floor((reel.y / symbolHeight) + j)) % this.images.length;
            const img = this.images[symbolIndex];

            this.ctx.drawImage(img, i * reelWidth, reel.y + j * symbolHeight, reelWidth, symbolHeight);
        }

        // Xử lý chuyển động của cuộn
        if (reel.speed > 0) {
            reel.y += reel.speed;
            if (reel.y >= symbolHeight) reel.y = -symbolHeight * this.images.length;
        }
    }

    requestAnimationFrame(() => this.draw()); // Vẽ liên tục
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
        this.reels[index].speed *= 0.9; // Giảm tốc độ từ từ

        if (this.reels[index].speed < 0.5) {
            this.reels[index].speed = 0; // Dừng hẳn

            // 🎲 Căn chỉnh ảnh một cách ngẫu nhiên để đảm bảo kết quả khác nhau
            const symbolHeight = this.canvasHeight / this.numRows;
            this.reels[index].y = -Math.floor(Math.random() * this.images.length) * symbolHeight;

            clearInterval(stopInterval);
        }
    }, 50);
}

}
