import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-delete-experience',
  templateUrl: './delete-experience.component.html',
  styleUrls: ['./delete-experience.component.css']
})
export class DeleteExperienceComponent implements OnInit {

  loggedInUser: number = 5;

  constructor(
    private profileService: ProfileService,
    public dialogRef: MatDialogRef<DeleteExperienceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  ngOnInit(): void {
  }

  //close dialog 
  noClick(): void {
    this.dialogRef.close();
  }

  //delete experience
  deleteExperience() {
    this.profileService.deleteExperience(this.loggedInUser, this.data.experience.profileId, this.data.experience.id).subscribe();
    console.log(this.loggedInUser + " " + this.data.experience.profileId + " " + this.data.experience.id);

    // Close dialog
    this.dialogRef.close();
  }

}
