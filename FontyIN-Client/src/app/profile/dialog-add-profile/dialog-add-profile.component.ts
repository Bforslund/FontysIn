import { User } from './../../classes/Profile/User';
import { ProfileService } from './../../services/profile/profile.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-add-profile',
  templateUrl: './dialog-add-profile.component.html',
  styleUrls: ['./dialog-add-profile.component.css']
})
export class DialogAddProfileComponent implements OnInit {

  constructor(private profileService: ProfileService,  
              public dialogRef: MatDialogRef<DialogAddProfileComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _snackBar: MatSnackBar,
              private router: Router,
              private userService: UserService) { }
  profileToAdd: {};
  aboutToAdd : {};
  userId: number = this.userService.getUserIdOfLoggedIn();
  //User = new User(1, "adsf");
  languages = [
    {name: "English"},
    {name: "Swedish"},
    {name: "Spanish"},
    {name: "Urdu"},
    {name: "Arabic"},
    {name: "Russian"},
    {name: "Dutch"}

  ]

  CloseDialog(){
    this.dialogRef.close();
  }
  submit(pId){
    this.router.navigate(['users/',this.userId, 'profiles', pId]);
    this.CloseDialog();
  }

  ngOnInit(): void {
  }

  onSubmitProfile(data){
    this.profileToAdd = {
      "language": data.language,
      "userId": this.userId
    }
    this.profileService.addProfile(<JSON>this.profileToAdd, this.userId)
      .subscribe(
        newProfile => {
        
          this.aboutToAdd = {
            "content": data.about,
            "profileId": newProfile
            }
          
          this.profileService.addAbout(<JSON>this.aboutToAdd,  this.userId, newProfile).subscribe(data=>{

          this.submit(newProfile);
         
          })
          //  this.CloseDialog();
        }
        , 
        (error: Response) => {
          if(error.status === 409){
            this._snackBar.open('Given Language already exist Exists!', 'End now', {
              duration: 2000,
            });
            } 
             else if(error.status === 401)
            {
            } 
            else 
            {
              alert('error')
            }
        });
        
       
  }
}
