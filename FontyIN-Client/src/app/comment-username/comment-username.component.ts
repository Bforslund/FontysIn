import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService} from '../services/posts.service';
import { Moment } from 'moment';
import { User } from '../classes/Profile/User';
import { ProfileService } from '../services/profile/profile.service';


@Component({
  selector: 'app-comment-username',
  templateUrl: './comment-username.component.html',
  styleUrls: ['./comment-username.component.css']
})
export class CommentUsernameComponent implements OnInit {

  constructor(private postService: PostsService, private profileService: ProfileService) { }

  user : User;
  @Input() userId ;
  ngOnInit(): void {
    this.profileService.getUser(this.userId)
    .subscribe((data)=>
    {
     
      this.user=<User>data;

    });
  }

}
