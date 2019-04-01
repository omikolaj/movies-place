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

  public createNewPost(post: FormData): Observable<Post>{
    console.log(post);
    const headers = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json'    
        'X-Requested-With': 'XMLHttpRequest'
      })
    }
    return this.http.post<Post>('api/v1/posts', post, headers).pipe(
      shareReplay()
    )
      //This will not re-trigger the request if there are multiple subscribers
      
  }

  public addLike(postID: number): Observable<Post>{
    console.log("Inside of add like in post service");
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.patch<Post>(`api/v1/posts/like/${postID}`, {}, headers)
  }

  public updatePost(updatedPost: any){
    console.log("Inside of updatePost");
    const headers = {
      headers: new HttpHeaders({
        'X-Requested-With': 'XMLHttpRequest'
      })
    }
    return this.http.patch<Post>(`api/v1/posts/${updatedPost.postID}`, updatedPost.formData, headers)
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
