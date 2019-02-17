import { Component, OnInit } from '@angular/core';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { MoviesFacadeService } from 'src/app/facades/movies-facade/movies-facade.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Select, Store, Actions } from '@ngxs/store';
import { Observable} from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { mergeMap, map, tap } from 'rxjs/operators';
import * as actions from '../../../../store/actions/post.actions';
import { PostState } from 'src/app/store/state/post.state';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {    
  constructor(
    public postsFacade: PostsFacadeService,
    public moviesFacade: MoviesFacadeService,
    ) { }

  ngOnInit() {
  }
}
