import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArticleService } from 'src/app/services/article/article.service';
import { store } from '@angular/core/src/render3';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.view.html',
  styleUrls: ['./article-list.view.css']
})
export class ArticleListView implements OnInit {
  @Select(state => state.articles.articles)articles$: Observable<Article[]>
  constructor(private store: Store) {    
  }

  ngOnInit() {
  }

  onMovieClicked(id: number){
    console.log(id);
  }
}
