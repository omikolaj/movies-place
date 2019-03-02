import { Post } from 'src/app/models/post.model';
import { RequestError } from 'src/app/models/requesterror.model';
import { Favorite } from 'src/app/models/favorite.model';

export interface UserStateModel{
  userID: number
  username: string
  email: string
  password: string
  comments: Comment[]
  posts: Post[]
  favorites: Favorite[]
  request: {
    loading: boolean,
    error: RequestError
  }
  

}