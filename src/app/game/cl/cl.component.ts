import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { WebSocketService } from '../../service/socket.service';
import { userService } from '../../service/users.service';
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
  @ViewChild('sum_le', { static: true }) sumBet_le!: ElementRef;
  @ViewChild('sum_chan', { static: true }) sumBet_chan!: ElementRef;
  @ViewChild('betvalua_chan', { static: true })
  betvalua_chanElement!: ElementRef;
  @ViewChild('betvalua_le', { static: true })
  betvalua_leElement!: ElementRef;

  isCountingDown: boolean = false;
  isDragging: boolean = false;
  offsetX: number = 0;
  offsetY: number = 0;
  initialPosition: { x: number; y: number } = { x: 0, y: 0 };
  //be
  urlSocket: string = 'ws://localhost:8082/game/cl';
  totalMoneyL = 0;
  totalMoneyC = 0;
  result: any;
  flagEnd = false;
  messages: any[] = [];
  messageInput: string = '';
  isConnected = false;
  private messageSubscription!: Subscription;
  private connectionSubscription!: Subscription;
  constructor(
    private router: Router,
    private socket: WebSocketService,
    private userService: userService
  ) {}

  ngOnInit(): void {
    this.userService.getUser();
    // Kết nối tới WebSocket
    let username: any = this.userService.getNameCookies();
    this.urlSocket += '?username=' + username;
    this.socket.connect(this.urlSocket);
    //Lắng nghe tin nhắn
    this.messageSubscription = this.socket
      .getMessages()
      .subscribe((messageData) => {
        if (messageData.url === this.urlSocket) {
          if (!this.isConnected) {
            this.isConnected = true;
            this.startCountdown(
              messageData.message,
              this.countdownElement.nativeElement
            );
          }
          if (messageData.message === 'start') {
            this.startCountdown(14, this.countdownElement.nativeElement);
          }
          if (messageData.message === 'end') {
            this.flagEnd = true;
          } else if (this.flagEnd) {
            this.result = messageData.message;
            this.flagEnd = false;
            this.rollDice(this.result);
          }
          if (messageData.message.starsWith('money')) {
            const parts = messageData.message.substring(5).split(':');
            if (parts.length === 2) {
              const totalMoneyC = parseInt(parts[0], 10);
              const totalMoneyL = parseInt(parts[1], 10);
              console.log(totalMoneyL, totalMoneyC);
            }
          }
          this.messages.push(messageData.message);
        }
      });

    // Theo dõi trạng thái kết nối
    this.connectionSubscription = this.socket
      .getConnectionStatus()
      .subscribe((status) => {});
    this.initialPosition = {
      x: this.draggableElement.nativeElement.offsetLeft,
      y: this.draggableElement.nativeElement.offsetTop,
    };
  }

  startCountdown(duration: number, display: HTMLElement): void {
    this.resetPosition();
    this.chanElement.nativeElement.classList.remove('blink-animation');
    this.leElement.nativeElement.classList.remove('blink-animation');
    this.resetBet();
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
      if (random % 2 === 0) {
        this.chanElement.nativeElement.classList.add('blink-animation');
      } else {
        this.leElement.nativeElement.classList.add('blink-animation');
      }
    });
  }
  //Xử lý logic button cược
  private hiddenButton: ElementRef<HTMLButtonElement> | null = null;
  private sumBetElement: ElementRef<HTMLSpanElement> | null = null;
  isOptions: boolean = false;
  toggleButton(
    button: ElementRef<HTMLButtonElement>,
    sum: ElementRef<HTMLSpanElement>
  ) {
    this.sumBetElement = sum;
    if (this.hiddenButton === button) {
      return;
    }

    // Hiện lại button đang ẩn (nếu có)
    if (this.hiddenButton) {
      this.hiddenButton.nativeElement.textContent = 'Đặt cược';
    }

    // Ẩn button được click
    button.nativeElement.textContent = '0';
    // Lưu trữ button đang ẩn
    this.hiddenButton = button;
    this.isOptions = true;
  }
  cancelCuoc() {
    if (this.hiddenButton) {
      this.hiddenButton.nativeElement.textContent = 'Đặt cược';
      this.hiddenButton = null;
      this.isOptions = false;
    }
  }

  updateBetValue(amount: number): void {
    const doorBet = this.hiddenButton?.nativeElement;
    let tempBet: any;
    tempBet = doorBet?.textContent;
    let currentBet = parseInt(tempBet, 10);
    if (doorBet) {
      currentBet += amount;
      doorBet.innerHTML = currentBet.toString();
    } else {
      console.error("Element with ID 'bet-value' not found!");
    }
  }

  bet() {
    if (this.hiddenButton && this.sumBetElement) {
      let tempSum: any;
      let tempBet: any;
      tempSum = this.sumBetElement.nativeElement.textContent;
      tempBet = this.hiddenButton.nativeElement.textContent;
      console.log(tempSum, tempBet);
      let Bet = parseInt(tempBet, 10);
      let Sum = parseInt(tempSum, 10);
      Sum += Bet;
      this.sumBetElement.nativeElement.textContent = Sum.toString();
      this.sendBet(this.hiddenButton.nativeElement.id, Bet);
      this.cancelCuoc();
    }
  }
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

  resetBet() {
    let sumC = document.getElementById('sum_chan');
    let sumL = document.getElementById('sum_le');
    if (sumC && sumL) {
      sumC.textContent = '0';
      sumL.textContent = '0';
    }
    this.cancelCuoc();
  }
  // websocket
  sendBet(choice: string, money: any) {
    let data = {
      type: 'bet',
      choice: choice,
      money: money,
    };
    let jsonData = JSON.stringify(data);
    this.socket.sendMessage(this.urlSocket, jsonData);
  }
}
