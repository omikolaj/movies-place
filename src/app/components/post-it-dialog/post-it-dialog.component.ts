import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostItDialogData } from 'src/app/models/post-dialog-data.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { Rating, Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Params } from '@fortawesome/fontawesome-svg-core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { tap } from 'rxjs/operators';
import { PostState } from 'src/app/store/state/post.state';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post-it',
  templateUrl: './post-it-dialog.component.html',
  styleUrls: ['./post-it-dialog.component.css']
})
export class PostItDialog implements OnInit {
  @Select(PostState.posts) postState$: Observable<Post[]>;
  public selectedFile: File = null;
  public selectedFileFormData = new FormData();
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
    private route: ActivatedRoute,
    private http: HttpClient) {
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

  onSubmit() {
    this.dialogRef.close();
    console.log("Inside of onSubmit new post", this.postForm);
    if (this.editMode) {
      const post = this.posts.find(p => p.postID == this.postID);
      const formObjEdit = {
        userID: post.userID,
        postID: post.postID,
        title: this.postForm.value.postTitle,
        description: this.postForm.value.description,
        rating: this.postForm.value.rating,
        moviePictureURL: post.moviePictureURL,
        moviePictureID: post.moviePictureID,
        movieID: post.movie.movieID,
        movie: {
          title: this.postForm.value.movieTitle,
          movieID: post.movie.movieID
        }
      }
      this.selectedFileFormData.append("postForm", JSON.stringify(formObjEdit));      

      const editPostDTO = {
        postID: this.postID,
        formData: this.selectedFileFormData
      }
      this.postsFacade.updatePost(editPostDTO);
    }
    else {      
      const formObj = {
        title: this.postForm.value.postTitle,
        description: this.postForm.value.description,
        rating: this.postForm.value.rating,        
        movie: {
          title: this.postForm.value.movieTitle
        },
        UserID: this.authService.currentUserID
      }
      this.selectedFileFormData.append("postForm", JSON.stringify(formObj));
      this.selectedFileFormData.append("userID", JSON.stringify(this.authService.currentUserID));
      this.postsFacade.createPost(this.selectedFileFormData);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event) {
    console.log(event);
    const headers = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'

      })
    }
    const selectedFile = <File>event.target.files[0];
    this.selectedFileFormData.append('movies-place-image', selectedFile, selectedFile.name);
    //const fd = new FormData();
    // fd.append('movies-place-image', selectedFile, selectedFile.name)

    // this.http.post('api/v1/posts/upload', fd, headers)
    // .subscribe(
    //   res => {
    //     console.log(res)
    //   }
    // )
  }

  private initForm() {
    let postTitle = '';
    let description = '';
    let movieTitle = '';
    let rating = null;

    if (this.editMode) {
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
