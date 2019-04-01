import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsFacadeService } from 'src/app/facades/posts-facade/posts-facade.service';
import { MoviesFacadeService } from 'src/app/facades/movies-facade/movies-facade.service';
import { RequestError } from 'src/app/models/requesterror.model';
import { Rating } from 'src/app/models/post.model';
import { post } from 'selenium-webdriver/http';

export interface UserLike{
  userID: string,
  postIDs: number[]
}

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{ 
  defaultImgSrc: string = "../../../../../../../assets/images/movie_img_placeholder.jpg"     
  likedList: UserLike[] = [];
  constructor(
    public postsFacade: PostsFacadeService,
    public moviesFacade: MoviesFacadeService,
    ) { }

  ngOnInit() {
    console.log("INSIDE COMPONENT LIST ON INIT");
  }

  ngOnDestroy(){
    console.log("INSIDE COMPONENT LIST ON INIT");
  }

  onUserLiked(userLikeData: { userID: string, postID: number }) {    
    if (this.likedList.length > 0) {
      const userPosts = this.likedList.find(u => u.userID === userLikeData.userID).postIDs;
      if (userPosts) {
        const hasLikedPost = userPosts.includes(userLikeData.postID);
        if (!hasLikedPost) {        
          const add: UserLike = this.likedList.find(uL => uL.userID === userLikeData.userID);
          add.postIDs = [
            ...add.postIDs,
            userLikeData.postID
          ]
          this.likedList = this.likedList.map(uL => uL.userID === add.userID ? add : uL);
        }
      }
    }else {
      const addUser: UserLike = {
        userID: userLikeData.userID,
        postIDs: [
          userLikeData.postID
        ]
      }
      this.likedList = [
        ...this.likedList,
        addUser
      ]
    }
  }


}
