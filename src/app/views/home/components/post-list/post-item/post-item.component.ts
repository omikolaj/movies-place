import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Post, Rating } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { MoviesFacadeService } from 'src/app/facades/movies-facade/movies-facade.service';
import { UserService } from 'src/app/services/user/user-service.service';
import { UserLike } from '../post-list.component';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit, OnDestroy{  
  @Input() public post: Post;
  @Input() public index: number; 
  @Input() public userIDs: UserLike[] = [];   
  @Output() userLike = new EventEmitter<{userID: string, postID: number}>();
  rating: string;  
  likes: number;
  
  constructor(private authService: AuthService, public dialog: MatDialog,
  private router: Router, private route: ActivatedRoute, private postFacadeService: PostsFacadeService, private moviesFacade: MoviesFacadeService, private userService: UserService) 
  {
    
  }

  ngOnInit() {    
    console.log("PostItem Component ON INIT. POST IS: ", this.post);
    console.log("POSTITEM. userIDs are: ", this.userIDs);
    this.likes = this.post.likes;
    this.rating = Rating[this.post.rating];      
  }

  ngOnDestroy(){
    console.log("INSIDE DESTROY. POST IS: ", this.post);
  }

  checkUser(){    
    if(this.authService.currentUserID == this.post.userID){
      return true;
    }
    else{
      return false;
    }
  }

  onLikeClick() {
    const postID = this.post.postID;
    if (this.userIDs.length > 0) {
      this.userIDs.forEach(uL => {
        // this means user is in the list and has liked at least one post
        if (uL.userID === this.authService.currentUserID) {
          // check if user has already liked THIS post
          if(!uL.postIDs.includes(postID)){
            this.postFacadeService.addLike(postID);
            this.likes += 1;
            this.userLike.emit({ userID: uL.userID, postID: postID })
          }
        }
      })
    } else {
      // this means user NOT in the list and has not liked any posts     
      this.postFacadeService.addLike(this.post.postID);
      this.likes += 1 ;
      this.userLike.emit({ userID: this.authService.currentUserID, postID: this.post.postID })
    }
  }

  onPostEdit(){    
    this.router.navigate([{outlets: { modal: [this.post.postID, 'edit'] }}], {relativeTo: this.route});
  }

  onPostDelete(){
    this.postFacadeService.deletePost(this.post.postID);
  }
  
}
