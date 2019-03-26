import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostItDialog } from './post-it-dialog.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { PostItDialogService } from './post-it-dialog.service';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PostItDialog,
  ],
  entryComponents: [
    PostItDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    AngularMaterialModule,
    SharedModule
  ],
  exports: [
    PostItDialog
  ],
  providers: [
    PostItDialogService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ]
})
export class PostItDialogModule { }
