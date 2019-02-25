import { Movie } from './movie.model';
import { User } from './user.model';

export interface Post
{
  postID?: number,
  userID: number,
  user?: User,
  title: string,
  description: string,  
  comments?: Comment[],
  movieID: number,
  movie: Movie,
  rating: Rating,
}

export enum Rating {
  Bad = 1,
  OK = 2,
  Decent = 3,
  Great = 4,
  Excellent = 5
}