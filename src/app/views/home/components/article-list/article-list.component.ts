import { Component, OnInit } from '@angular/core';
import { ArticlesFacadeService } from 'src/app/facades/articles-facade/articles-facade.service';
import { MoviesFacadeService } from 'src/app/facades/movies-facade/movies-facade.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {    
  
  constructor(
    public articlesFacade: ArticlesFacadeService,
    public moviesFacade: MoviesFacadeService) {    
  }

  ngOnInit() {
  }
}
