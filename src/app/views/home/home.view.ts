import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post.model';
import { HomeService } from 'src/app/services/home/home.service';
import { Store } from '@ngxs/store';
import { FetchPosts } from '../../store/actions/post.actions';
import { Observable } from 'rxjs';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css'],
  providers: [PostService]
})
export class HomeView implements OnInit {
  constructor(
    private store: Store,
    private articleFacade: PostsFacadeService
    ) {
      this.articleFacade.loadPosts();
     }

  ngOnInit() {
    //this.fetchArticles();
    
      //(id: number) => this.articleService.getArticle(id)
  }

  // fetchArticles(): void{
  //   this.store.dispatch(new FetchArticles());        
  // }

}
