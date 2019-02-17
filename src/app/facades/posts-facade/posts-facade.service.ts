import { Injectable } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as actionTypes from 'src/app/store/actions/post.actions';
import { Post } from 'src/app/models/post.model';
import { PostState } from 'src/app/store/state/post.state';
import { RequestError } from 'src/app/models/requesterror.model';


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

}
