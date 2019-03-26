import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PostItDialogService } from '../post-it-dialog/post-it-dialog.service';

@Component({
  selector: 'app-post-it-dialog-container',
  templateUrl: './post-it-dialog-container.component.html',
  styleUrls: ['./post-it-dialog-container.component.css']
})
export class PostItDialogContainerComponent implements OnInit {

  constructor(public dialog: MatDialog, private postItDialog: PostItDialogService) { }

  ngOnInit() {
    console.log("Inside of post it dialog container");
    this.postItDialog.openPostItDialog(this.dialog);
  }

}
