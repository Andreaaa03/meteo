import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
import { sunsetSunrise } from '../models/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private getApiService: GetApiService){}
  ngOnInit(): void {
    this.latitudine=this.cities.torino.lat;
    this.longitudine=this.cities.torino.long;
    this.functionGgetSearchSunsetSunriseByLatLong();
  }

  cities= {
    torino: {
      name: 'torino',
      lat: "45.06876340951821",
      long: "7.667354252651081",
    },
    newYork: {
      name: 'newYork',
      lat: "40.72391581131591",
      long: "-74.03501662450388",
    },
    berlino:{
      name: 'berlino',
      lat: "52.5172513804559",
      long: "13.397216732488998",
    }
  }
  citiesSelected: string="";
  functionSelectCity(){
    switch (this.citiesSelected){
      case this.cities.torino.name :{
        this.latitudine=this.cities.torino.lat;
        this.longitudine=this.cities.torino.long;
        this.functionGgetSearchSunsetSunriseByLatLong();
        break;
      }
      case this.cities.newYork.name :{
        this.latitudine = this.cities.newYork.lat;
        this.longitudine = this.cities.newYork.long;
        this.functionGgetSearchSunsetSunriseByLatLong();
        break;
      }
      case this.cities.berlino.name :{
        this.latitudine = this.cities.berlino.lat;
        this.longitudine = this.cities.berlino.long;
        this.functionGgetSearchSunsetSunriseByLatLong();
        break;
      }
    }
  }
  latitudine:string="";
  longitudine:string="";
  citta!:sunsetSunrise;
  functionGgetSearchSunsetSunriseByLatLong(){
    if(this.latitudine && this.longitudine){
      this.getApiService.getSearchSunsetSunriseByLatLong(this.latitudine,this.longitudine).subscribe(
        (res)=>{
            this.citta = res;
        }
      )
    }
    return this.citta;
  }

  reset(){
    this.latitudine = "";
    this.longitudine = "";
  }
}
