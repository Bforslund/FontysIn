import { Component, OnInit } from '@angular/core';
import { User } from '../classes/Profile/User';
import { privacy } from '../classes/Profile/Privacy';

import { ProfileService } from '../services/profile/profile.service';
class Setting {
 type: string;
}
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  privacySetting: Setting[] = [
    { type: 'EVERYONE'}, {type: 'CONNECTIONS'}, {type: 'ONLYME'}];

  constructor( private service: ProfileService) { }
  notificationP = null;
  isChecked = true;
  id:string;
  user = new User(3);
  privacy = new privacy(1, 1, "", "", "",false);

  ngOnInit(): void {
    this.id = localStorage.getItem('userId');
    this.service.GetOnePrivacy()
    .subscribe((data)=>{
    this.privacy = <privacy>data;
    if(this.privacy.hideFromSearch){
      this.isChecked = false;
    }else{
      this.isChecked = true;
    }
    });
 
  }

showNotificationP() {
  this.notificationP = { class: 'text-primary', message: 'updated!' };

}

updatePrivacy(){
  this.hideEverything();
  this.service.updatePrivacy(this.privacy).subscribe(
    (res: any) => {
      this.showNotificationP();
    });
}
hideEverything(){
  if(this.isChecked){
    this.privacy.hideFromSearch = false;
  }else{
    this.privacy.hideFromSearch = true;
  }
}

}
