import { Post } from './post.model';
import { Favorite } from './favorite.model';

export interface Movie {
    movieID: number,
    title: string,
    favorites?: Favorite[],
    posts?: Post[]

}