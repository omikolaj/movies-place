import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post/post.service';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { AuthState, AuthStateModel } from 'src/app/store/state/auth.state';
import { Select, Actions, ofActionDispatched } from '@ngxs/store';
import { Observable } from 'rxjs/internal/Observable';
import { Auth } from 'src/app/models/auth.model';
import { Router } from '@angular/router';
import * as actions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: ['./home.view.css'],
  providers: [PostService]
})
export class HomeView implements OnInit {

  constructor(
    private postsFacade: PostsFacadeService,
    private router: Router,
    private actions$: Actions
    ) { }

  ngOnInit() {
    this.postsFacade.loadPosts();
    
  }

}
