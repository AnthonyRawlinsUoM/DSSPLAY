import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SpatialComponent } from './spatial/spatial.component';
import { TemporalComponent } from './temporal/temporal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path:'welcome', component: WelcomeComponent, data: {state: 'welcome'}},
  { path:'spatial', component: SpatialComponent, data: {state: 'welcome'}},
  { path:'temporal', component: TemporalComponent, data: {state: 'welcome'}},

  { path:'', component: WelcomeComponent, data: {state: 'welcome'}},
  { path: '**', component: PageNotFoundComponent, data: { state: '404' } }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
