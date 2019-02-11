import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PostService } from 'src/app/services/post/post.service';
import { tap, switchMap, catchError, mergeMap, exhaustMap } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { RequestError } from 'src/app/models/requesterror.model';
import * as actions from '../actions/post.actions';

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
          exception: {}                   
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

    @Action(actions.FetchPostsStart)
    fetchAllStart({getState, patchState}: StateContext<PostStateModel>){
      const state = getState();
      return patchState({
        ...state,
        posts: [
          ...state.posts
        ],
        loading: true
      });
    };

    @Action(actions.FetchPosts)
    fetchAll(ctx: StateContext<PostStateModel>){
      console.log("fetching all posts");
      ctx.patchState({...ctx.getState(), loading: true})
        return this.postService.fetchPosts().pipe(tap((postsResults) => {
            const state = ctx.getState();
                ctx.patchState({
                ...state,
                posts: [                    
                    ...postsResults                    
                ],                
            })
        }),
        switchMap(() => {
          // we are using switchMap in this case, because we want to subscribe to the current observable and unsubscribe from it if another request is coming in to get all posts
          console.log("Inside of switchMap")
          return ctx.dispatch(new actions.FetchPostsSuccess())
        }),      
        catchError(err => 
        {
          console.log("Inside of catchError")
          return ctx.dispatch(new actions.FetchPostsFail(err))
        }
      ))
    }

    @Action(actions.FetchPostsSuccess)
    fetchAllSuccess({getState, patchState}: StateContext<PostStateModel>){
      const state = getState();
      return patchState({
        ...state,
        posts: [
          ...state.posts
        ],
        loading: false,
        error: 
        {
          message: "",
          exception: {}
        }
      });
    };

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
          exception: payload.exception
        }
      });
    };

}
