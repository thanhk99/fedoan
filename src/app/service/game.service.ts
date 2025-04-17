import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private http: HttpClient
  ) { }
  private apiSaveHisPlayer = environment.apiSaveHisPlayer;
  apiFootBall=environment.apiFootball
  getHistory(namegame:string){
    const body = {"namegame":namegame}
    return this.http.post(environment.apiGetHistoryGame,body)
  }
  getMatches(dateFrom: string, dateTo: string){
    return this.http.get(`${this.apiFootBall}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }
}
