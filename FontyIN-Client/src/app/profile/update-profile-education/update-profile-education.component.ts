import { Component, Inject, InjectionToken } from '@angular/core';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { Education } from '../../classes/Profile/Education';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-update-profile-education',
  templateUrl: './update-profile-education.component.html',
  styleUrls: ['./update-profile-education.component.css']
})
export class UpdateProfileEducationComponent {
  id: number;
  notification = null; 
  constructor( private service: ProfileService,  public dialogRef: MatDialogRef<UpdateProfileEducationComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  
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
  education = new Education(1,1,"", 1, 1, "", "", "");

  ngOnInit(): void {
    console.log(this.data.education.id);
    this.id = this.data.education.id;
    this.service.GetOneEducation(this.id)
    .subscribe((data)=>{
    this.education = <Education>data;
    });
  }
  updateEducation(){
    this.service.updateEducation(this.education, this.id).subscribe(
      (res: any) => {
      });
      this.dialogRef.close();
    }
}
