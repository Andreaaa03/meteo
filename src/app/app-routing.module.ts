import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { GetApiService } from './services/get-api.service';

const routes: Routes = [
  {path:"home", component: HomeComponent},
  {path:"", redirectTo: "home", pathMatch: "full"},
  {path:"detail/:lat/:long", component: DetailComponent, resolve:{
    sunsetSunrise: (route: ActivatedRouteSnapshot) => {
      return inject(GetApiService).getSearchSunsetSunriseByLatLong(route.paramMap.get("lat")!, route.paramMap.get("long")!);
    },
    tempo: (route: ActivatedRouteSnapshot) => {
      return inject(GetApiService).getSearchTempoByLatLong(route.paramMap.get("lat")!, route.paramMap.get("long")!);
    },
    latLong: (route: ActivatedRouteSnapshot) => {
      return { lat: route.paramMap.get("lat")!, long: route.paramMap.get("long")!}
    },
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
