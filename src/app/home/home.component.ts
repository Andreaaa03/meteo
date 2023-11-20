import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
import { sunsetSunrise } from '../models/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private getApiService: GetApiService) { }
  ngOnInit(): void {
    this.latitudine = this.cities[0].lat;
    this.longitudine = this.cities[0].long;
    this.functionGgetSearchSunsetSunriseByLatLong();
  }

  cities = [
    {
      name: 'Torino',
      lat: "45.06876340951821",
      long: "7.667354252651081",
    },
    {
      name: 'New York',
      lat: "40.72391581131591",
      long: "-74.03501662450388",
    },
    {
      name: 'Edimburgo',
      lat: "55.95341592640703",
      long: "-3.1916058393269178",
    },
    {
      name: 'Berlino',
      lat: "52.5172513804559",
      long: "13.397216732488998",
    },
    {
      name: 'Madrid',
      lat: "40.416741067837464",
      long: "-3.701734932645684",
    },
    {
      name: 'Rio De Janeiro',
      lat: "-22.907248704101484",
      long: "-43.18582140897178",
    },
    {
      name: 'Parigi',
      lat: "48.85769609493993",
      long: "2.346001647968803",
    },
    {
      name: 'Tokio',
      lat: "35.688309860849365",
      long: "139.75256594573136",
    },
    {
      name: 'Las Vegas',
      lat: "36.17534196283748",
      long: "-115.1544170200883",
    },
    {
      name: 'Singapore',
      lat: "1.2776117523563584",
      long: "103.8414836430862",
    }
  ]

  citiesSelected: string = "Torino";
  functionSelectCity(city: string) {

    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === city) {
        this.citiesSelected = city;
        this.latitudine = this.cities[i].lat;
        this.longitudine = this.cities[i].long;
        this.functionGgetSearchSunsetSunriseByLatLong();
      }
    }
  }
  latitudine: string = "";
  longitudine: string = "";
  citta!: sunsetSunrise;
  functionGgetSearchSunsetSunriseByLatLong() {
    if (this.latitudine && this.longitudine) {
      this.getApiService.getSearchSunsetSunriseByLatLong(this.latitudine, this.longitudine).subscribe(
        (res) => {
          this.citta = res;
        }
      )
    }
    return this.citta;
  }

  reset() {
    this.latitudine = "";
    this.longitudine = "";
  }
}
