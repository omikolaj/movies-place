import { Post } from 'src/app/models/post.model';
import { RequestError } from 'src/app/models/requesterror.model';

export class CreatePost {
    static readonly type = '[POST] CreatePost';
    constructor(public payload: Post) { }
}

export class CreatePostSuccess{
  static readonly type = '[POST] CreatePostSuccess'
  constructor(public payload: Post) { }
}

export class CreatePostFail{
  static readonly type = '[POST] CreatePostFail'
  constructor(public payload: RequestError) { }
}

export class RemovePost{
    static readonly type = '[POST] Remove';
    constructor(public payload: Post) { }
}

export class FetchPosts{
    static readonly type = '[POST] FetchPosts'
    constructor() { }
}

export class FetchPostsSuccess{
  static readonly type = '[POST] FetchPostsSuccess';  
  constructor(public payload: Post[]) { }
}

export class FetchPostsFail{
  static readonly type = '[POST] FetchPostsFail'
  constructor(public payload: RequestError ) { }
}

export class FetchPost{
    static readonly type = '[POST] FetchPost'
    constructor(public payload: number) { }
}

export class UpdatePost{
  static readonly type ='[POST] UpdatePost';
  constructor(public payload: Post) { }
}

export class UpdatePostSuccess{
  static readonly type = '[POST] UpdatePostSuccess';
  constructor(public payload: Post) { }
}

export class UpdatePostFail{
  static readonly type = '[POST] UpdatePostFail';
  constructor(public payload: RequestError) { }
}

export class DeletePost{
  static readonly type = '[POST] DeletePost';
  constructor(public payload: number) { };
}

export class DeletePostSuccess{
  static readonly type = '[POST] DeletePostSuccess';
  constructor(public payload: number) { };
}

export class DeletePostFail{
  static readonly type = '[POST] DeletePostFail';
  constructor(public payload: RequestError) { };
}

