import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { Article } from 'src/app/models/article.model';
import { HomeService } from 'src/app/services/home/home.service';
import { Store } from '@ngxs/store';
import { FetchArticles } from '../../store/actions/article.actions';
import { Observable } from 'rxjs';
import { ArticlesFacadeService } from 'src/app/facades/articles-facade/articles-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css'],
  providers: [ArticleService]
})
export class HomeView implements OnInit {
  constructor(
    private store: Store,
    private articleFacade: ArticlesFacadeService
    ) {
      this.articleFacade.loadArticles();
     }

  ngOnInit() {
    //this.fetchArticles();
    
      //(id: number) => this.articleService.getArticle(id)
  }

  // fetchArticles(): void{
  //   this.store.dispatch(new FetchArticles());        
  // }

}
