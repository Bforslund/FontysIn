import { ProfileService } from 'src/app/services/profile/profile.service';
import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogAddProfileComponent } from '../profile/dialog-add-profile/dialog-add-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../classes/Profile/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  departments: Object[];
  fontysLocations: Object[];

  jobType = [
    {name: "Teacher"},
    {name: "Student"},
    {name: "FontysStaff"}
  ]
  newAddressToAdd: {};
  newUser:{};
  foundUser: User;
  token:string;
  loggedIn:boolean;
  isLoginError : boolean = false;
  user = new User(3);
  
  constructor(private profileService: ProfileService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    private service: UserService) { }

    public inputValidator(event: any) {
      const pattern = /^[a-zA-Z]*$/;   
      //let inputChar = String.fromCharCode(event.charCode)
      if (!pattern.test(event.target.value)) {
        event.target.value = event.target.value.replace(/[^a-zA-Z]/g, "");
        // invalid character, prevent input
  
      }
    }

  onSubmitRegistration(data){
      this.newUser ={
        "departmentId": data.department,
        "email": data.email,
        "firstName": data.firstName,
        "img": "",
        "lastName": data.lastName,
        "locationId": data.fontysLocation,
        "password": data.password,
        "userNumber": data.userNumber,
        "userType": data.employementType
      }
      this.profileService.addNewUser(<JSON>this.newUser).subscribe(response=>{
        this._snackBar.open('Congratulations, You are now FontysIN user', 'End now', {
          duration: 2000,
        });
        
        this.foundUser = <User>response;

        this.login(data.email, data.password);

        
      },
      (error: Response) => {
        if(error.status === 409){
            this._snackBar.open('This user already exists', 'End now', {
              duration: 3000,
            });
          }
          else{
            this._snackBar.open('Wrong data provided', 'End now', {
              duration: 3000,
            });
          } 
      })
  }
  login(email, password){
    this.service.login(email, password)
    .subscribe(
      (res: any) => {
      
       localStorage.setItem('userToken', res);
     
       location.reload();
      this.router.navigate(['/posts']);
      window.location.href = '/posts';
      },
      (error: Response) => {
        if(error.status === 404){
          this.isLoginError = true;
         }
        }
  );
  }
    
  ngOnInit(): void {
    this.profileService.getFontysLocations().subscribe(response=>{
      this.fontysLocations = <Object[]>response;
    })

    this.profileService.getFontysDepartments().subscribe(response=>{
      this.departments = <Object[]>response;
    })
  }

}
