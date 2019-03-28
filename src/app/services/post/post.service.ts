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
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'    
      })
    }

    return this.http.post<Post>('api/v1/posts', JSON.stringify(post), headers).pipe(
      shareReplay()
    )
      //This will not re-trigger the request if there are multiple subscribers
      
  }

  public updatePost(updatedPost: Post){
    console.log("Inside of updatePost");
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.patch<Post>(`api/v1/posts/${updatedPost.postID}`, JSON.stringify(updatedPost), headers)
  }

  public deletePost(postToDeleteID: number): Observable<number>{
    console.log("Inside of deletePost with ID: ", postToDeleteID);
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.delete<number>(`api/v1/posts/${postToDeleteID}`, headers);
  }
}
