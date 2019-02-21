import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // Async Calls
  fetchPosts(): Observable<Post[]>{
    return this.http.get<Post[]>('api/v1/posts');
  }
}
