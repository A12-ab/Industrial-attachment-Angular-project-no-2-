import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParentComponent } from './parent/parent.component';
import { ApiDataComponent } from './api-data/api-data.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'api-data', component: ApiDataComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
