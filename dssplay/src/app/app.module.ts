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

import { MappingComponent } from './mapping/mapping.component';
import { ChartingComponent } from './charting/charting.component';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { FrappeatorProjectsComponent } from './frappeator-projects/frappeator-projects.component';
import { FrappeatorProjectComponent } from './frappeator-project/frappeator-project.component';
import { MappingOptionsComponent } from './mapping-options/mapping-options.component';
import { MappingExportComponent } from './mapping-export/mapping-export.component';
import { ChartingOptionsComponent } from './charting-options/charting-options.component';
import { ChartingExportComponent } from './charting-export/charting-export.component';
import { MetricsComponent } from './metrics/metrics.component';
import { BurnTargetOptionsComponent } from './burn-target-options/burn-target-options.component';
import { InterpretationComponent } from './interpretation/interpretation.component';
import { WeatherOptionsComponent } from './weather-options/weather-options.component';
import { FuelOptionsComponent } from './fuel-options/fuel-options.component';
import { ChoicesSummaryComponent } from './choices-summary/choices-summary.component';
import { CatchmentOptionsComponent } from './catchment-options/catchment-options.component';
import { ViewshedOptionsComponent } from './viewshed-options/viewshed-options.component';
import { XAxisChooserComponent } from './x-axis-chooser/x-axis-chooser.component';
import { YAxisChooserComponent } from './y-axis-chooser/y-axis-chooser.component';
import { PlaybackComponent } from './playback/playback.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ComparatorChoicesComponent } from './comparator-choices/comparator-choices.component';
import { ChoiceflowComponent } from './choiceflow/choiceflow.component';
import { ExplanationLinkComponent } from './explanation-link/explanation-link.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { ExplainDirective } from './explain.directive';
import { WeatherPanelsComponent } from './weather-panels/weather-panels.component';
import { FuelPanelsComponent } from './fuel-panels/fuel-panels.component';
import { UserRoleChooserComponent } from './user-role-chooser/user-role-chooser.component';
import { GlowDirective } from './glow.directive';

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
    MappingComponent,
    ChartingComponent,
    FrappeatorProjectsComponent,
    FrappeatorProjectComponent,
    MappingOptionsComponent,
    MappingExportComponent,
    ChartingOptionsComponent,
    ChartingExportComponent,
    MetricsComponent,
    BurnTargetOptionsComponent,
    InterpretationComponent,
    WeatherOptionsComponent,
    FuelOptionsComponent,
    ChoicesSummaryComponent,
    CatchmentOptionsComponent,
    ViewshedOptionsComponent,
    XAxisChooserComponent,
    YAxisChooserComponent,
    PlaybackComponent,
    TimelineComponent,
    ComparatorChoicesComponent,
    ChoiceflowComponent,
    ExplanationLinkComponent,
    ExplanationComponent,
    ExplainDirective,
    WeatherPanelsComponent,
    FuelPanelsComponent,
    UserRoleChooserComponent,
    GlowDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
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
