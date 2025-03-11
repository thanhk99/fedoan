import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-rr',
  imports: [CommonModule, FormsModule],
  templateUrl: './rr.component.html',
  styleUrl: './rr.component.css'
})
export class RrComponent {
  money: number = 3636363636;
  isHidden: boolean = false;

  /*history: { amount: number, color: string }[] = [];*/
  history = new Array(5).fill(null);
  toggleMoney() {
    this.isHidden = !this.isHidden;
  }

  /*addHistory(amount: number) {
    const color = amount > 0 ? '#00ff00' : amount < 0 ? '#ffcc00' : '#999999'; // Xanh: thắng, Vàng: thua, Xám: 0
    this.history.unshift({ amount, color });

    // Giới hạn số lượng hiển thị tối đa (5 giao dịch gần nhất)
    if (this.history.length > 5) {
      this.history.pop();
    }
  }

  // Giả lập chơi game -> gọi hàm này khi người chơi thắng/thua
  playGame() {
    const randomAmount = Math.floor(Math.random() * 20000000) - 10000000; // -10tr đến 10tr
    this.money += randomAmount;
    this.addHistory(randomAmount);
  }*/
    grid: { revealed: boolean, type: string }[][] = [];
flatGrid: { revealed: boolean, type: string }[] = []; // Mảng 1D cho HTML
diamondProgress: number = 0;
bombProgress: number = 0;
totalDiamonds = 21;
totalBombs = 4;
gameOver = false; // Kiểm tra game kết thúc

constructor() {
  this.initializeGrid();
}

initializeGrid() {
  this.gameOver = false; // Reset trạng thái thua
  this.diamondProgress = 0;
  this.bombProgress = 0;

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

revealCell(index: number) {
  if (this.gameOver) return; // Nếu đã thua, không cho click nữa

  const cell = this.flatGrid[index];
  if (!cell.revealed) {
    cell.revealed = true;

    if (cell.type === 'diamond') {
      this.diamondProgress += 10;
      if (this.diamondProgress > 100) this.diamondProgress = 100;
    } else if (cell.type === 'bomb') {
      this.gameOver = true; // Đánh dấu thua

      // Hiển thị toàn bộ ô trước khi reset game
      setTimeout(() => {
        this.revealAllCells();
        setTimeout(() => {
          alert("Trò chơi sẽ bắt đầu lại.");
          this.initializeGrid(); // Reset game sau khi người chơi thấy toàn bộ ô
        }, 1000); // Hiển thị tất cả ô trong 1 giây trước khi reset
      }, 500); // Hiển thị bom trong 0.5 giây trước khi mở toàn bộ ô
    }
  }
}

// Hàm mở toàn bộ ô sau khi thua
revealAllCells() {
  this.flatGrid.forEach(cell => {
    cell.revealed = true;
  });
}

private shuffleArray(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}
}
