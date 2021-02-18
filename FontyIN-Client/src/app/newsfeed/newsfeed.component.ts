import { PostsService} from '../services/posts.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../classes/Profile/User';
import { ProfileService } from '../services/profile/profile.service';
import { FormControl, Validators } from '@angular/forms';
import { PostValidator} from './post.validator';
import { UserService} from '../services/user.service'
import { ToastrService } from 'ngx-toastr';

export interface Post {
  content: string;
  date: string;
  id: number;
  userId: number;
  image: string;
}

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  form = new FormGroup({
    postText: new FormControl('', [Validators.required, PostValidator.cannotContainSpace]),
    
    
   });

  constructor(private postService: PostsService, private profileService: ProfileService,private formBuilder: FormBuilder, private userService : UserService,private toastr: ToastrService) { }

  
  userID = this.userService.getUserIdOfLoggedIn();
  data = {};
  content : String;
  public user : User;
  allposts : Post[];
  
  
  createPost() {
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    
   

   if(this.uploadForm.get('profile').value.name != null){
    this.postService.uploadPicture(this.userService.getUserIdOfLoggedIn(), formData).subscribe((data)=>
    { 
        this.postUrl =<string> data;
     
    });
    this.data = {
      "content": this.content,
      "id": 5,
      "userId": this.userService.getUserIdOfLoggedIn(),
      "image": "assets/"+this.userService.getUserIdOfLoggedIn()+this.uploadForm.get('profile').value.name
      };
   } else {
    this.data = {
      "content": this.content,
      "id": 5,
      "userId": this.userService.getUserIdOfLoggedIn(),
      "image": ""
      };
   }
    this.postService.newPost(<JSON>this.data);

    window.location.reload();
  }



  deletePost(id){
    this.postService.deletePost(id);
    window.location.reload()
  }


  userId : number;
  postUrl : string;
  foundUser: User;
  uploadForm: FormGroup;


  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);

      
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.postUrl = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
    
  }
  
  lenImg(){
    if(this.postUrl?.length >0){
      return true;
    } else {
      return false;
    }
  }

  closeImg(){
    this.postUrl = "";
  }
  






  ngOnInit(): void {
  
    this.userId = this.userService.getUserIdOfLoggedIn();
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.postService.getNewsfeed(this.userService.getUserIdOfLoggedIn())
     .subscribe((data)=>{

      this.allposts = <Post[]> data;
      
   });
   

  }
  

}
