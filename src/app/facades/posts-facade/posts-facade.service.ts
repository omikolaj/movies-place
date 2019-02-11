import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import * as actionTypes from 'src/app/store/actions/post.actions';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsFacadeService {
  public posts$: Observable<Post[]> = this.store.select(state => state.posts.posts)
  constructor(private store: Store) { }

  public loadPosts(): void{
    console.log("Dispatching FetchPosts from PostsFacadeService");
    this.store.dispatch(new actionTypes.FetchPosts());
  }

}
