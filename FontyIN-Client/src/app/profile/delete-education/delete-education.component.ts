import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-delete-education',
  templateUrl: './delete-education.component.html',
  styleUrls: ['./delete-education.component.css']
})
export class DeleteEducationComponent implements OnInit {

  loggedInUser: number = 5;

  constructor(
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<DeleteEducationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  ngOnInit(): void {
  }

  //close dialog 
  noClick(): void {
    this.dialogRef.close();
  }

  //delete education
  deleteEducation() {
    this.profileService.deleteEducation(this.loggedInUser, this.data.education.profileId, this.data.education.id).subscribe();
    console.log(this.loggedInUser + " " + this.data.education.profileId + " " + this.data.education.id);

    // Close dialog
    this.dialogRef.close();
  }

}
