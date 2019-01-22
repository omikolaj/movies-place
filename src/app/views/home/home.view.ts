import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article/article.service';
import { Article } from 'src/app/models/article.model';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css']
})
export class HomeView implements OnInit {
  private articles: Article[];
  constructor(private articleService: ArticleService, 
    private homeViewService: HomeService) { }

  ngOnInit() {
    this.getArticles();
    this.homeViewService.movieSelected.subscribe((id) => 
    console.log(`Event trigger from Home ${id}`)
      //(id: number) => this.articleService.getArticle(id)
    )
  }

  getArticles(): void{
    this.articles = this.articleService.getArticles();
  }

}
