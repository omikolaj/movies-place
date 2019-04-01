import { Post } from './post.model';
import { Favorite } from './favorite.model';

export interface User
{
  userID?: number,
  username: string,
  email?: string,
  password: string,
  comments?: Comment[],
  posts?: Post[],
  favorites?: Favorite[],
  userLikesMappedToPost?: [{}],
}