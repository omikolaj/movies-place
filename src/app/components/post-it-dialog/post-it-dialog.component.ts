import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostItDialogData } from 'src/app/models/post-dialog-data.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it-dialog.component.html',
  styleUrls: ['./post-it-dialog.component.css']
})
export class PostItDialog implements OnInit {
  public postForm: FormGroup; 
  isLinear = false;
  firstFormGroup: FormGroup;
  

  constructor(
    public dialogRef: MatDialogRef<PostItDialog>,    
    @Inject(MAT_DIALOG_DATA) public data: PostItDialogData,    
    private postsFacade: PostsFacadeService,
    private _formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.postForm = this._formBuilder.group({      
        postTitle: this._formBuilder.control(null, [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),
        description: this._formBuilder.control(null, Validators.required),      
        movieTitle: this._formBuilder.control(null, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
        rating: this._formBuilder.control(null, Validators.required)
      })
  }

  onSubmit(){    
    this.dialogRef.close();
    console.log(this.postForm);    
    this.postsFacade.createPost(this.postForm);
    //this.postForm.reset();
    //this.postService.createNewPost(this.postForm);
  }

  onNoClick(): void{    
    this.dialogRef.close();
    //this.postFormFirst.reset();
  }

}