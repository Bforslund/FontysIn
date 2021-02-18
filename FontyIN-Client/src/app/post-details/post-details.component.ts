import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService} from '../services/posts.service';
import { Moment } from 'moment';

export interface Post {
  content: string;
  date: string;
  id: number;
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
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private postService: PostsService) { }

  postId = 0;
  post: Post; 
  comments: Comment[];
  content : String;
  data = {};
  time : Moment;

  createComment() {
    this.data = {
      "content": this.content,
      "date": "2020-10-20",
      "id": 0,
      "postId": this.postId,
      "userId": 1
      };
    this.postService.newComment(<JSON>this.data);
    window.location.reload()
  }

  ngOnInit(): void {
    this.postId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.postId);
    this.postService.getPost(this.postId)
     .subscribe((data)=>{
     console.log(data);
      this.post = <Post>data;
   });
   this.postService.getCommentsByPostId(this.postId)
   .subscribe((data)=>{
   console.log(data);
    this.comments = <Comment[]>data;
    });
  }

}
