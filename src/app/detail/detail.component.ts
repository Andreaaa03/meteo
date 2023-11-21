import { Component, Input, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
import { ActivatedRoute } from '@angular/router';
import { sunsetSunrise, tempo } from '../models/type';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private getApiService: GetApiService) { }
  citta!: sunsetSunrise;
  tempo!: tempo;
  latitudine: string = "";
  longitudine: string = "";
  nameCity: string="";
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (({ sunsetSunrise, latLong, tempo }) => {
        this.citta = sunsetSunrise;
        this.latitudine = latLong.lat;
        this.longitudine = latLong.long;
        this.tempo = tempo;
        this.functionGetSearchCityByLatLong(this.latitudine, this.longitudine);
      })
    )
  }

  functionGetSearchCityByLatLong(lat:string, long:string){
    this.getApiService.getSearchCityByLatLong(lat, long).subscribe(
      (res)=>{
        this.nameCity=res;
      }
    )
  }
}

