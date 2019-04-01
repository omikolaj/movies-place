import { RequestError } from 'src/app/models/requesterror.model';
import { User } from 'src/app/models/user.model';

export class MapUserLikeToPost{
  static readonly type = '[USER] MapUserLikeToPost';
  constructor(public payload: number) { };
}
