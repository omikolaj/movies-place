import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { PostService } from 'src/app/services/post/post.service';
import { tap, switchMap, catchError, mergeMap, exhaustMap, retryWhen, delayWhen, delay, take, concatMap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { RequestError } from 'src/app/models/requesterror.model';
import * as actions from '../actions/post.actions';
import { timer, iif, throwError, of, SubscribableOrPromise } from 'rxjs';

export interface PostStateModel {
    posts: Post[];
    request: {
        loading: boolean;
        error: RequestError;
      }
    
}

@State<PostStateModel>({
    name: 'posts',
    defaults: {
        posts: [],
        request: {
          loading: false,
          error: null
        }
    }
})

export class PostState{    
    constructor(private postService: PostService) {}

    @Selector()
    static posts(state: PostStateModel){
        return state.posts;
    }

    static request(type: string){
      return createSelector([PostState], (state: PostStateModel) => {        
        return state.request[type];
      })
    }

    @Action(actions.AddPost)
    add({getState, patchState}: StateContext<PostStateModel>, { payload }: actions.AddPost){
        const state = getState();
        patchState({
            posts: [...state.posts, payload]
        })
    };

    @Action(actions.FetchPost)
    fetchPost(ctx: StateContext<PostStateModel>)
    {
      
    };

    @Action(actions.RemovePost)
    remove({getState, patchState}: StateContext<PostStateModel>, { payload }: actions.RemovePost) {
        patchState({
            posts: getState().posts.filter(a => a.title !== payload.title)
        })
    };

    @Action(actions.FetchPosts)
    fetchAll(ctx: StateContext<PostStateModel>){
      console.log("fetching all posts");
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        request: {
          loading: true,
          error: {
            ...state.request.error
          }
        }
      })
        return this.postService.fetchPosts().pipe(
          switchMap((postsRequest) => {
            // we are using switchMap in this case, because we want to subscribe to the current observable and unsubscribe from it if another request is coming in to get all posts
            console.log("Inside of switchMap. Dispatching posts success")
            return ctx.dispatch(new actions.FetchPostsSuccess(postsRequest))}),
          catchError((error) => {
            ctx.dispatch(new actions.FetchPostsFail(error));
            return of([]);
          }))
          .subscribe(
            res => console.log("HTTP response", res),
            err => console.log("HTTP Error", err),
            () => console.log('HTTP request completed')
        )
      };

    @Action(actions.FetchPostsSuccess)
    fetchAllSuccess(ctx: StateContext<PostStateModel>, { payload }: actions.FetchPostsSuccess) {
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        posts: [
          ...payload
        ],
        request: {
          loading: false,
          error: null
        }
      })
    };

    @Action(actions.FetchPostsFail)
    fetchAllFail({getState, patchState}: StateContext<PostStateModel>, { payload }: actions.FetchPostsFail){
      const state = getState();
      return patchState({
        ...state,
        posts: [
          ...state.posts
        ],
        request: {
        loading: false,
        error: {
          error: true,
          errorResponse: payload
          }
        }
      });
    };

}
