import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as actionTypes from 'src/app/store/actions/post.actions';
import { Post } from 'src/app/models/post.model';
import { PostState } from 'src/app/store/state/post.state';
import { RequestError } from 'src/app/models/requesterror.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PostsFacadeService {
  @Select(PostState.posts) posts$: Observable<Post[]>;
  @Select(PostState.request("loading")) loading$: Observable<boolean>;
  @Select(PostState.request("error")) error$: Observable<RequestError>;
  constructor(private store: Store) {  }

  public loadPosts(): void{
    console.log("Dispatching FetchPosts from PostsFacadeService");      
    this.store.dispatch(new actionTypes.FetchPosts());
  }

  public createPost(post: FormGroup): void{
    console.log("Dispatching CreatePost from PostsFacadeService");
    const newPost: Post = {
      userID: 1,
      title: post.value.postTitle,
      description: post.value.description,
      rating: 2,
      movieID: 1,
      movie: {
        movieID: 1,
        title: post.value.movieTitle,        
      }
    }
    this.store.dispatch(new actionTypes.CreatePost(newPost));
  }

}
