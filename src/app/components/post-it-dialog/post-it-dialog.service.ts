import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PostItDialog } from './post-it-dialog.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class PostItDialogService {
  
  constructor(
    private location: Location,
    private router: Router
    ) { }
 
  public openPostItDialog(dialog: MatDialog): void {
    const dialogRef = dialog.open(PostItDialog, {
      width: '350px'
    });
    const url = this.router.createUrlTree(['posts/new']).toString();
    this.location.go(url);
    console.log("Dialog was open");

    dialogRef.afterClosed().subscribe(() => {
      console.log("The dialog was closed");
      this.location.go("");
    })
  }
}
