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
    //faccio subito la chiamata per vedere i risultati di Torino(alba e tramonto)
    this.nameCity = this.cities[0].name;
    this.latitudine = this.cities[0].lat;
    this.longitudine = this.cities[0].long;
    this.functionGgetSearchSunsetSunriseByLatLong();

    //aggiorno cities(tutte le città) con la sessione!!
    if (sessionStorage.getItem('ArrayCities') as any !== null)
      this.cities = JSON.parse(sessionStorage.getItem('ArrayCities') as any);
  }

  latitudine: string = "";
  longitudine: string = "";
  nameCity: string = ""; //nome città scelta/attuale
  nameCityFavToCanc: string = ""; //nome città per i favoriti da eliminare
  citta!: sunsetSunrise;
  //città suggerite
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
  //in base al click dell'utente aggiorna la città, di default è Torino
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
  
  //dalla latitudine e longitudine ottiene orario alba e tramonto
  functionGgetSearchSunsetSunriseByLatLong() {
    if (this.latitudine && this.longitudine) {
      this.getApiService.getSearchSunsetSunriseByLatLong(this.latitudine, this.longitudine).subscribe(
        (res: sunsetSunrise) => {
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
    this.nameCityFavToCanc = "";
  }

  mexError: string = "";
  //aggiungi una nuova città nei preferiti, gestisce l'errore con la variabile maxError. Uso la sessione!!!
  addNewCity() {
    this.nameCity = this.nameCity.trimRight();
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
        this.mexError = "";
      } else {
        this.cities.some(city => {
          if (city.name.toLowerCase() === newCity.name.toLowerCase()) {
            this.mexError = "nome già esistente";
          } else if (city.lat === newCity.lat && city.long === newCity.long) {
            this.mexError = "latitudine o longitudine già esistenti";
          }
        }
        )
      }
    } else {
      this.mexError = "valori mancanti";
    }
  }

  //rimuovi una singola città dai preferiti(solo dai preferiti), bisogna scriverla nel form 
  removeFavCity() {
    const nameCity = this.nameCityFavToCanc.charAt(0).toUpperCase() + this.nameCityFavToCanc.slice(1);
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].name === nameCity && this.cities[i].fav === true) {
        this.cities.splice(i, 1);
        i--;
        sessionStorage.setItem('ArrayCities', JSON.stringify(this.cities));
      }
    }
  }

  //rimuovi TUTTI i preferiti
  removeAllFavCity() {
    for (let i = 0; i < this.cities.length; i++) {
      if (this.cities[i].fav === true) {
        this.cities.splice(i);
        i--;
        sessionStorage.setItem('ArrayCities', JSON.stringify(this.cities));
      }
    }
  }

}
