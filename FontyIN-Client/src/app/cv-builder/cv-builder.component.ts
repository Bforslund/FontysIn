import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { User } from '../classes/Profile/User';
import { ActivatedRoute } from '@angular/router';
import { Resume, Experience, Education, Skill } from '../classes/Profile/Resume';
import { ProfileService } from '../services/profile/profile.service';
import { UserService } from '../services/user.service';
export class Experience2{
  constructor( 
      public id: number,
      public  profileId: number,
      public  title: string,
      public  company:string,
      public  employmentType : string,
      public  location: string,
      public  startDateExperience: number,
      public  endDateExperience: number,
      public  descriptionExperience: string,
    ) {  }
}
export class Education2{
  constructor( 
      public id: number,
      public   profileId: number,
      public  school: string,
      public  startYearEducation: number,
      public  endYearEducation: number,
      public   degreeEducation: string,
      public   fieldStudy: string,
      public   descriptionEducation: string,
    ) {  }
}

export class Skill2{

  id: number;
  profileId: number;
  name: string;
  
}

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-cv-builder',
  templateUrl: './cv-builder.component.html',
  styleUrls: ['./cv-builder.component.css']
})
export class CvBuilderComponent implements OnInit {
  educations2: Education2[];
  experiences2: Experience2[];
  skills2 : Skill2[];
  useExisting:boolean;
  resume = new Resume();
  degrees = ['B.E.', 'M.E.', 'B.Com', 'M.Com'];
  user = new User(3);
  id:string;
  profileId:number;
  
useExist(){
  if(this.useExisting){
    
    this.resume.skills = [];
    
   this.skills2.forEach(ski => {
    
     var newSkill = new Skill();
     newSkill.value = ski.name;
   
     this.resume.skills.push(newSkill);
    
   });
   console.log(this.resume.skills);
 }else{
   console.log("false");
   console.log(this.resume.skills);
 }
}


  constructor(private service: UserService,private profileService: ProfileService,private route: ActivatedRoute,) {
    this.resume = JSON.parse(sessionStorage.getItem('resume')) || new Resume();
    if (!this.resume.experiences || this.resume.experiences.length === 0) {
      this.resume.experiences = [];
      this.resume.experiences.push(new Experience());
    }
    if (!this.resume.educations || this.resume.educations.length === 0) {
      this.resume.educations = [];
      this.resume.educations.push(new Education());
    }
    if (!this.resume.skills || this.resume.skills.length === 0) {
      this.resume.skills = [];
      this.resume.skills.push(new Skill());
    }
  }
  addExperience() {
    this.resume.experiences.push(new Experience());
  }
  addEducation() {
    this.resume.educations.push(new Education());
  }
  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }
  }
  resetForm() {
    this.resume = new Resume();
  }
  getDocumentDefinition() {
   console.log(this.user.firstName);
   console.log(this.user.email);
  this.useExist();

    sessionStorage.setItem('resume', JSON.stringify(this.resume));
    return {
      content: [
        {
          text: 'RESUME',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.user.firstName+' '+this.user.lastName, //this.user.name
              style: 'name'
            },
            {
              text: this.resume.address
            },
            {
              text: 'Email : ' + this.user.email, // this.user.email
            },
            {
              text: 'Phonenumber : ' + this.resume.contactNo,
            },
            {
              text: 'GitHub: ' + this.resume.socialProfile,
              link: this.resume.socialProfile,
              color: 'blue',
            }
            ],
            [
              this.getProfilePicObject()
            ]
          ]
        },
        {
          text: 'Skills',
          style: 'header'
        },
        {
          columns : [
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 0).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 1).map(s => s.value)
              ]
            },
            {
              ul : [
                ...this.resume.skills.filter((value, index) => index % 3 === 2).map(s => s.value)
              ]
            }
          ]
        },
        {
          text: 'Experience',
          style: 'header'
        },
        this.getExperienceObject(this.resume.experiences),
        {
          text: 'Education',
          style: 'header'
        },
        this.getEducationObject(this.resume.educations),
        {
          text: 'Other Details',
          style: 'header'
        },
        {
          text: this.resume.otherDetails
        },
        {
          text: 'Signature',
          style: 'sign'
        },
        {
          columns : [
              { qr: this.user.firstName+' '+this.user.lastName + ', Phone number : ' + this.resume.contactNo, fit : 100 },
              {
              text: `${this.user.firstName+' '+this.user.lastName}`,
              alignment: 'right',
              }
          ]
        }
      ],
      info: {
        title: this.user.firstName+' '+this.user.lastName + '_RESUME',
        author: this.user.firstName+' '+this.user.lastName,
        subject: 'RESUME',
        keywords: 'RESUME, ONLINE RESUME',
      },
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 20, 0, 10],
            decoration: 'underline'
          },
          name: {
            fontSize: 16,
            bold: true
          },
          jobTitle: {
            fontSize: 14,
            bold: true,
            italics: true
          },
          sign: {
            margin: [0, 50, 0, 10],
            alignment: 'right',
            italics: true
          },
          tableHeader: {
            bold: true,
          }
        }
    };
  }
  getExperienceObject(experiences: Experience[]) {
    if(this.useExisting){
      if(this.experiences2.length < 1){
        console.log("not enough");
        return null;
      }
      const exs = [];
      this.experiences2.forEach(experience => {
        exs.push(
          [{
            columns: [
              [{
                text: experience.title,
                style: 'jobTitle'
              },
              {
                text: experience.company,
              },
              {
                text: experience.location,
              }],
              {
                text: 'Start date: ' + experience.startDateExperience + ' End date ' + experience.endDateExperience,
                alignment: 'right'
              }
            ]
          }]
        );
      });
      return {
        table: {
          widths: ['*'],
          body: [
            ...exs
          ]
        }
      };
    }else{
      const exs = [];
      experiences.forEach(experience => {
        exs.push(
          [{
            columns: [
              [{
                text: experience.jobTitle,
                style: 'jobTitle'
              },
              {
                text: experience.employer,
              },
              {
                text: experience.jobDescription,
              }],
              {
                text: 'Experience : ' + experience.experience + ' Months',
                alignment: 'right'
              }
            ]
          }]
        );
      });
      return {
        table: {
          widths: ['*'],
          body: [
            ...exs
          ]
        }
      };
    }
   
   
  }
  getEducationObject(educations: Education[],) {
    if(this.useExisting){
      if(this.educations2.length < 1){
        console.log("not enough");
        return null;
      }
      return {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            [{
              text: 'Degree',
              style: 'tableHeader'
            },
            {
              text: 'College',
              style: 'tableHeader'
            },
            {
              text: 'Start year',
              style: 'tableHeader'
            },
            {
              text: 'End Year',
              style: 'tableHeader'
            },
            ],
            ...this.educations2.map(ed => {
              return [ed.degreeEducation, ed.school, ed.startYearEducation, ed.endYearEducation];
            })
          ]
        }
      };
    }else{
      return {
        table: {
          widths: ['*', '*', '*', '*'],
          body: [
            [{
              text: 'Degree',
              style: 'tableHeader'
            },
            {
              text: 'College',
              style: 'tableHeader'
            },
            {
              text: 'Passing Year',
              style: 'tableHeader'
            },
            {
              text: 'Result',
              style: 'tableHeader'
            },
            ],
            ...educations.map(ed => {
              return [ed.degree, ed.college, ed.passingYear, ed.percentage];
            })
          ]
        }
      };
    }
    
  }
  getProfilePicObject() {
    if (this.resume.profilePic) {
      return {
        image: this.resume.profilePic ,
        width: 75,
        alignment : 'right'
      };
    }
    return null;
  }
  fileChanged(e) {
    const file = e.target.files[0];
    this.getBase64(file);
  }
  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.resume.profilePic = reader.result as string;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
  addSkill() {
    this.resume.skills.push(new Skill());
  }
  ngOnInit(): void {
    this.id = this.service.getUserIdOfLoggedIn();
    
    this.profileId = +this.route.snapshot.paramMap.get('profileId');
    this.profileService.GetOneUser(this.id)
    .subscribe((data)=>{
      console.log(data);
    this.user = <User>data;
   
      this.profileService.getEducationsById(this.id, this.profileId)
      .subscribe(
        data => {
          this.educations2 = <Education2[]>data;
          
        }
      );
      this.profileService.getSkillsById(this.id, this.profileId)
    .subscribe(
      data => {
        this.skills2 = <Skill2[]>data;
        console.log(this.skills2);
      }
    );
    this.profileService.getExperienceById(this.id, this.profileId)
    .subscribe(
      data => {
        this.experiences2 = <Experience2[]>data;
        
      }
    )
    
  });
  }

}
