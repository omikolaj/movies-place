import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostItDialogData } from 'src/app/models/post-dialog-data.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post/post.service';
import { PostItDialogService } from './post-it-dialog.service';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it-dialog.component.html',
  styleUrls: ['./post-it-dialog.component.css']
})
export class PostItDialog implements OnInit {
  public postForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PostItDialog>,    
    @Inject(MAT_DIALOG_DATA) public data: PostItDialogData,
    private postItDialogService: PostItDialogService,
    // private postService: PostService
    ) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'feed': new FormGroup({
        'title': new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),
        'description': new FormControl(null, Validators.required),
        'rating': new FormControl(null, Validators.required)
      }),
      'movie': new FormGroup({
        'title': new FormControl(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      })
    })
  }

  onSubmit(){    
    this.dialogRef.close();
    console.log(this.postForm);    
    this.postItDialogService.createNewPost(this.postForm)
    //this.postForm.reset();
    //this.postService.createNewPost(this.postForm);
  }

  onNoClick(): void{    
    this.dialogRef.close();
    this.postForm.reset();
  }

}
