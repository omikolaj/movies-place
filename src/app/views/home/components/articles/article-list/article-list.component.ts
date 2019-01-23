import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  @Select(state => state.articles.articles)articles$: Observable<Article[]>
  constructor() {    
  }

  ngOnInit() {
  }
}
