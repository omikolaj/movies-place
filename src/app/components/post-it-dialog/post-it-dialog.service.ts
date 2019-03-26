import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostItDialog } from './post-it-dialog.component';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';

@Injectable()
export class PostItDialogService {
  
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
    ) { }
 
  public openPostItDialog(dialog: MatDialog): void {
    const dialogRef = dialog.open(PostItDialog, {
      width: '350px'
    });    
    console.log("Dialog was open");

    dialogRef.afterClosed().subscribe(() => {
      console.log("The dialog was closed");      
      this.router.navigate(['../'], {relativeTo: this.route})
    })
  }
}
