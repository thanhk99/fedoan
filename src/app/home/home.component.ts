import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { format } from 'date-fns';
import { userService } from '../service/users.service';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone:true
})
export class HomeComponent implements OnInit {

  apiFootball=environment.apiFootball
  constructor (
    private router:Router,
    private http :HttpClient,
    private userService: userService,
  ) { }
    ngOnInit() {
      let  dayStart= format(new Date(), 'yyyy-MM-dd');
      let dayEnd = format(new Date(Date.now() + 86400000*4), 'yyyy-MM-dd');
      this.apiFootball+=`?dateFrom=${dayStart}&dateTo=${dayEnd}`
      const headers = new HttpHeaders({
        'X-Auth-Token': environment.keyFootball
      });
      this.http.get(this.apiFootball,{headers}).subscribe(
        (data:any)=>{
          console.log(data)
        },
        (error:any)=>{
          console.log(error)
        }
      )
    }
}
