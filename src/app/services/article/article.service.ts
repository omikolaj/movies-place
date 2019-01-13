import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private articles: Article[] = [
    {
      id: 1,
      title: "This movie was OK",
      content: "The plot of this movie did not catch my attention right away"
    },
    {
      id: 2,
      title: "This movie was Great",
      content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    },
    {
      id: 3,
      title: "This movie was Bad!",
      content: "Duis nec aliquam diam. Etiam ut feugiat risus."
    }
  ];
  constructor() { }

  getArticles()//: Observable<Article[]>
  {
      return this.articles.slice();
  }
}
