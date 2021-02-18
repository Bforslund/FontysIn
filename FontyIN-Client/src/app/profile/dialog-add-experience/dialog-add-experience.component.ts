import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { employmentType } from 'src/app/classes/Profile/EmploymentType';
import { Experience } from 'src/app/classes/Profile/Experience';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-dialog-add-experience',
  templateUrl: './dialog-add-experience.component.html',
  styleUrls: ['./dialog-add-experience.component.css']
})
export class DialogAddExperienceComponent implements OnInit {

  userId: number;
  profileId: number;
  experienceToAdd: {};

  years = [
    {year : 2010},
    {year : 2011},
    {year : 2012},
    {year : 2013},
    {year : 2014},
    {year : 2015}
  ]
  languages = [
    {name: "English"},
    {name: "French"},
    {name: "Spanish"},
    {name: "Urdu"}
  ]

  jobType = [
    {name: "FullTime"},
    {name: "PartTime"},
    {name: "FreeLancer"}
  ]

  constructor( private profileService: ProfileService,  
               public dialogRef: MatDialogRef<DialogAddExperienceComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }
 
  CloseDialog(){
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.userId = this.data.User.id;
    this.profileId = this.data.Profile;

  }
  onSubmitExperience(data){
   
    this.experienceToAdd = {
      "company": data.company,
      "descriptionExperience": data.descriptionExperience,
      "employmentType":data.employementType,
      "endDateExperience": parseInt(data.endDateExperience),
      // "id":453,
      "location": data.locationId,
      "profileId": this.profileId,
      "startDateExperience": parseInt(data.startDateExperience),
      "title": data.title
       }
       this.profileService.addExperience(<JSON>this.experienceToAdd, this.userId, this.profileId)
       this.CloseDialog();
       
  }
  
}
