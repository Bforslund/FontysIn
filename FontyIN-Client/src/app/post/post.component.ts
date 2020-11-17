import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService} from '../services/posts.service';
import { Moment } from 'moment';
import { User } from '../classes/Profile/User';
import { ProfileService } from '../services/profile/profile.service';

export interface Post {
  content: string;
  date: string;
  id: number;
  userId: number;
}
export interface Like {
  id: number;
  postId: number;
  userId: number;
}
export interface Comment {
  content: string;
  date: string;
  id: number;
  userId: number;
  postId: number;
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()  post : Post;
  comments: Comment[];
  @Input() id ;
  constructor( private postService: PostsService, private profileService: ProfileService) { }
  data = {};
  content : String;
  commentContent : String;
  commentData = {};
  time : Moment;
  user: User;
  likeCount = 0;

  getUserById(id){
    user: User;
    this.profileService.getUserById(this.post.userId)
    .subscribe((data)=>
    {
     
      return <User>data;

    });

  }

  createComment(id) {
    this.commentData = {
      "content": this.commentContent,
      "id": 0,
      "postId": id,
      "userId": localStorage.getItem("userId")
      };
    this.postService.newComment(<JSON>this.commentData);
    // window.location.reload();
    
  }

  createPost() {
    this.data = {
      "content": this.content,
      "id": 5,
      "userId": localStorage.getItem("userId")
      };
    this.postService.newPost(<JSON>this.data);
    window.location.reload()
  }

  deletePost(id){
    this.postService.deletePost(id);
    window.location.reload()
  }

  

  ngOnInit(): void {
    this.postService.getPostLikesCount(this.id)
    .subscribe((data)=>
    {
      
      this.likeCount=<number>data;

    });
  //   this.postService.getPost(this.id)
  //    .subscribe((data)=>{
  //    console.log(data);
  //     this.post = <Post>data;
  //  });
   this.postService.getCommentsByPostId(this.id)
   .subscribe((data)=>{
   console.log(data);
    this.comments = <Comment[]>data;
    });
    this.profileService.getUserById(this.post.userId)
    .subscribe((data)=>
    {
      console.log(data);
      this.user=<User>data;

    });
    
  }

}
