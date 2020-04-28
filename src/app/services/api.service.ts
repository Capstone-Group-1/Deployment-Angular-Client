import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Roster } from '../models/roster';
import { Stat } from '../models/stat';
import { select, Store } from '@ngrx/store';
import * as fromStore from '../reducers/index';
import * as Index from "../reducers/index";
import { Progress } from '../models/progress';

@Injectable()
export class ApiService {

  teamAcronym: string = "";

  constructor(private http: HttpClient, private store: Store<Index.State>) {
    this.store.pipe(select(fromStore.getCurrentTeam))
    .subscribe((team: string) => {
      
      switch (team) {
        case "Mens Basketball": {
          this.teamAcronym = "mbb";
          break;
        }
        case "Womens Basketball": {
          this.teamAcronym = "wbb";
          break;
        }
        case "Softball": {
          this.teamAcronym = "softball";
          break;
        }
        case "Baseball": {
          this.teamAcronym = "baseball";
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  getRosters(): Observable<Roster[]> {
    let teamAcr = this.teamAcronym;
    return this.http
      .get<Roster[]>(`https://justinmckenna.pythonanywhere.com/team/roster?sport=${teamAcr}`).pipe(
        map(data => data),
        catchError(error => throwError(error))
      );
  }

  getCurrentTeamStats(): Observable<Stat[]> {
    let teamAcr = this.teamAcronym;
    return this.http
      .get<Stat[]>(`https://justinmckenna.pythonanywhere.com/team/stats?sport=${teamAcr}`).pipe(
        map(data => data),
        catchError(error => throwError(error))
      );
  }

  getPlayer(id: number): Observable<Roster> {
    let teamAcr = this.teamAcronym;
    return this.http
      .get<Roster>(`https://justinmckenna.pythonanywhere.com/player?sport=${teamAcr}&id=${id}`).pipe(
        map(data => data),
        catchError(error => throwError(error))
      );
  }

  getPlayerStats(id: number): Observable<Stat[]> {
    let teamAcr = this.teamAcronym;
    return this.http
      .get<Stat[]>(`https://justinmckenna.pythonanywhere.com/player/stats?sport=${teamAcr}&id=${id}`).pipe(
        map(data => data),
        catchError(error => throwError(error))
      );
  }

  getProgressStatLabels(): Observable<Object[]> {
    let teamAcr = this.teamAcronym;
    return this.http
      .get<string[]>(`https://justinmckenna.pythonanywhere.com/team/stats/statlist?sport=${teamAcr}`).pipe(
        map(data => data),
        catchError(error => throwError(error))
      );
  }

  async getProgressStat(stat: string): Promise<Progress[]> {
    let teamAcr = this.teamAcronym;
    const data = await this.http
      .get<Progress[]>(`https://justinmckenna.pythonanywhere.com/team/stats/progress?sport=${teamAcr}&stat=${stat}`).toPromise();
    return data;
  }
}