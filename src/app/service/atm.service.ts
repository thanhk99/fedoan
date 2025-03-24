import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AtmService {

  constructor(
    private httpClient:HttpClient
  ) { }

  updateBalan(number :number){
    return this.httpClient.post(environment.apiupdateBalan,number)
  }

}
