import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
import { userService } from '../service/users.service';
//import { Router } from '@angular/router';
// import { environment } from '../../../environments/environment';
//import { WebSocketService } from '../../service/socket.service';
import { AtmService } from '../service/atm.service';
@Component({
  selector: 'app-transfer',
  imports: [],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css',
})
export class TransferComponent implements OnInit {
  constructor(
    // private router: Router,
    //private socket: WebSocketService,
    private userService: userService,
    private atmService: AtmService
  ) {}
  idPlayer: any = '';
  nameplayer: any = '';
  moneyplay: any = '';
  fullname: any = '';
  money: any = '';
  ngOnInit(): void {
    this.fullname = this.userService.getNameCookies();
    this.money = this.userService.getBalanceCookies();
    this.userService.getInfoUser(2).subscribe(
      (rs: any) => {
        console.log(rs);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @ViewChild('note') note!: ElementRef<HTMLDivElement>;
  @ViewChild('msg') msg!: ElementRef<HTMLDivElement>;
  @ViewChild('id') id!: ElementRef<HTMLInputElement>;
  @ViewChild('username') username!: ElementRef<HTMLInputElement>;
  @ViewChild('amount') amount!: ElementRef<HTMLInputElement>;
  @ViewChild('message') message!: ElementRef<HTMLInputElement>;
  @ViewChild('submit') submit!: ElementRef<HTMLInputElement>;
  notifical1 = '';
  notifical2 = '';
  notifical3 = '';
  submitIsDisabled = false;
  value = 0;

  showNote() {
    const isEmpty =
      this.id.nativeElement.value === '' ||
      this.amount.nativeElement.value === '';
    if (isEmpty) {
      this.notifical1 = 'Vui lòng nhập đầy đủ thông tin!';
      this.submitIsDisabled = true;
    } else {
      this.notifical1 = '';
    }
  }
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    if (this.value <= 0) {
      this.notifical2 = 'Số tiền nhập không hợp lệ !';
      this.submitIsDisabled = true;
    }
    if (this.value > Number(this.money)) {
      this.notifical2 = 'Số tiền bạn có không đủ!';
      this.submitIsDisabled = true;
    } else {
      this.notifical2 = '';
      this.submitIsDisabled = false;
    }
  }
  onInputId(event: Event): void {
    const target = event.target as HTMLInputElement;
    const IdPlayer = target.value;
    this.atmService.searchAtm(IdPlayer).subscribe(
      (data: any) => {
        console.log(data);
        console.log(data.idPlayer);
        if (this.userService.getCookies() === String(data.id)) {
          this.notifical3 = 'Số tài khoản không hợp lệ';
          this.submitIsDisabled = true;
        } else {
          this.userService.getInfoUser(data.id).subscribe((rs: any) => {
            console.log(rs);
            this.money = rs.money;
            this.nameplayer = rs.fullname;
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  @HostListener('mouseover', ['$event.target'])
  onMouseOver(target: HTMLElement) {
    if (target === this.submit.nativeElement) {
      this.showNote();
    }
  }
}
