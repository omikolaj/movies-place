import { User } from './user.model';
import { Movie } from './movie.model';
import { Post } from './post.model';

export interface Comment {
    id: number,
    content: string,
    postID: number,
    post: Post,
    userID: number,
    user: User
}