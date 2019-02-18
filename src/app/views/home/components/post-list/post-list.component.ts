import { Component, OnInit } from '@angular/core';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { MoviesFacadeService } from 'src/app/facades/movies-facade/movies-facade.service';
import { RequestError } from 'src/app/models/requesterror.model';

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
