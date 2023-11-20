import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { sunsetSunrise, tempo } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(private apiService: ApiService) { }

  getSearchSunsetSunriseByLatLong(lat:string, long:string){
    return this.apiService.searchSunsetSunriseByLatLong(lat, long).pipe(
      map((res:any)=>{
        return res as sunsetSunrise;
      })
    )
  }

  getSearchTempoByLatLong(lat:string, long:string){
    return this.apiService.searchTempoByLatLong(lat, long).pipe(
      map((res:any)=>{
        return res as tempo;
      })
    )
  }
}
