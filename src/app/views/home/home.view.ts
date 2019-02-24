import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css'],
  providers: [PostService]
})
export class HomeView implements OnInit {
  constructor(
    private postsFacade: PostsFacadeService
    ) {
      
     }

  ngOnInit() {
    this.postsFacade.loadPosts();
  }

  // fetchArticles(): void{
  //   this.store.dispatch(new FetchArticles());        
  // }

}
