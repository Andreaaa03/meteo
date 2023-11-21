import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl ="https://api.sunrisesunset.io/";
  searchSunsetSunriseByLatLong(lat:string, long:string){
    return this.http.get(this.baseUrl + "json?lat=" + lat + "&lng=" + long);
  }
  
  initialUrl ="https://www.7timer.info/bin/astro.php?";
  finishUrl ="&ac=0&unit=metric&output=json&tzshift=0";
  searchTempoByLatLong(lat:string, long:string){
    return this.http.get(this.initialUrl + "lon=" + long + "&lat=" + lat + this.finishUrl);
  }
  
  cityStartUrl ="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="
  cityEndUrl ="&localityLanguage=it"
  searchCityByLatLong(lat:string, long:string){
    return this.http.get(this.cityStartUrl + lat + "&longitude=" + long + this.cityEndUrl);
  }
}
