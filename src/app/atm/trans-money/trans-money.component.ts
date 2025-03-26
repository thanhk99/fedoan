import { Component } from '@angular/core';
import { userService } from '../../service/users.service';
@Component({
  selector: 'app-trans-money',
  imports: [],
  templateUrl: './trans-money.component.html',
  styleUrl: './trans-money.component.css'
})
export class TransMoneyComponent {
  constructor(
    private userService: userService, 
  ){}
}
