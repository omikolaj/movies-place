import { Movie } from './movie.model';
import { User } from './user.model';

export interface Post
{
  postID?: number,
  userID?: string,
  user?: User,
  title: string,
  description: string,  
  comments?: Comment[],
  movieID: number,
  movie: Movie,
  rating: Rating,
}

export enum Rating {
  Bad = 0,
  OK = 1,
  Decent = 2,
  Great = 3,
  Excellent = 4
}