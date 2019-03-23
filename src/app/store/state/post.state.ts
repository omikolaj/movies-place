import { State, Action, StateContext, Selector, createSelector } from '@ngxs/store';
import { PostService } from 'src/app/services/post/post.service';
import { switchMap, catchError, mergeMap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { RequestError } from 'src/app/models/requesterror.model';
import * as actions from '../actions/post.actions';
import * as authActions from '../actions/auth.actions';
import { of } from 'rxjs';

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
    constructor(private postService: PostService) { }

    @Selector()
    static posts(state: PostStateModel){
        return state.posts;
    }

    static request(type: string){
      return createSelector([PostState], (state: PostStateModel) => {        
        return state.request[type];
      })
    }

    @Action(actions.CreatePost)
    add(ctx: StateContext<PostStateModel>, { payload }: actions.CreatePost){
        const state = ctx.getState();
        ctx.patchState({
          ...state,
          request: {
            loading: true,
            error: null
          }
        })
        return this.postService.createNewPost(payload).pipe(
          switchMap((addPostRequest) => {
            console.log(`Adding new post: ${payload}`);
            return ctx.dispatch(new actions.CreatePostSuccess(addPostRequest))}),
          catchError((error) => {
            ctx.dispatch(new actions.CreatePostFail(error));
            return of([]);
          }))
          .subscribe(
            res => console.log("HTTP response", res),
            err => console.log("HTTP error", err),
            () => console.log("HTTP request completed")
        )
    };

    @Action(actions.CreatePostSuccess)
    createPostSuccess(ctx: StateContext<PostStateModel>, { payload }: actions.CreatePostSuccess) {
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        posts: [
          payload,
          ...state.posts
        ],
        request: {
          loading: false,
          error: null
        }
      })
    };

    @Action(actions.FetchPostsFail)
    createPostFail(ctx: StateContext<PostStateModel>, { payload }: actions.FetchPostsFail){
      const state = ctx.getState();
      return ctx.patchState({
        ...state,
        posts: [
          ...state.posts
        ],
        request: {
        loading: false,
        error: payload
        }
      });
    };

    @Action(actions.FetchPost)
    fetchPost()
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
          error: null
        }
      })
        return this.postService.fetchPosts().pipe(
          switchMap((postsRequest) => {
            // we are using switchMap in this case, because we want to subscribe to the current observable and unsubscribe from it if another request is coming in to get all posts
            console.log("Inside of switchMap. Dispatching posts success")
            return ctx.dispatch(new actions.FetchPostsSuccess(postsRequest))}),
          catchError((error) => {
            console.log("Inside of catchError in fetchAll Posts");
            ctx.dispatch(new actions.FetchPostsFail(error));
            return of([]);
          }))
          .subscribe(
            res => console.log("HTTP response headers", res),
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
          ...payload.sort((p1, p2) => p2.postID - p1.postID)
        ],
        request: {
          loading: false,
          error: null
        }
      });
    };

    @Action(actions.FetchPostsFail)
    fetchAllFail(ctx: StateContext<PostStateModel>, { payload }: actions.FetchPostsFail){      
      if(payload.errorStatus.includes("401"))
      {
        ctx.dispatch(new authActions.Unauthorized());
      }
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        posts: [
          ...state.posts
        ],
        request: {
        loading: false,
        error: payload
        }
      });
      
    };

}
