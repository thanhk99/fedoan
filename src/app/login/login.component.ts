import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  viewChild,
} from '@angular/core';
import { usesService } from '../service/users.service';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // email: string = '';
  // password: string = '';
  // fullname: string = '';
  // constructor(private http: HttpClient, private usesService: usesService) {}

  // onSubmit() {
  //   console.log(this.email);
  //   console.log(this.password);
  // }
  // ngOnInit() {
  //   this.loadUser();
  // }
  // loadUser() {
  //   this.usesService.getUsers().subscribe(
  //     (data) => {
  //       console.log(data);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  @ViewChild('btn1') btn1!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnContainer1') btnContainer1!: ElementRef<HTMLDivElement>;
  @ViewChild('btn2') btn2!: ElementRef<HTMLButtonElement>;
  @ViewChild('btnContainer2') btnContainer2!: ElementRef<HTMLDivElement>;
  @ViewChild('msg') msg!: ElementRef<HTMLDivElement>;
  @ViewChild('not') not!: ElementRef<HTMLDivElement>;
  @ViewChild('account') account!: ElementRef<HTMLInputElement>;
  @ViewChild('password') password!: ElementRef<HTMLInputElement>;
  @ViewChild('user') user!: ElementRef<HTMLInputElement>;
  @ViewChild('email') email!: ElementRef<HTMLInputElement>;
  @ViewChild('pass') pass!: ElementRef<HTMLInputElement>;
  @ViewChild('pass_check') passCheck!: ElementRef<HTMLInputElement>;
  signInAccount = '';
  signInPassword = '';
  signUpUser = '';
  signUpEmail = '';
  signUpPassword = '';
  signUpPasswordConfirm = '';
  isLoginDisabled = true;
  isRegisterDisabled = true;
  message = '';
  notifical = '';
  isRightPanelActive = false;
  // Hàm RightPanel
  togglePanel(isRightPanelActive: boolean) {
    this.isRightPanelActive = isRightPanelActive;
  }

  // Hàm shiftButtonLogin
  shiftButtonLogin() {
    this.showMsg();
    const positions = [
      'shift-left',
      'shift-top',
      'shift-right',
      'shift-bottom',
    ];
    const currentPosition = positions.find((dir) =>
      this.btn2.nativeElement.classList.contains(dir)
    );
    const nextPosition =
      positions[(positions.indexOf(currentPosition!) + 1) % positions.length];
    this.btn2.nativeElement.classList.remove(currentPosition!);
    this.btn2.nativeElement.classList.add(nextPosition);
  }
  // Hàm shiftButtonRegister
  shiftButtonRegister() {
    this.showNot();
    const positions = ['shift-left', 'shift-right', 'shift-bottom'];
    const currentPosition = positions.find((dir) =>
      this.btn1.nativeElement.classList.contains(dir)
    );
    const nextPosition =
      positions[(positions.indexOf(currentPosition!) + 1) % positions.length];
    this.btn1.nativeElement.classList.remove(currentPosition!);
    this.btn1.nativeElement.classList.add(nextPosition);
  }

  // Hàm showMsg
  showMsg() {
    const isEmpty =
      this.account.nativeElement.value === '' ||
      this.password.nativeElement.value === '';
    this.btn2.nativeElement.classList.toggle('no-shift', !isEmpty);

    if (isEmpty) {
      this.isLoginDisabled == true;
      this.msg.nativeElement.style.color = 'rgb(218 49 49)';
      this.message = 'Vui lòng điền đầy đủ thông tin!!';
    } else {
      this.message = "Gút chóp...Let's play!";
      this.msg.nativeElement.style.color = '#46DFB1';
      this.isLoginDisabled = false;
      this.btn2.nativeElement.classList.add('no-shift');
    }
  }
  showNot() {
    const isNull =
      this.user.nativeElement.value === '' ||
      this.email.nativeElement.value === '' ||
      this.pass.nativeElement.value === '' ||
      this.passCheck.nativeElement.value === '';
    this.btn1.nativeElement.classList.toggle('no-shift', !isNull);
    if (isNull) {
      this.isRegisterDisabled == true;
      this.not.nativeElement.style.color = 'rgb(218 49 49)';
      this.notifical = 'Vui lòng điền đầy đủ thông tin!!';
    } else {
      this.notifical = 'I remembered the information';
      this.not.nativeElement.style.color = '#46DFB1';
      this.isRegisterDisabled = false;
      this.btn1.nativeElement.classList.add('no-shift');
    }
  }

  // Lắng nghe sự kiện mouseover trên btnContainer
  // Lắng nghe sự kiện mouseover
  @HostListener('mouseover', ['$event.target'])
  onMouseOver(target: HTMLElement) {
    if (
      target === this.btnContainer2.nativeElement ||
      target === this.btn2.nativeElement
    ) {
      this.shiftButtonLogin();
    } else if (
      target === this.btnContainer1.nativeElement ||
      target === this.btn1.nativeElement
    ) {
      this.shiftButtonRegister();
    }
  }

  // Lắng nghe sự kiện input trên form
  @HostListener('input')
  onInput() {
    this.showMsg();
    this.showNot();
  }

  // Lắng nghe sự kiện touchstart trên btn
  @HostListener('touchstart', ['$event.target'])
  onTouchStart(target: HTMLElement) {
    if (target === this.btn2.nativeElement) {
      this.shiftButtonLogin();
    } else if (target === this.btn1.nativeElement) {
      this.shiftButtonRegister();
    }
  }
}
