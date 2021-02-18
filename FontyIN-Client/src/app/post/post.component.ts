import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { PostsService} from '../services/posts.service';
import { Moment } from 'moment';
import { User } from '../classes/Profile/User';
import { ProfileService } from '../services/profile/profile.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { UpdatePostDialogComponent } from './update-post-dialog/update-post-dialog.component';
import { PostValidator} from './post.validator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'

export interface Post {
  content: string;
  date: string;
  id: number;
  userId: number;
  image: string;
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

  form = new FormGroup({
    postText: new FormControl('', [Validators.required, PostValidator.cannotContainSpace]),
    
    
   });

  @Input()  post : Post;
  checked: boolean;
  comments: Comment[];
  userId :number = this.userService.getUserIdOfLoggedIn();
  @Input() id ;
  constructor( private postService: PostsService, private profileService: ProfileService,private router: Router,public dialog: MatDialog,
    private _snackBar: MatSnackBar,  private userService : UserService) { }
  data = {};
  content : String;
  commentContent : String;
  commentData = {};
  likeData = {};
  time : Moment;
  user: User;
  likeCount = 0;
  userLikeOnPost : Like;
  wasClicked = true;
  clicked = false;

 

  getUserById(id){
    user: User;
    this.profileService.getUser(this.post.userId)
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
      "userId": this.userId
      };
    this.postService.newComment(<JSON>this.commentData);
    window.location.reload();
    
  }

  checkIds(){
    
    if( this.userId == this.post?.userId){
      this.checked = true;
    } else {
      this.checked = false;
    }
    
  }

  createPost() {
    this.data = {
      "content": this.content,
      "id": 5,
      "userId": this.userId
      };
    this.postService.newPost(<JSON>this.data);
    window.location.reload()
  }

  deletePost(id){
    this.postService.deletePost(id);
    window.location.reload()
  }

  likePost(){
    this.likeData = {
      "id":1,
      "likerId": this.userId,
      "postId": this.id
    }
    this.postService.newLikeOnPost(this.id,this.likeData);
    this.likeCount += 1;
    
  }

  openUpdateDialog(){
    const dialogRef = this.dialog.open(UpdatePostDialogComponent, {
      width: '50%',
      data: {p: this.post},
      panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']
  
    }); 
    dialogRef.afterClosed();
  }
  postUrl : string;
  lenImg(){
    if(this.postUrl?.length >0){
      return true;
    } else {
      return false;
    }
  }


  ngOnInit(): void {
    this.postService.getPostLikesCount(this.id)
    .subscribe((data)=>
    {
      
      this.likeCount=<number>data;

    });
    this.postService.getPostLikeByUser(this.id,this.userId)
     .subscribe((data)=>{
     
      this.userLikeOnPost = <Like>data;
   });
   this.checkIds();
   this.postService.getCommentsByPostId(this.id)
   .subscribe((data)=>{
    
    this.comments = <Comment[]>data;
    });
    this.profileService.getUser(this.post.userId)
    .subscribe((data)=>
    {
      
      this.user=<User>data;

    });
    this.postUrl = this.post.image;
  }

}
