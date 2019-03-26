import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostItDialogData } from 'src/app/models/post-dialog-data.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { Rating, Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Params } from '@fortawesome/fontawesome-svg-core';
import { ActivatedRoute, Router,  ActivatedRouteSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PostState } from 'src/app/store/state/post.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it-dialog.component.html',
  styleUrls: ['./post-it-dialog.component.css']
})
export class PostItDialog implements OnInit {
  @Select(PostState.posts) postState$: Observable<Post[]>;

  public postForm: FormGroup; 
  public ratings = Rating;    
  private editMode: boolean = false;
  private posts: Post[];
  private postID: number;  
  
  constructor(
    public dialogRef: MatDialogRef<PostItDialog>,    
    @Inject(MAT_DIALOG_DATA) public data: PostItDialogData,    
    private postsFacade: PostsFacadeService,
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute    ) { 
    }

  ngOnInit() {
    this.route.firstChild
      .children
      .filter(routes => routes.outlet == 'modal')
      .map(r => r.params.subscribe(
        (params) => {
          console.log("INSIDE OF OUTLET: ", this.route.firstChild.children[1].outlet)
          console.log("VALUE OF PARAMS IN THIS OUTLET IS: ", params);
          this.editMode = params['id'] != null
          this.postID = +params['id']
        }
      ))

    this.postState$.subscribe(
      (posts: Post[]) => this.posts = posts
    )

    this.initForm();
  }

  onSubmit(){    
    this.dialogRef.close();
    console.log("Inside of onSubmit new post",this.postForm);        
    this.postsFacade.createPost(this.postForm, this.authService.currentUserID);
  }

  onNoClick(): void{    
    this.dialogRef.close();    
  }

  private initForm(){
    let postTitle = '';
    let description = '';
    let movieTitle = '';
    let rating = null;
    
    if(this.editMode){
      const post: Post = this.posts.find(p => p.postID == this.postID);
      postTitle = post.title;
      description = post.description;
      movieTitle = post.movie.title;
      rating = post.rating;
    }
    this.postForm = this.fb.group({      
      postTitle: this.fb.control(postTitle, [Validators.required, Validators.maxLength(100), Validators.minLength(4)]),        
      description: this.fb.control(description, Validators.required),      
      movieTitle: this.fb.control(movieTitle, [Validators.required, Validators.maxLength(50), Validators.minLength(3)]),
      rating: this.fb.control(rating, [Validators.required])
    })
  }

}
