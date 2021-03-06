import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KittyComponent } from './kitty.component';
import { KittyService } from './kitty.service';



import { RouterModule, Routes } from '@angular/router';

import {MdToolbarModule, MdButtonModule, MdCheckboxModule } from '@angular/material';


export const routerConfig: Routes = [
  {
    path: '',
    component: KittyComponent
  },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routerConfig),
    MdButtonModule, MdCheckboxModule,
    MdToolbarModule
  ],
  declarations: [KittyComponent],
  providers: [KittyService]
})
export class KittyModule { }
