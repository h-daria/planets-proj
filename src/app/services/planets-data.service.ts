import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogData } from '../dialog/dialog.component';
import { ResidentData } from '../interfaces/resident-data';

export interface PlanetsApi {
  count: number, 
  next: string, 
  previous: string | null, 
  results: []
}

@Injectable({
  providedIn: 'root'
})
export class PlanetsDataService {

  constructor(
    private http: HttpClient
  ) { }

  getPlanetsData(page: number): Observable<PlanetsApi> {
    const requestUrl = `https://swapi.dev/api/planets/?page=${
      page + 1
    }`;

    return this.http.get<PlanetsApi>(requestUrl);
  }

  getPlanetDataById(url: DialogData): Observable<any> {
    return this.http.get(`${url}`);
  }

  getResidentData(url: string): Observable<any> {
    return this.http.get(`${url}`)
  }
}
