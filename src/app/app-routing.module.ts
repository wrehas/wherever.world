import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
// import { CrisisListComponent }   from './crisis-list.component';
// import { HeroListComponent }     from './hero-list.component';
// import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
//   { path: 'crisis-center', component: CrisisListComponent },
//   { path: 'heroes',        component: HeroListComponent },
{ path: '',   redirectTo: '/kitty', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }
{path: 'kitty', loadChildren: './kitty/kitty.module#KittyModule'},    
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
