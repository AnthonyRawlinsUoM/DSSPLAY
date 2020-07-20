import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// import {} from 'maxird-ng-semantic-ui';
import { SuiModule } from '@hochzehn/ng2-semantic-ui';
import { ChartModule } from "angular2-chartjs";
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";

import { Ng5SliderModule } from 'ng5-slider';

import { SpatialComponent } from './spatial/spatial.component';
import { TemporalComponent } from './temporal/temporal.component';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { ToolsetComponent } from './toolset/toolset.component';

import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { FrappeatorProjectsComponent } from './frappeator-projects/frappeator-projects.component';
import { FrappeatorProjectComponent } from './frappeator-project/frappeator-project.component';
import { SpatialOptionsComponent } from './spatial-options/spatial-options.component';
import { SpatialExportComponent } from './spatial-export/spatial-export.component';
import { TemporalOptionsComponent } from './temporal-options/temporal-options.component';
import { TemporalExportComponent } from './temporal-export/temporal-export.component';
import { SpatialMetricsComponent } from './spatial-metrics/spatial-metrics.component';
import { TemporalMetricsComponent } from './temporal-metrics/temporal-metrics.component';
import { MetricsComponent } from './metrics/metrics.component';
import { BurnTargetOptionsComponent } from './burn-target-options/burn-target-options.component';

const config: SocketIoConfig = { url: 'http://localhost:5050', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NotificationsComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    NavComponent,
    SpatialComponent,
    TemporalComponent,
    ToolsetComponent,
    FrappeatorProjectsComponent,
    FrappeatorProjectComponent,
    SpatialOptionsComponent,
    SpatialExportComponent,
    TemporalOptionsComponent,
    TemporalExportComponent,
    SpatialMetricsComponent,
    TemporalMetricsComponent,
    MetricsComponent,
    BurnTargetOptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    ChartModule,
    Ng5SliderModule,
    SuiModule,
     SocketIoModule.forRoot(config),
     NgxMapboxGLModule.withConfig({
         accessToken: 'pk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o1dm81NTIwMDN6MTJxbjlvOHBiNHdlOSJ9.lt8I4sU0ceA6N8Tnnmx2ig', // Optionnal, can also be set per map (accessToken input of mgl-map)
         geocoderAccessToken: 'pk.eyJ1IjoiYW50aG9ueXJhd2xpbnN1b20iLCJhIjoiY2o1dm81NTIwMDN6MTJxbjlvOHBiNHdlOSJ9.lt8I4sU0ceA6N8Tnnmx2ig' // Optionnal, specify if different from the map access token, can also be set per mgl-geocoder (accessToken input of mgl-geocoder)
     }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
