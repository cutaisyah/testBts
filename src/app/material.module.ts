import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
  ],
})
export class MyMaterialModule {}
