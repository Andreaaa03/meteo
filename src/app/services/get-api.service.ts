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
        res.dataseries.forEach((e:any) => {
          if(e.cloudcover<=2){
            e.img ="https://www.7timer.info/img/misc/about_two_clear.png";
          }else if(e.cloudcover>=3 && e.cloudcover<=7){
            e.img ="https://www.7timer.info/img/misc/about_two_pcloudy.png";
          }else if(e.cloudcover>=8){
            if(e.lifted_index<=-5){
              e.img ="https://www.7timer.info/img/misc/about_two_ts.png";
            }else
              e.img ="https://www.7timer.info/img/misc/about_two_cloudy.png";
          }
        });
        return res as tempo;
      })
    )
  }
}
