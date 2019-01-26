import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { HomeService } from 'src/app/services/home/home.service';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {
  @Input() public article: Article;
  @Input() public index: number;  
  constructor() { }

  ngOnInit() {
  }

  

}
