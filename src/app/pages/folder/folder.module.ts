import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { ComponentsModule } from '../../components/components.module';
import { FechaPipe } from '../../pipes/fecha.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolderPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    FolderPage,
    FechaPipe,
  ],
  exports: [
    FechaPipe,
  ]
})
export class FolderPageModule {}
