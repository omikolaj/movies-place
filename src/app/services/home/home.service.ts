import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Article } from 'src/app/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  movieSelected = new Subject();
  public articles: Article[];
  constructor() { }

  onMovieSelected(id: number){

  }

  fetchArticles(){

  }
}
