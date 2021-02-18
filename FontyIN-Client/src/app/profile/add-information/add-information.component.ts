import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.css']
})
export class AddInformationComponent implements OnInit {

  @Output() passedEvent = new EventEmitter();
  
 // parentPosts: any[]=[];
 experienceToAdd = {};

  constructor() { }


  ngOnInit(): void {
  }

  PassEvent(){
    this.passedEvent.emit();
   // console.log(this.passedEvent);

  }

  onSubmitExperience(data){
    // this.passedEvent = data;
    // this.passedEvent.emit();
    console.log(data);
    this.experienceToAdd = {
      "company": data.company,
      "descriptionExperience": data.descriptionExperience,
      "employmentType":data.employementType,
      "endDateExperience": data.endDateExperience,
      "id":43,
      "profileId":"",
      "locationId": data.locationId,
      "startDateExperience": data.startDateExperience,
      "title": data.title
       }
  }
  
}
