import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { DialogAddEducationComponent } from '../dialog-add-education/dialog-add-education.component';

@Component({
  selector: 'app-dialog-add-skill',
  templateUrl: './dialog-add-skill.component.html',
  styleUrls: ['./dialog-add-skill.component.css']
})
export class DialogAddSkillComponent implements OnInit {

  userId: number;
  profileId: number;
  skillToAdd: {};

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
    onSubmitSkill(data)
    {
      
     this.skillToAdd = {
          "id": 17,
          "name": data.skill,
          "profileId": this.profileId
      }
       this.profileService.addSkill(<JSON>this.skillToAdd, this.userId, this.profileId)
       this.CloseDialog();
    }

}
