import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostItDialog } from '../views/post-it-dialog/post-it-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class PostItDialogService {
  name: string;
  constructor() { }

  public openPostItDialog(dialog: MatDialog): void {
    const dialogRef = dialog.open(PostItDialog, {
      width: '250px',
      data: { name: this.name} 
    });
    console.log("Dialog was open");    

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");      
      this.name = result;
    })
  }
}
