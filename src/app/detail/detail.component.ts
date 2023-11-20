import { Component, Input, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
import { ActivatedRoute } from '@angular/router';
import { sunsetSunrise, tempo } from '../models/type';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute){}
  citta!:sunsetSunrise;
  tempo!:tempo;
  latitudine:string ="";
  longitudine:string ="";
  ngOnInit():void{
    this.activatedRoute.data.subscribe(
      (({sunsetSunrise, latLong, tempo})=>{
        this.citta = sunsetSunrise;
        this.latitudine=latLong.lat;
        this.longitudine=latLong.long;
        this.tempo=tempo;
        console.log(this.tempo);
      })
    )
  }
}
