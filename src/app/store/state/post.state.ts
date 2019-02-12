import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PostService } from 'src/app/services/post/post.service';
import { tap, switchMap, catchError, mergeMap, exhaustMap, retryWhen, delayWhen, delay, take, concatMap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { RequestError } from 'src/app/models/requesterror.model';
import * as actions from '../actions/post.actions';
import { timer, iif, throwError, of, SubscribableOrPromise } from 'rxjs';

export interface PostStateModel {
    posts: Post[];
    loading: boolean;
    error: RequestError;
}

@State<PostStateModel>({
    name: 'posts',
    defaults: {
        posts: [],
        loading: false,
        error: {
          message: "",
          error: ""                   
        },
    }
})

export class PostState{    
    constructor(private postService: PostService) {}

    @Selector()
    static getPosts(state: PostStateModel){
        return state.posts;
    }

    @Action(actions.AddPost)
    add({getState, patchState}: StateContext<PostStateModel>, { payload }: actions.AddPost){
        const state = getState();
        patchState({
            posts: [...state.posts, payload]
        })
    }

    @Action(actions.RemovePost)
    remove({getState, patchState}: StateContext<PostStateModel>, { payload }: actions.RemovePost) {
        patchState({
            posts: getState().posts.filter(a => a.title !== payload.title)
        })
    }

    // concatMap((e, i) => 
    //                   iif(() => i > 1,
    //                     throwError(e),
    //                     of(e).pipe(delay(2000))
    //                 ))

    @Action(actions.FetchPosts)
    fetchAll(ctx: StateContext<PostStateModel>){
      console.log("fetching all posts");
      ctx.patchState({...ctx.getState(), loading: true})
        return this.postService.fetchPosts().pipe(
        switchMap((postsRequest) => {
          // we are using switchMap in this case, because we want to subscribe to the current observable and unsubscribe from it if another request is coming in to get all posts
          console.log("Inside of switchMap. Dispatching posts success")
          return ctx.dispatch(new actions.FetchPostsSuccess(postsRequest))
        }),
        retryWhen(errors => {
          return errors
                  .pipe(
                    delayWhen((error, i) => 
                    {
                      if(i != 3){
                        console.log(`Sometheing went wrong connecting to the server. Retrying 3 times. Attempting: ${i + 1}...`);
                      }
                      return iif(() => i + 1 >= 4,
                       throwError(error),
                       timer(2000)
                      )
                    })                    
                  );
        }),
        catchError(err => 
        {
          // Return user friendly error message
          console.log("Displaying user friendly error message", err)
          ctx.dispatch(new actions.FetchPostsFail(err))
          return throwError(err);
        }),
        catchError(err => {
          console.log("An error occured. Returning empty collection");
          return of([]);
        })
        )
        .subscribe(
          res => console.log("HTTP response", res),
          err => console.log("HTTP Error", err),
          () => console.log('HTTP request completed')
        )
    }

    @Action(actions.FetchPostsSuccess)
    fetchAllSuccess(ctx: StateContext<PostStateModel>, { payload }: actions.FetchPostsSuccess) {
      const state = ctx.getState();
      ctx.patchState({
        ...state,
        posts: [
          ...payload
        ],
      })
    }

    @Action(actions.FetchPostsFail)
    fetchAllFail({getState, patchState}: StateContext<PostStateModel>, { payload }: actions.FetchPostsFail){
      const state = getState();
      return patchState({
        ...state,
        posts: [
          ...state.posts
        ],
        loading: false,
        error: 
        {
          message: payload.message,
          error: payload.error
        }
      });
    };

}
