import { Component, OnInit, Input } from '@angular/core';
import { Post, Rating } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { MoviesFacadeService } from 'src/app/facades/movies-facade/movies-facade.service';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {
  @Input() public post: Post;
  @Input() public index: number;     
  rating: string;
  constructor(private authService: AuthService, public dialog: MatDialog,
    private router: Router, private route: ActivatedRoute, private postFacadeService: PostsFacadeService, private moviesFacade: MoviesFacadeService) { }

  ngOnInit() {    
    this.rating = Rating[this.post.rating];      
  }

  checkUser(){    
    if(this.authService.currentUserID == this.post.userID){
      return true;
    }
    else{
      return false;
    }
  }

  onPostEdit(){    
    this.router.navigate([{outlets: { modal: [this.post.postID, 'edit'] }}], {relativeTo: this.route});
  }

  onPostDelete(){
    this.postFacadeService.deletePost(this.post.postID);
  }

  
}
