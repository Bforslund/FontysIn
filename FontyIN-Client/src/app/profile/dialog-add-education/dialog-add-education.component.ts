import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile/profile.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: 'app-dialog-add-education',
  templateUrl: './dialog-add-education.component.html',
  styleUrls: ['./dialog-add-education.component.css']
})
export class DialogAddEducationComponent implements OnInit {
 
  userId: number;
  profileId: number;
  educationToAdd = {};

  years = [
    {year : 2010},
    {year : 2011},
    {year : 2012},
    {year : 2013},
    {year : 2014},
    {year : 2015}
  ]

  constructor(private profileService: ProfileService,  
    public dialogRef: MatDialogRef<DialogAddEducationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { }

  CloseDialog(){
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userId = this.data.User.id;
    this.profileId = this.data.Profile;
  }

  onSubmitEducation(data)
  {
    
   this.educationToAdd = {
     "degreeEducation": data.degreeEducation,
     "descriptionEducation": data.descriptionEducation,
     "endYearEducation": parseInt(data.startYearEducation),
     "fieldStudy": data.fieldStudy,
     "profileId": this.profileId,
     "school": data.school,
     "startYearEducation": parseInt(data.endYearEducation)
     }
     this.profileService.addEducation(<JSON>this.educationToAdd, this.userId, this.profileId)
     this.CloseDialog()
  }

}
