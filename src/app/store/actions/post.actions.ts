import { Post } from 'src/app/models/post.model';
import { RequestError } from 'src/app/models/requesterror.model';

export class AddPost {
    static readonly type = '[POST] Add';
    constructor(public payload: Post) {}
}

export class RemovePost{
    static readonly type = '[POST] Remove';
    constructor(public payload: Post) {}
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
  constructor(public payload: RequestError ) {}
}

export class FetchPost{
    static readonly type = '[POST] FetchPost'
    constructor(public payload: number) { }
}
