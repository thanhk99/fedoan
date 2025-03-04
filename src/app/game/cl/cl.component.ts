import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cl',
  imports: [CommonModule],
  templateUrl: './cl.component.html',
  styleUrls: ['./cl.component.css'],
})
export class ClComponent implements OnInit {
  @ViewChild('draggable', { static: true }) draggableElement!: ElementRef;
  @ViewChild('countdown', { static: true }) countdownElement!: ElementRef;
  @ViewChild('dice1', { static: true }) diceElement!: ElementRef;
  @ViewChild('chan', { static: true }) chanElement!: ElementRef;
  @ViewChild('le', { static: true }) leElement!: ElementRef;
  @ViewChild('cuoc_chan', { static: true }) cuoc_chanElement!: ElementRef;
  @ViewChild('cuoc_le', { static: true }) cuoc_leElement!: ElementRef;
  @ViewChild('betvalua_chan', { static: true })
  betvalua_chanElement!: ElementRef;
  @ViewChild('betvalua_le', { static: true })
  betvalua_leElement!: ElementRef;

  isCountingDown: boolean = false;
  isDragging: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;
  initialPosition: { x: number; y: number } = { x: 0, y: 0 };

  constructor() {}

  ngOnInit(): void {
    this.initialPosition = {
      x: this.draggableElement.nativeElement.offsetLeft,
      y: this.draggableElement.nativeElement.offsetTop,
    };
    this.startCountdown(15, this.countdownElement.nativeElement);
  }

  startCountdown(duration: number, display: HTMLElement): void {
    this.isCountingDown = true;
    this.draggableElement.nativeElement.classList.add('disabled');

    let timer = duration;
    const interval = setInterval(() => {
      const minutes = Math.floor(timer / 60);
      let seconds = timer % 60;

      const stringSeconds: string =
        seconds < 10 ? '0' + seconds : seconds.toString();
      display.textContent = stringSeconds;

      if (--timer < 0) {
        clearInterval(interval);
        this.isCountingDown = false;
        this.draggableElement.nativeElement.classList.remove('disabled');
        this.randomDice();
        setTimeout(() => {
          this.startCountdown(duration, display);
          this.resetPosition();
        }, 15000);
      }
    }, 1000);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    if (!this.isCountingDown) {
      this.isDragging = true;
      this.draggableElement.nativeElement.style.cursor = 'grabbing';
      this.offsetX =
        event.clientX - this.draggableElement.nativeElement.offsetLeft;
      this.offsetY =
        event.clientY - this.draggableElement.nativeElement.offsetTop;
    } else {
      event.preventDefault();
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging && !this.isCountingDown) {
      this.draggableElement.nativeElement.style.left = `${
        event.clientX - this.offsetX
      }px`;
      this.draggableElement.nativeElement.style.top = `${
        event.clientY - this.offsetY
      }px`;
    }
  }

  @HostListener('mouseup')
  onMouseUp(): void {
    if (this.isDragging) {
      this.isDragging = false;
      if (!this.isCountingDown) {
        this.draggableElement.nativeElement.style.cursor = 'grab';
      }
    }
  }

  resetPosition(): void {
    this.draggableElement.nativeElement.style.left = `${this.initialPosition.x}px`;
    this.draggableElement.nativeElement.style.top = `${this.initialPosition.y}px`;
  }

  rollDice(random: number): void {
    let transformValue: string;
    switch (random) {
      case 1:
        transformValue = 'rotateX(0deg) rotateY(0deg)';
        break;
      case 2:
        transformValue = 'rotateX(-90deg) rotateY(0deg)';
        break;
      case 3:
        transformValue = 'rotateX(0deg) rotateY(90deg)';
        break;
      case 4:
        transformValue = 'rotateX(0deg) rotateY(-90deg)';
        break;
      case 5:
        transformValue = 'rotateX(90deg) rotateY(0deg)';
        break;
      case 6:
        transformValue = 'rotateX(180deg) rotateY(0deg)';
        break;
      default:
        transformValue = 'rotateX(0deg) rotateY(0deg)';
        break;
    }

    const animation: Keyframe[] = [
      { transform: 'rotateX(0deg) rotateY(0deg)' },
      { transform: 'rotateX(720deg) rotateY(720deg)' },
      { transform: transformValue },
    ];

    const timing: KeyframeAnimationOptions = {
      duration: 4000,
      iterations: 1,
      fill: 'forwards',
      easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
    };
    const diceAnimation = this.diceElement.nativeElement.animate(
      animation,
      timing
    );
    diceAnimation.addEventListener('finish', () => {
      console.log('Animation finished');
      if (random % 2 === 0) {
        this.chanElement.nativeElement.classList.add('blink-animation');
        setTimeout(() => {
          this.chanElement.nativeElement.classList.remove('blink-animation');
        }, 10000);
      } else {
        this.leElement.nativeElement.classList.add('blink-animation');

        setTimeout(() => {
          this.leElement.nativeElement.classList.remove('blink-animation');
        }, 10000);
      }
    });
  }

  randomDice(): void {
    const random = Math.floor(Math.random() * 6) + 1;
    console.log('Kết quả xúc xắc:', random);
    this.rollDice(random);
  }
  //Xử lý logic button cược

  private hiddenButton: ElementRef<HTMLButtonElement> | null = null;
  isOptions: boolean = false;
  toggleButton(button: ElementRef<HTMLButtonElement>) {
    if (this.hiddenButton === button) {
      // Nếu button đang được click đã ẩn, không làm gì cả
      return;
    }

    // Hiện lại button đang ẩn (nếu có)
    if (this.hiddenButton) {
      this.hiddenButton.nativeElement.classList.remove('hidden');
      console.log(
        `Button "${this.hiddenButton.nativeElement.id}" is now visible!`
      );
    }

    // Ẩn button được click
    button.nativeElement.classList.add('hidden');
    console.log(`Button "${button.nativeElement.id}" is now hidden!`);

    // Lưu trữ button đang ẩn
    this.hiddenButton = button;
    this.isOptions = true;
    let currentBet = 0;
    if (this.hiddenButton && this.hiddenButton.nativeElement.id === 'cuoc_le') {
      function updateBetValue(amount: number): void {
        const betValueElement = document.getElementById('betvalue_le');
        if (betValueElement) {
          currentBet += amount;
          betValueElement.innerText = currentBet.toString();
        }
      }
    }
  }
  cancelCuoc() {
    if (this.hiddenButton) {
      this.hiddenButton.nativeElement.classList.remove('hidden');
      this.hiddenButton = null;
      this.isOptions = false;
    }
  }

  // updateBetValue(amount: number): void {
  //   const elementId =
  //     this.hiddenButton && this.hiddenButton.nativeElement.id === 'cuoc_le'
  //       ? 'betvalue_le'
  //       : 'betvalue_chan';
  //   const betValueElement = document.getElementById(elementId);
  //   let currentBet = 0;
  //   console.log(betValueElement);
  //   if (betValueElement) {
  //     currentBet += amount;
  //     betValueElement.innerText = currentBet.toString();
  //   } else {
  //     console.error("Element with ID 'bet-value' not found!");
  //   }
  // }

  // allIn(): void {
  //   // Assuming all-in means setting the bet to a maximum value, e.g., 100M
  //   let currentBet = 0;
  //   currentBet = 100000000;
  //   const betValueElement = document.getElementById('bet-value');
  //   if (betValueElement) {
  //     betValueElement.innerText = currentBet.toString();
  //   } else {
  //     console.error("Element with ID 'bet-value' not found!");
  //   }
  // }

  // resetBet(): void {
  //   let currentBet = 0;
  //   currentBet = 0;
  //   const betValueElement = document.getElementById('bet-value');
  //   if (betValueElement) {
  //     betValueElement.innerText = currentBet.toString();
  //   } else {
  //     console.error("Element with ID 'bet-value' not found!");
  //   }
  // }
}
