import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as actionTypes from 'src/app/store/actions/post.actions';
import { Post } from 'src/app/models/post.model';
import { PostState } from 'src/app/store/state/post.state';
import { RequestError } from 'src/app/models/requesterror.model';
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthStateModel, AuthState } from 'src/app/store/state/auth.state';
import { Auth } from 'src/app/models/auth.model';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsFacadeService {
  @Select(PostState.posts) posts$: Observable<Post[]>;
  @Select(PostState.request("loading")) loading$: Observable<boolean>;
  @Select(PostState.request("error")) error$: Observable<RequestError>;
  
  constructor(private store: Store, private router: Router) {  }

  ngOnInit(){
    
  }

  public loadPosts(): Observable<any>{
    console.log("Dispatching FetchPosts from PostsFacadeService");      
    return this.store.dispatch(new actionTypes.FetchPosts());
  }

  public createPost(post: FormData): Observable<any>{
    console.log("Dispatching CreatePost from PostsFacadeService");    
    return this.store.dispatch(new actionTypes.CreatePost(post));    
  }

  public addLike(postID: number){
    console.log("Dispatching addLike from PostsFacadeService");
    return this.store.dispatch(new actionTypes.AddLike(postID))
  } 

  public updatePost(updatedPost: any){
    console.log("Dispatching UpdatePost from PostsFacadeService");
    
    return this.store.dispatch(new actionTypes.UpdatePost(updatedPost))
  }

  public deletePost(postToDelete: number){
    return this.store.dispatch(new actionTypes.DeletePost(postToDelete))
  }

}
