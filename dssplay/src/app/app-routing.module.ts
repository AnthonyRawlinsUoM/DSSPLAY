import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { MappingComponent } from './mapping/mapping.component';
import { ChartingComponent } from './charting/charting.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserRoleChooserComponent } from './user-role-chooser/user-role-chooser.component';
import { UnifiedReportComponent } from './unified-report/unified-report.component';


const routes: Routes = [
  { path:'welcome', component: WelcomeComponent, data: {state: 'welcome'}},
  { path:'reports', component: UnifiedReportComponent, data: {state: 'reports'}},

  { path:'', component: WelcomeComponent, data: {state: 'welcome'}},
  { path: '**', component: PageNotFoundComponent, data: { state: '404' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
