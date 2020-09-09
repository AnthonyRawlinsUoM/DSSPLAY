import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnifiedReportComponent } from './unified-report/unified-report.component';
// import { TestComponent } from './test/test.component';
import {HistogramComponent} from './histogram/histogram.component';
import { MetricChooserComponent } from './metric-chooser/metric-chooser.component';
import { SqlControllerComponent } from './sql-controller/sql-controller.component';
import {SuperchooserComponent} from './superchooser/superchooser.component';


const routes: Routes = [
  { path:'welcome', component: WelcomeComponent, data: {state: 'welcome'}},
  { path:'reports', component: UnifiedReportComponent, data: {state: 'reports'}},
  { path:'test', component: SuperchooserComponent, data: {state: 'test'}},
  // { path:'sql', component: SqlControllerComponent, data: {state: 'sql'}},
  { path:'metrics', component: MetricChooserComponent, data: {state: 'sql'}},
  { path:'', component: WelcomeComponent, data: {state: 'welcome'}},
  { path: '**', component: PageNotFoundComponent, data: { state: '404' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
