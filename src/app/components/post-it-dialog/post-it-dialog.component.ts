import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostItDialogData } from 'src/app/models/post-dialog-data.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { Rating } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it-dialog.component.html',
  styleUrls: ['./post-it-dialog.component.css']
})
export class PostItDialog implements OnInit {
  public postForm: FormGroup; 
  public ratings = Rating;  
  
  constructor(
    public dialogRef: MatDialogRef<PostItDialog>,    
    @Inject(MAT_DIALOG_DATA) public data: PostItDialogData,    
    private postsFacade: PostsFacadeService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.postForm = this.fb.group({      
        postTitle: this.fb.control(null, [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),        
        description: this.fb.control(null, Validators.required),      
        movieTitle: this.fb.control(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
        rating: this.fb.control(null, [Validators.required])
      })
  }

  onSubmit(){    
    this.dialogRef.close();
    console.log(this.postForm);    
    this.postsFacade.createPost(this.postForm);
  }

  onNoClick(): void{    
    this.dialogRef.close();    
  }

}