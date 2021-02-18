import { Component, Inject, InjectionToken } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { employmentType } from '../../classes/Profile/EmploymentType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Experience } from '../../classes/Profile/Experience';
@Component({
  selector: 'app-update-profile-experience',
  templateUrl: './update-profile-experience.component.html',
  styleUrls: ['./update-profile-experience.component.css']
})
export class UpdateProfileExperienceComponent  {
  typeOfEmployment: employmentType[] = [
    { type:  'FullTime'}, {type: 'PartTime'}, {type: 'FreeLancer'}];
    years = [
      {year : 2010},
      {year : 2011},
      {year : 2012},
      {year : 2013},
      {year : 2014},
      {year : 2015},
      {year : 2016},
      {year : 2017},
      {year : 2018},
      {year : 2019},
      {year : 2020},
      {year : 2021},
      {year : 2022},
      {year : 2023},
      {year : 2024},
      {year : 2025},
      
  
    ]
  id: number;
  notification = null; 
  constructor( private service: ProfileService,  public dialogRef: MatDialogRef<UpdateProfileExperienceComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  experience = new Experience(1, 1, "", "", "", "", 1999, 2000,  "" )
  ngOnInit(): void {
    this.id = this.data.experience.id;
    this.service.GetOneExperience(this.id)
    .subscribe((data)=>{
     this.experience = <Experience>data;
    });
  }

  updateExperience(){
    this.service.updateExperience(this.experience, this.id).subscribe(
      (res: any) => {
      });
      this.dialogRef.close();
  }

}
