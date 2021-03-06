import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
// import { ChartsModule, ThemeService } from 'ng2-charts';

import { ChartModule } from 'angular2-chartjs';

// import {} from 'maxird-ng-semantic-ui';
import { FomanticUIModule } from 'ngx-fomantic-ui';
import "chartjs-chart-box-and-violin-plot/build/Chart.BoxPlot.js";

import { NgxGaugeModule } from 'ngx-gauge';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MappingComponent } from './mapping/mapping.component';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';

import { MappingOptionsComponent } from './mapping-options/mapping-options.component';
import { MappingExportComponent } from './mapping-export/mapping-export.component';
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
import { ChoiceflowComponent } from './choiceflow/choiceflow.component';
import { ExplanationLinkComponent } from './explanation-link/explanation-link.component';
import { ExplanationComponent } from './explanation/explanation.component';
import { ExplainDirective } from './explain.directive';
import { WeatherPanelsComponent } from './weather-panels/weather-panels.component';
import { FuelPanelsComponent } from './fuel-panels/fuel-panels.component';
import { UserRoleChooserComponent } from './user-role-chooser/user-role-chooser.component';
import { GlowDirective } from './glow.directive';
import { DockableDirective } from './dockable.directive';
import { DraggableDirective } from './draggable.directive';
import { ResizableDirective } from './resizable.directive';
import { ViewpanelComponent } from './viewpanel/viewpanel.component';
import { PanelContainerComponent } from './panel-container/panel-container.component';
import { PanelResizeHandleComponent } from './panel-resize-handle/panel-resize-handle.component';
import { PanelComponent } from './panel/panel.component';
import { UnifiedReportComponent } from './unified-report/unified-report.component';
import { TestComponent } from './test/test.component';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';
import { ConsoleComponent } from './console/console.component';
import { SqlBuilderComponent } from './sql-builder/sql-builder.component';
import { StatsPanelComponent } from './stats-panel/stats-panel.component';
import { SqlControllerComponent } from './sql-controller/sql-controller.component';
import { DataframeTableComponent } from './dataframe-table/dataframe-table.component';
import { ModularReportComponent } from './modular-report/modular-report.component';
import { BoxplotComponent } from './boxplot/boxplot.component';
import { BarchartComponent } from './barchart/barchart.component';
import { MetricSpecificsComponent } from './metric-specifics/metric-specifics.component';
import { MetricChooserComponent } from './metric-chooser/metric-chooser.component';
import { ReplicatesComponent } from './replicates/replicates.component';
import { HistogramComponent } from './histogram/histogram.component';
import { LinechartComponent } from './linechart/linechart.component';
import { GaugeComponent } from './gauge/gauge.component';
import { DfConsumerDirective } from './df-consumer.directive';
import { CollectorDirective } from './collector.directive';
import { DfSummaryConsumerDirective } from './df-summary-consumer.directive';
import { StatviewComponent } from './statview/statview.component';
import { QuartileboxesComponent } from './quartileboxes/quartileboxes.component';
import { SuperchooserComponent } from './superchooser/superchooser.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


// import { DragDropModule } from '@angular/cdk/drag-drop';

const PORT = 4040;

// const config: SocketIoConfig = { url: 'http://localhost:4040', options: {} };
const config: SocketIoConfig = { url: `http://localhost:${PORT}`, options: {} };

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
    MappingOptionsComponent,
    MappingExportComponent,
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
    ChoiceflowComponent,
    ExplanationLinkComponent,
    ExplanationComponent,
    ExplainDirective,
    WeatherPanelsComponent,
    FuelPanelsComponent,
    UserRoleChooserComponent,
    GlowDirective,
    DockableDirective,
    DraggableDirective,
    ResizableDirective,
    ViewpanelComponent,
    PanelContainerComponent,
    PanelResizeHandleComponent,
    PanelComponent,
    UnifiedReportComponent,
    TestComponent,
    ErrorHandlerComponent,
    ConsoleComponent,
    SqlBuilderComponent,
    StatsPanelComponent,
    SqlControllerComponent,
    DataframeTableComponent,
    ModularReportComponent,
    BoxplotComponent,
    BarchartComponent,
    MetricSpecificsComponent,
    MetricChooserComponent,
    ReplicatesComponent,
    HistogramComponent,
    LinechartComponent,
    GaugeComponent,
    DfConsumerDirective,
    CollectorDirective,
    DfSummaryConsumerDirective,
    StatviewComponent,
    QuartileboxesComponent,
    SuperchooserComponent,
    MatPaginator,
    MatTableDataSource

  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartModule,
    Ng5SliderModule,
    NgxGaugeModule,
    FomanticUIModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
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
