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
  public articles$: Observable<Article[]> = this.store.select(state => state.articles.articles)
  constructor(private store: Store) { }

  public loadArticles(): void{
    console.log("Dispatching FetchArticles from ArticlesFacadeService");
    this.store.dispatch(new actionTypes.FetchArticles());
  }

}
