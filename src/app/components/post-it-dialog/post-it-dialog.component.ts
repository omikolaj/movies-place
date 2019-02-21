import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostItDialogData } from 'src/app/models/post-dialog-data.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-it',
  templateUrl: './post-it-dialog.component.html',
  styleUrls: ['./post-it-dialog.component.css']
})
export class PostItDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<PostItDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PostItDialogData,
    private router: Router) { }

  ngOnInit() {
    console.log('inside of post it dialog',this.router.routerState)
  }

  onNoClick(): void{
    this.dialogRef.close();
  }

}
