import { UserService } from 'src/app/services/user.service';
import { DialogChangeDpComponent } from './dialog-change-dp/dialog-change-dp.component';
import { DialogAddSkillComponent } from './dialog-add-skill/dialog-add-skill.component';
import { UpdateProfileAboutComponent} from './update-profile-about/update-profile-about.component';
import { UpdateProfileEducationComponent} from './update-profile-education/update-profile-education.component';
import { UpdateProfileExperienceComponent} from './update-profile-experience/update-profile-experience.component';
import { UserDTO } from './../classes/Profile/UserDTO';
import { DialogAddProfileComponent } from './dialog-add-profile/dialog-add-profile.component';
import { Contact } from '../classes/Contact/Contact';
import { Profile } from './../classes/Profile/Profile';
import { ContactService } from '../services/contact/contact.service';
import { Experience } from './../classes/Profile/Experience';
import { Education } from './../classes/Profile/Education';
import { Component, OnInit , Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile/profile.service';
import { About } from '../classes/Profile/About';
import { Skill } from '../classes/Profile/Skill';
import {MatDialog} from '@angular/material/dialog';
import { User } from '../classes/Profile/User';
import { DialogAddExperienceComponent } from './dialog-add-experience/dialog-add-experience.component';
import { DialogAddEducationComponent } from './dialog-add-education/dialog-add-education.component';
import {  FormGroup } from '@angular/forms';
import { Data } from '../classes/Profile/Data';
import { DeleteSkillComponent } from './delete-skill/delete-skill.component';
import { DeleteEducationComponent } from './delete-education/delete-education.component';
import { DeleteExperienceComponent } from './delete-experience/delete-experience.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	// logged in user id in token
	loggedInUserId: number = this.userService.getUserIdOfLoggedIn();
	// the id of the user who owns the profile
	userId : number;
	currentUser: UserDTO;
	profileUser: UserDTO;
	
	// Connection between logged in user and owner of profile
	contact: Contact;


	profileId: number;
  
	allowedToSee = { class: 'text-danger', message: 'Sorry you cant see this!' }; 
	errorMsgEdu: boolean;
	errorMsgExp: boolean;
	errorMsgSki: boolean;
	
	uploadForm: FormGroup; 
	@Input() expToAdd={};
	selectedFile:File = null;
	profileUrl: any;
	data: Data;
	
  // console.log(dataToAdd);
  constructor(private profileService: ProfileService,
			  private contactService: ContactService,
			  private userService: UserService,
			   private route: ActivatedRoute,
			   public dialog: MatDialog) { }
			
  profileData: Profile[]; 
  educations: Object[];
  experiences: Experience[];
  skills : Object[];
  about: About[];
			 

  //profileData: Profile[];
  educationsList: Object[];
  experiencesList: Object[];
  skillsList : Object[];
  aboutList: Object[];
  foundUser: User;
  educationToAdd = {};
  experienceToAdd = {};
  skillToAdd = {};
  profileToAdd: {};
  profileWithLangauge: {};
  aboutToAdd: {};
  newProfileId : number;
  currentProfile:string = "";
 
  

  userFirstName:string;
  userLastName:string;
  userImage: string;
 
  //these are needed to get ids fior deleting data
  education: Education;
  skill: Skill;
  experience: Experience;
  profile: Profile; 
  sameUser: boolean;
  
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
  

onFileSelect(event) {
  if (event.target.files.length > 0) {
	const file = event.target.files[0];
	this.uploadForm.get('profile').setValue(file);

  }
}


openDialogDp(): void {
  const dialogRef = this.dialog.open(DialogChangeDpComponent, {
	width: '50%',
	data: {User: this.foundUser},
	panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']
	}) 
  dialogRef.afterClosed()
	.subscribe(res => {
	this.refreshProfile();  
  });
}

openDialogProfile(): void {
  const dialogRef = this.dialog.open(DialogAddProfileComponent, {
	width: '50%',
	data: {User: this.foundUser},
	panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']
	}) 
  dialogRef.afterClosed()
	.subscribe(res => {
	this.refreshProfile();  
  });
}

openDialogExperience(): void {
  const dialogRef = this.dialog.open(DialogAddExperienceComponent, {
	width: '50%',
	data: {User: this.foundUser, Profile: this.profileId},
	panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']

  }); 
  dialogRef.afterClosed()
	.subscribe(res => {
	this.refreshProfile();  
  });
}
openDialogEducation() : void{
  const dialogRef = this.dialog.open(DialogAddEducationComponent,{
	width: '50%',
	data: {User: this.foundUser,Profile: this.profileId},
	panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']

  }); 
  dialogRef.afterClosed()
	.subscribe(res => {
	this.refreshProfile();  
  });
}
openSkillDialog() : void{
  const dialogRef = this.dialog.open(DialogAddSkillComponent,{
	maxWidth: '50%',
	data: {User: this.foundUser,  Profile: this.profileId},
	panelClass: ['custom-modalbox','animate__animated','animate__slideInLeft']

  }); 
  dialogRef.afterClosed()
	.subscribe(res => {
	this.refreshProfile();  
  });
}

//   // get all skills 
//   getAllSkills() {
// 	this.profileService.getSkillsById(this.userId, this.profileId)
// 	.subscribe(
// 	  data => {
// 		this.skills = <Object[]>data;
// 		this.ngOnInit();
// 	  }
// 	)
//   }

  //open dialog for skills
  openDialogSkill(skill: Skill): void {
	console.log(skill);
	const dialogRef = this.dialog.open(DeleteSkillComponent, {
	  maxWidth: '50%',
	  data: {skill: skill}
	}); 
	dialogRef.afterClosed()
	  .subscribe(res => {

		this.refreshProfile();  
		this.ngOnInit();
	});

  }

  // get all Education
//   getAllEducation() {
// 	this.profileService.getEducationsById(this.userId, this.profileId)
// 	.subscribe(
// 	  data => {
// 		this.educations = <Education[]>data;
// 		this.ngOnInit();
// 	  }
// 	)
//   }

  //open dialog for education
  openDialogEdu(education: Education): void {
	console.log(education);
	const dialogRef = this.dialog.open(DeleteEducationComponent, {
	  maxWidth: '50%',
	  data: {education: education}
	}); 
	dialogRef.afterClosed()
	  .subscribe(res => {

		this.refreshProfile();  
	});

  }

//   // get all Experience
//   getAllExperience() {
// 	this.profileService.getExperienceById(this.userId, this.profileId)
// 	.subscribe(
// 	  data => {
// 		this.experiences = <Experience[]>data;
// 		this.ngOnInit();
// 	  }
// 	)
//   } 

  //open dialog for experience
  openDialogExp(experience: Experience): void {
	console.log(experience);
	const dialogRef = this.dialog.open(DeleteExperienceComponent, {
	  maxWidth: '50%',
	  data: {experience: experience}
	}); 
	dialogRef.afterClosed()
	  .subscribe(res => {

		this.refreshProfile();  
	});

  }

  GetAllAbout(){
	this.profileService.getAboutById(this.userId, this.profileId).subscribe((data)=>
	{
	  this.about=<About[]>data;
	  this.ngOnInit();
	 
	  this.ngOnInit();

	}); 
  }

  openDialogAbout(about: About): void {
  
	const dialogRef = this.dialog.open(UpdateProfileAboutComponent, {
	  maxWidth: '50%',
	  data: {about: about}
	}); 
	dialogRef.afterClosed()
	  .subscribe(res => {

		this.GetAllAbout();
	});

  }
  
  openDialogUpdateEdu(education: Education): void {

	const dialogRef = this.dialog.open(UpdateProfileEducationComponent, {
	  maxWidth: '50%',
	  data: {education: education}
	}); 
	dialogRef.afterClosed()
	  .subscribe(res => {

		this.refreshProfile(); 
	});

  }
  openDialogUpdateExp(experience: Experience): void {
	const dialogRef = this.dialog.open(UpdateProfileExperienceComponent, {
	  maxWidth: '50%',
	  data: {experience: experience}
	}); 
	dialogRef.afterClosed()
	  .subscribe(res => {

		this.refreshProfile();  
	});

  }
 
	   

  clickMethod(name: string) {
	if(confirm("Are you sure to delete "+name)) {
	
	}
  }

  CurrentProfile(idG){
   
	var self = this;
	this.profileData.forEach(function (value) {
   
	  if(value.id == idG){
		 self.currentProfile = value.language;
		// console.log(this.tempProfile)
	  }
	});

  }
  refreshProfile(){

	  this.profileService.getAboutById(this.userId, this.profileId).subscribe((data)=>
	{
	  
	  this.aboutList=<Object[]>data;
	
	}
	);
	this.profileService.getProfile(this.userId).
	subscribe(
	  data=> {
	  this.profileData=<Profile[]>data;

	});

	// get entire profile
	this.profileService.getData(this.userId, this.profileId).subscribe((respnse)=>
	{
	 
	  this.errorMsgExp = false;
	  this.data=<Data>respnse;
	  // this.profileData = this.data.profiles;
	  this.CurrentProfile(this.profileId);
	
	}

	);
  
    var BASE64_MARKER = ';base64,';

    function convertDataURIToBinary(dataURI) {
      var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      var base64 = dataURI.substring(base64Index);
      var raw = window.atob(base64);
      var rawLength = raw.length;
      var array = new Uint8Array(new ArrayBuffer(rawLength));
    
      for(let i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
   
	this.profileService.getUser(this.userId)
	.subscribe((data)=>
	{
	 
	  this.foundUser=<User>data;
	  this.userFirstName = this.foundUser.firstName;
	  this.userLastName = this.foundUser.lastName; 
	  this.profileUrl = this.foundUser.image;

	});
  
   
  }

  url: string;
	onSelectFile(event) { // called each time file input changes
		if (event.target.files && event.target.files[0]) {
		  var reader = new FileReader();

		  reader.readAsDataURL(event.target.files[0]); // read file as data url

		  reader.onload = (event: any) => { // called once readAsDataURL is completed
			this.url = <string>event.target.result;
		
		  }
		}
	}


  ngOnInit(): void {
	// Current open profile
	// user id in url
	this.userId = +this.route.snapshot.paramMap.get('id');
	// profile id in url
	this.profileId = +this.route.snapshot.paramMap.get('profileId');

	if(this.userId == this.loggedInUserId){
	  this.sameUser = true;
	}

	this.profileService.getUser(this.userId)
	  .subscribe((data)=> {        
		this.profileUser = <UserDTO>data;
	  });

	


	this.refreshProfile();


	// get logged in user
	this.getUserDTO(this.loggedInUserId)
		.subscribe((data)=> {
			this.currentUser = <UserDTO>data;
		});

	// get owner of profile
	this.getUserDTO(this.userId)
		.subscribe((data)=> {
			this.profileUser = <UserDTO>data;
		});

	// get connection between current user and profile user if there's one
	this.getContact(this.userId);

  }

  

	// get user
	getUserDTO(userId: number) {
		return this.profileService.getUser(userId)
	}
	

	//deleting skill data
	deleteSkill(){
	  this.profileService.deleteSkill(this.profile.userId, this.skill.profileId, this.skill.id).subscribe((data)=>
	  {
		this.skillsList = <Object[]>data;
	
	  });
	}
  
	//deleting experience data
	deleteEducation(){
	  this.profileService.deleteEducation(this.profile.userId, this.education.profileId, this.education.id).subscribe((data)=>
	  {
		this.educationsList = <Object[]>data;
	
	  });
	}
  
	//deleting experience data
	deleteExperience(experineceId){
	  this.profileService.deleteExperience(this.userId, this.profileId, experineceId).subscribe(data => {
	
	  });
	}



		  /*------------------------------------------------------ CONTACTS -------------------------------------------------------- */
	// get connection between current user and profile user if there's one
	getContact(userId: number) {
		this.contactService.getContact(userId)
			.subscribe((data) => {
				this.contact = <Contact>data;
			})
	}

  	createContact() {
		// get logged in user id from auth and friendId from url
		let contact : {} = { user: this.currentUser, friend: this.profileUser, isAccepted: false};
	
		this.contactService.create(contact)
		  	.subscribe( () => {
				this.getContact(this.userId);
		  	})
  	}


	// ACCEPT REQUEST
	acceptContact() {
		this.contact.isAccepted = true;
  
		this.contactService.update(this.contact)
			.subscribe( () => {
				this.getContact(this.userId);
		  	})
	}
}