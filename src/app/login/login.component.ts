import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
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

  @ViewChild('btn') btn!: ElementRef<HTMLButtonElement>;
  @ViewChild('msg') msg!: ElementRef<HTMLDivElement>;
  @ViewChild('account') account!: ElementRef<HTMLInputElement>;
  @ViewChild('password') password!: ElementRef<HTMLInputElement>;
  @ViewChild('btnContainer') btnContainer!: ElementRef<HTMLDivElement>;
  signInAccount = '';
  signInPassword = '';
  signUpUser = '';
  signUpEmail = '';
  signUpPassword = '';
  signUpPasswordConfirm = '';
  isLoginDisabled = true;
  message = '';
  isRightPanelActive = false;
  // Hàm RightPanel
  togglePanel(isRightPanelActive: boolean) {
    this.isRightPanelActive = isRightPanelActive;
  }

  // Hàm shiftButton
  shiftButton() {
    this.showMsg();
    const positions = [
      'shift-left',
      'shift-top',
      'shift-right',
      'shift-bottom',
    ];
    const currentPosition = positions.find((dir) =>
      this.btn.nativeElement.classList.contains(dir)
    );
    const nextPosition =
      positions[(positions.indexOf(currentPosition!) + 1) % positions.length];
    this.btn.nativeElement.classList.remove(currentPosition!);
    this.btn.nativeElement.classList.add(nextPosition);
  }

  // Hàm showMsg
  showMsg() {
    const isEmpty =
      this.account.nativeElement.value === '' ||
      this.password.nativeElement.value === '';
    this.btn.nativeElement.classList.toggle('no-shift', !isEmpty);

    if (isEmpty) {
      this.isLoginDisabled = true;
      this.msg.nativeElement.style.color = 'rgb(218 49 49)';
      this.message = 'Vui lòng điền đầy đủ thông tin!!';
    } else {
      this.message = "Gút chóp...Let's play!";
      this.msg.nativeElement.style.color = '#46DFB1';
      this.isLoginDisabled = false;
      this.btn.nativeElement.classList.add('no-shift');
    }
  }

  // Lắng nghe sự kiện mouseover trên btnContainer
  @HostListener('mouseover', ['$event.target'])
  onMouseOver(target: HTMLElement) {
    if (
      target === this.btnContainer.nativeElement ||
      target === this.btn.nativeElement
    ) {
      this.shiftButton();
    }
  }

  // Lắng nghe sự kiện input trên form
  @HostListener('input')
  onInput() {
    this.showMsg();
  }

  // Lắng nghe sự kiện touchstart trên btn
  @HostListener('touchstart', ['$event.target'])
  onTouchStart(target: HTMLElement) {
    if (target === this.btn.nativeElement) {
      this.shiftButton();
    }
  }
}
