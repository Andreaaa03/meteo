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
    this.nameCity = this.cities[0].name;
    this.latitudine = this.cities[0].lat;
    this.longitudine = this.cities[0].long;
    this.functionGgetSearchSunsetSunriseByLatLong();
    if (sessionStorage.getItem('ArrayCities') as any !== null)
      this.cities = JSON.parse(sessionStorage.getItem('ArrayCities') as any);
  }

  cities = [
    {
      name: 'Torino',
      lat: "45.06876340951821",
      long: "7.667354252651081",
      fav: false,
    },
    {
      name: 'New York',
      lat: "40.72391581131591",
      long: "-74.03501662450388",
      fav: false,
    },
    {
      name: 'Edimburgo',
      lat: "55.95341592640703",
      long: "-3.1916058393269178",
      fav: false,
    },
    {
      name: 'Berlino',
      lat: "52.5172513804559",
      long: "13.397216732488998",
      fav: false,
    },
    {
      name: 'Madrid',
      lat: "40.416741067837464",
      long: "-3.701734932645684",
      fav: false,
    },
    {
      name: 'Rio De Janeiro',
      lat: "-22.907248704101484",
      long: "-43.18582140897178",
      fav: false,
    },
    {
      name: 'Parigi',
      lat: "48.85769609493993",
      long: "2.346001647968803",
      fav: false,
    },
    {
      name: 'Tokio',
      lat: "35.688309860849365",
      long: "139.75256594573136",
      fav: false,
    },
    {
      name: 'Las Vegas',
      lat: "36.17534196283748",
      long: "-115.1544170200883",
      fav: false,
    },
    {
      name: 'Singapore',
      lat: "1.2776117523563584",
      long: "103.8414836430862",
      fav: false,
    }
  ]

  citiesSelected: string = "Torino";
  functionSelectCity(city: string) {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === city) {
        this.citiesSelected = city;
        this.nameCity = this.cities[i].name;
        this.latitudine = this.cities[i].lat;
        this.longitudine = this.cities[i].long;
        this.functionGgetSearchSunsetSunriseByLatLong();
        console.log(this.cities);
      }
    }

  }
  latitudine: string = "";
  longitudine: string = "";
  nameCity: string = "";
  nameCityFav: string = "";
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
    this.nameCity = "";
  }

  addNewCity() {
    const newCity = {
      name: this.nameCity,
      lat: this.latitudine,
      long: this.longitudine,
      fav: true,
    }
    if (this.nameCity != "" && this.latitudine != "" && this.longitudine != "") {
      if (!this.cities.some(city =>
        city.name.toLowerCase() === newCity.name.toLowerCase() ||
        city.lat === newCity.lat &&
        city.long === newCity.long
      )) {
        newCity.name = newCity.name.charAt(0).toUpperCase() + newCity.name.slice(1);
        this.cities.push(newCity);
        sessionStorage.setItem('ArrayCities', JSON.stringify(this.cities));
      }
    }
  }

  removeFavCity() {
    const nameCity = this.nameCityFav.charAt(0).toUpperCase() + this.nameCityFav.slice(1);
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === nameCity && this.cities[i].fav === true) {
        this.cities.splice(i, 1);
        i--;
        sessionStorage.setItem('ArrayCities', JSON.stringify(this.cities));
      }
    }
  }

  removeAllFavCity() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].fav === true) {
        this.cities.splice(i);
        i--;
        sessionStorage.setItem('ArrayCities', JSON.stringify(this.cities));
      }
    }
  }

  info() {
    alert("Per eliminare una voce dai tuoi preferiti devi scrivere il nome dentro il campo 'Nome Città' e confermare con 'CANCELLA UN PREFERITO'.\n Se Vuoi cancellare tutti i preferiti schiaccia su 'SVUOTA PREFERITI'")
  }
}
