import { Injectable } from '@angular/core';
import { ArticleState } from 'src/app/store/state/article.state';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import * as actionTypes from 'src/app/store/actions/article.actions';

@Injectable({
  providedIn: 'root'
})
export class ArticlesFacadeService {
  articles$: Observable<Article[]> = this.store.select(state => state.articles.articles)
  constructor(private store: Store) { }

  loadArticles(): void{
    console.log("Dispatching FetchArticles from ArticlesFacadeService");
    this.store.dispatch(new actionTypes.FetchArticles());
  }

  loadArticleDetails(id: number): void{
    console.log("Dispatching FetchArticle from ArticlesFacadeService")
    this.store.dispatch(new actionTypes.GetArticle(id))
  }

}
