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
  nameCity: string = "";
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (({ sunsetSunrise, latLong, tempo }) => {
        this.citta = sunsetSunrise;
        this.latitudine = latLong.lat;
        this.longitudine = latLong.long;
        this.tempo = tempo;
        this.functionGetSearchCityByLatLong(this.latitudine, this.longitudine);
        this.controlDayNigth(this.citta.results.sunrise, this.citta.results.sunset, this.tempo.dataseries);
      })
    )
  }

  //funzione API nuova per prendere il nome di una città date le coordinate (API extra all' esame)
  functionGetSearchCityByLatLong(lat: string, long: string) {
    this.getApiService.getSearchCityByLatLong(lat, long).subscribe(
      (res) => {
        this.nameCity = res;
      }
    )
  }

  //controllo in base all'alba e tramonto se è giorno e notte. converto tutto in ore, faccio il confronto e aggiungo una proprietà all'oggetto
  controlDayNigth(originalSunrise: any, originalSunset: any, orario: any) {
    const indexSunset = originalSunset.indexOf(':');
    const indexSunrise = originalSunrise.indexOf(':');
    let sunrise = originalSunrise;
    let sunset = originalSunset;

    for (let i = 0; i < orario.length; i++) {
      let ore, min, sec, time;

      ore = parseInt(sunset.substring(0, indexSunset), 10);
      ore = 12 + ore;
      min = parseInt(sunset.substring(indexSunset + 1, indexSunset + 3), 10);
      sec = parseInt(sunset.substring(indexSunset + 4, indexSunset + 6), 10);
      const sunsetDate = new Date();
      sunsetDate.setHours(ore, min, sec);

      ore = parseInt(sunrise.substring(0, indexSunrise), 10);
      min = parseInt(sunrise.substring(indexSunrise + 1, indexSunrise + 3), 10);
      sec = parseInt(sunrise.substring(indexSunrise + 4, indexSunrise + 6), 10);
      const sunriseDate = new Date();
      sunriseDate.setHours(ore, min, sec);

      ore = orario[i].timepoint.slice(-8).substring(0, 2);
      min = orario[i].timepoint.slice(-8).substring(3, 5);
      sec = orario[i].timepoint.slice(-8).substring(6, 8);
      time = new Date();
      time.setHours(ore, min, sec);

      if (time > sunriseDate && time < sunsetDate) {
        orario[i].dayNigth = "giorno";
      } else if (time < sunriseDate || time > sunsetDate) {
        orario[i].dayNigth = "notte";
      }
    }
  }

}

