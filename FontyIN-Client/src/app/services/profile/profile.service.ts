import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { Education } from 'src/app/classes/Profile/Education';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

// const url = 'https://fontysin-backend.azurewebsites.net/users/';
const url = 'http://localhost:9090/users/';

// const rootUrl = 'https://fontysin-backend.azurewebsites.net/';
const rootUrl = 'http://localhost:9090/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  readLocalStorageValue() {
    if(localStorage.getItem("userToken") != null){
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem("userToken"));
    };
}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, 
    private _snackBar: MatSnackBar) {this.readLocalStorageValue(); }

  public getAllUsers(){
    return this.httpClient.get(url , this.httpOptions)
  }
  public getProfile(userId){
    return this.httpClient.get(url + userId + '/profiles', this.httpOptions)
  }
  public getUser(userId){
    return this.httpClient.get(url + userId, this.httpOptions)
  }
  public getUserById(userId){
    console.log("GETTING USER BY ID")
    return this.httpClient.get(url + 'p/' + userId, this.httpOptions)
  }

  public getExperienceById(userId, profileId){  
    this.httpOptions.headers = this.httpOptions.headers.set('visitorId', '5');
    console.log(this.httpOptions.headers);
    return this.httpClient.get(url + userId + '/profiles/' + profileId + '/experiences', this.httpOptions)

  }

  public getEducationsById(userId, profileId){
    this.httpOptions.headers = this.httpOptions.headers.set('visitorId', '2');
    console.log(this.httpOptions.headers);
    return this.httpClient.get(url + userId + '/profiles/' + profileId + '/educations', this.httpOptions)
  }

  public getSkillsById(userId, profileId){ 
    this.httpOptions.headers = this.httpOptions.headers.set('visitorId', '2');
    console.log(this.httpOptions.headers);
    return this.httpClient.get(url + userId + '/profiles/' + profileId + '/skills', this.httpOptions)
  }
  public getAboutById(userId, profileId){
    return this.httpClient.get(url + userId + '/profiles/' + profileId + '/abouts', this.httpOptions)
  }
  public addAbout(data, userId, profileId){
    return this.httpClient.post(url + userId + '/profiles/' + profileId + '/abouts/new', data, this.httpOptions);
  }
  public addEducation(data, userId, profileId){
    return this.httpClient.post(url + userId + '/profiles/' + profileId + '/educations/new', data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    })
  }
  public addExperience(data, userId, profileId){
    return this.httpClient.post(url + userId + '/profiles/' + profileId + '/experiences/new', data, this.httpOptions).subscribe((data)=>
    {},
    (error: Response) => {
      
      if(error.status === 409){
        this._snackBar.open('Already Exist!!', 'End now', {
          duration: 1000,
        });
        } 
        else 
        {
          alert(error.status)
        }
    });
      
  }
  

  public addSkill(data, userId, profileId){
    return this.httpClient.post(url + userId + '/profiles/' + profileId + '/skills/new', data, this.httpOptions).subscribe((data)=>
    { 
      
    },
    (error: Response) => {
      if(error.status === 409){
        this._snackBar.open('Already Exist!!', 'End now', {
          duration: 1000,
        });
        } 
        else 
        {
          alert('error')
        }
    });
      
  }

  public addProfile(resource: {}, userId) {
    //console.log(this.url);
    return this.httpClient.post(url + userId + '/profiles/new', JSON.stringify(resource), this.httpOptions)
      .pipe(
        map(response => response)
      )
  }



    //delete data in profile page
    public deleteEducation(userId, profileId, educationId){
      return this.httpClient.delete(url + userId + '/profiles/' + profileId + '/educations/' + educationId, this.httpOptions);
    }
  
    public deleteExperience(userId, profileId, experienceId){
      return this.httpClient.delete(url + userId + '/profiles/' + profileId + '/experiences/' + experienceId, this.httpOptions);
    }
  
    public deleteSkill(userId, profileId, skillId){
      return this.httpClient.delete(url + userId + '/profiles/' + profileId + '/skills/' + skillId, this.httpOptions);
    }
    

    public GetOneEducation(id){
      return this.httpClient.get(url + 'profile/education/' + id, this.httpOptions);
    }

    public GetOneExperience(id){
      return this.httpClient.get(url + 'profile/experience/' + id, this.httpOptions);
    }
    public GetOneAbout(id){
      return this.httpClient.get(url + 'profile/about/' + id, this.httpOptions);
    }
  
    public GetOneUser(id){
      return this.httpClient.get(url + 'user/' + id, this.httpOptions);
    }

    updateEducation(model, id) {
      return this.httpClient.put(url + 'profile/education/' + id, model, this.httpOptions);
    }

  
    updateExperience(model, id) {
      return this.httpClient.put(url + 'profile/experience/' + id, model, this.httpOptions);
    }
    
  updateAbout(model, id) {
    return this.httpClient.put(url + 'profile/about/' + id, model, this.httpOptions);
  }

  public GetOnePrivacy(){
    return this.httpClient.get(url + 'privacy/me', this.httpOptions);
  }

  updatePrivacy(model) {
    return this.httpClient.put(url + 'privacy/' + model.id, model, this.httpOptions);
  }

  public uploadPicture(userId, data){
    return this.httpClient.put(rootUrl + 'upload/'+userId+'/uploadPicture', data, {responseType: 'text'})
  }

  public getFontysLocations(){
    return this.httpClient.get(url + 'fontysLocations');
  }

  public getFontysDepartments(){
    return this.httpClient.get(url + 'fontysDepartments');
  }

  public addNewUser(data){
    return this.httpClient.post(url + 'new', data);
  }
  // get entire profile
  public getData(userId, profileId){
    this.httpOptions.headers = this.httpOptions.headers.set('visitorId', '2');
    console.log(this.httpOptions.headers);
    return this.httpClient.get(url + userId + '/profiles/' + profileId + '/data', this.httpOptions)
  }

}
