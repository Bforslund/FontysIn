import { Profile } from './../classes/Profile/Profile';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/Profile/User';
import { UserDTO } from '../classes/Profile/UserDTO';
import { ProfileService } from '../services/profile/profile.service';
import { UserService } from '../services/user.service';
import { forEachChild } from 'typescript';
import { DialogAddProfileComponent } from '../profile/dialog-add-profile/dialog-add-profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchText='';

  userId: number = this.service.getUserIdOfLoggedIn();

  profileId : number;
  profiles : Profile[];
  constructor(private service: UserService,
      private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,) { }
    users: UserDTO[];
    
    
    submit(){
      this.router.navigate(['users/',this.userId, 'profiles', this.profileId])
    //   window.location.href = 'users/'+this.userId+'/profiles/'+this.profileId;
    }
    
    openDialogProfile(): void {
      const dialogRef = this.dialog.open(DialogAddProfileComponent, {
        width: '50%',
        data: {Id: this.userId},
        panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']
        }) 
      dialogRef.afterClosed()
        .subscribe(res => {
          location.reload(); 
      });
    }
    ngOnInit(): void {
     

    this.profileService.getProfile(this.userId).subscribe(response =>{
      this.profiles = <Profile[]>response;
      // this.userId = parseInt(localStorage.getItem("userId"));
      this.profileId = this.profiles[0]?.id;
    });
    this.profileService.getAllUsers().subscribe(data =>{
      this.users=<UserDTO[]>data;
     
    });
  }
  logout(){
   
    localStorage.clear();
    this.service.logout();
  }
  

}
