import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient
    ) { }

  // Async Calls
  public fetchPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('api/v1/posts')  }

  public createNewPost(post: Post): Observable<Post>{
    console.log(post);

    return this.http.post<Post>('api/v1/posts', JSON.stringify(post)).pipe(
      shareReplay()
    )
      //This will not re-trigger the request if there are multiple subscribers
      
  }
}
