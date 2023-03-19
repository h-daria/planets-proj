import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { DialogRoutingModule } from './dialog-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DialogComponent],
  imports: [CommonModule, DialogRoutingModule, SharedModule],
})
export class DialogModule {}
