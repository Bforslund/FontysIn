import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule, Routes  } from '@angular/router';
import { PostsService} from '../services/posts.service';

export interface Post {
  content: string;
  date: string;
  id: number;
  userId: number;
}

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private routes: Router,
              private postService: PostsService) { }

  postId = 0;
  post: Post;
  newContent: String;
  data = {};

  saveVal(item){
    this.newContent = item.target.value;
  }

  updatePost(){
    this.data = {
      "content": this.newContent,
      "date": this.post.date,
      "id": this.postId,
      "userId": localStorage.getItem("userId")
      };
    this.postService.updatePost(<JSON>this.data,this.postId);

     this.routes.navigate(['/posts']);
    
  }

  ngOnInit(): void {
    this.postId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.postId)
    this.postService.getPost(this.postId)
     .subscribe((data)=>{
     console.log(data);
      this.post = <Post>data;
   });
  }

}
