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

export class FetchPostsStart{
  static readonly type = '[POST] FetchPostsStart'
  constructor() { }
}

export class FetchPosts{
    static readonly type = '[POST] FetchPosts'
    constructor() { }
}

export class FetchPostsSuccess{
  static readonly type = '[POST] FetchPostsSuccess';  
}

export class FetchPostsFail{
  static readonly type = '[POST] FetchPostsFail'
  constructor(public payload: RequestError ) {}
}

export class GetPost{
    static readonly type = '[POST] GetPost'
    constructor(public payload: number) { }
}
