import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SiteMapComponent } from './site-map/site-map.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { CatalogueSearchComponent } from './catalogue-search/catalogue-search.component';
import { CatalogueMaintenanceComponent } from './catalogue-maintenance/catalogue-maintenance.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultComponent } from './search-result/search-result.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SiteMapComponent,
    MaintenanceComponent,
    CatalogueSearchComponent,
    CatalogueMaintenanceComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
