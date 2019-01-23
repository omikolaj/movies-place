import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { Article } from 'src/app/models/article.model';
import { HomeService } from 'src/app/services/home/home.service';
import { Store } from '@ngxs/store';
import { FetchArticles } from '../../store/actions/home.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css'],
  providers: [ArticleService]
})
export class HomeView implements OnInit {
  constructor(
    private articleService: ArticleService, 
    private homeViewService: HomeService,
    private store: Store
    ) { }

  ngOnInit() {
    this.fetchArticles();
    this.homeViewService.movieSelected.subscribe((id) => 
    console.log(`Event trigger from Home ${id}`)
      //(id: number) => this.articleService.getArticle(id)
    )
  }

  fetchArticles(): void{
    this.store.dispatch(new FetchArticles());        
  }

}
