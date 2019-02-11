import { Movie } from './movie.model';
import { User } from './user.model';

export interface Favorite
{
  id: number,
  note: string,
  userID: number,
  movieID: number,
  movie: Movie,
  user: User
}