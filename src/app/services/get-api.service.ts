import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs';
import { sunsetSunrise, tempo } from '../models/type';

@Injectable({
  providedIn: 'root'
})
export class GetApiService {

  constructor(private apiService: ApiService) { }

  getSearchSunsetSunriseByLatLong(lat: string, long: string) {
    return this.apiService.searchSunsetSunriseByLatLong(lat, long).pipe(
      map((res: any) => {
        return res as sunsetSunrise;
      })
    )
  }

  getSearchTempoByLatLong(lat: string, long: string) {
    return this.apiService.searchTempoByLatLong(lat, long).pipe(
      map((res: any) => {
        res=this.addImg(res);
        res=this.calculateTime(res);
        return res as tempo;
      })
    )
  }

  addImg(res:any){
    res.dataseries.forEach((e: any) => {
      if (e.prec_type === "none") {
        if (e.cloudcover <= 2) {
          e.img = "https://www.7timer.info/img/misc/about_two_clear.png";
        }
        else if (e.cloudcover >= 3 && e.cloudcover <= 7) {
          e.img = "https://www.7timer.info/img/misc/about_two_pcloudy.png";
        }
        else if (e.cloudcover >= 8) {
          e.img = "https://www.7timer.info/img/misc/about_two_cloudy.png";
        }
      } else if (e.prec_type === "snow") {
        e.img = "https://www.7timer.info/img/misc/about_two_snow.png";
      } else if (e.prec_type === "rain") {
        if (e.lifted_index <= -5) {
          e.img = "https://www.7timer.info/img/misc/about_two_tsrain.png";
        } else
          e.img = "https://www.7timer.info/img/misc/about_two_rain.png";
      }
    });
    return res;
  }

  calculateTime(res:any){
    res.dataseries.forEach((e: any) => {
      e.timepoint = new Date(new Date().getTime() + e.timepoint * 60 * 60 * 1000).toUTCString().slice(0, -4);
    });
    return res;
  }

  getSearchCityByLatLong(lat:string, long:string){
    return this.apiService.searchCityByLatLong(lat, long).pipe(
      map((res:any)=>{
        return res.city.toUpperCase() as string;
      })
    )
  }
}
