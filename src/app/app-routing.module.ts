import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { CatalogueSearchComponent } from './catalogue-search/catalogue-search.component';
import { CatalogueMaintenanceComponent } from './catalogue-maintenance/catalogue-maintenance.component';
import { AboutComponent } from './about/about.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: 'home-page', pathMatch: 'full' 
  },
  {
    path: "home-page",
    component: HomeComponent
  },
  {
    path: "site-map-page",
    component: SiteMapComponent
  },
  {
    path: "search-page",
    component: CatalogueSearchComponent
  },
  {
    path: "result-page",
    component: SearchResultComponent
  },
  {
    path: "maintanance-page",
    component: MaintenanceComponent
  } ,
  {
    path: "about-page",
    component: AboutComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
