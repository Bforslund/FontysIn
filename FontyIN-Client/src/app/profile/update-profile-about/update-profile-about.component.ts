import { Component, Inject, InjectionToken } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../../services/profile/profile.service';
import { About } from '../../classes/Profile/About';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-update-profile-about',
  templateUrl: './update-profile-about.component.html',
  styleUrls: ['./update-profile-about.component.css']
})
export class UpdateProfileAboutComponent {
  id: number;
  notification = null; 
  constructor(  private service: ProfileService, public dialogRef: MatDialogRef<UpdateProfileAboutComponent>,@Inject(MAT_DIALOG_DATA) public data: any) { }
  about = new About(1, 1, "");
  ngOnInit(): void {
console.log(this.data.about.id);
    this.id = this.data.about.id
    this.service.GetOneAbout(this.id)
    .subscribe((data)=>{
     this.about = <About>data;
    });

  }
  
  updateAbout(){
    this.service.updateAbout(this.about, this.id).subscribe(
      (res: any) => {
      });
      this.dialogRef.close();
}

}
