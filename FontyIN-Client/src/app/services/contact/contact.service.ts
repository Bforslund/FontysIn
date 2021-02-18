import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../data.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from '../user.service';

// const url = 'https://fontysin-backend.azurewebsites.net/users/';
const url = 'http://localhost:9090/users/';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends DataService {
	httpOptions = {
		headers: new HttpHeaders({'Content-Type': 'application/json'})
	}
  	readLocalStorageValue() {
		if(localStorage.getItem("userToken") != null){
		  this.httpOptions.headers = this.httpOptions.headers.set('Authorization', localStorage.getItem("userToken"));
		};
	}

    constructor(http: HttpClient, 
                private userService: UserService) {
        super(url + userService.getUserIdOfLoggedIn() + '/contacts', http);

        this.readLocalStorageValue();
    }

  	getId() {
		let id = this.userService.getUserIdOfLoggedIn();

		return id;
	}

  getContactRequests() {
	return this.http.get(url + this.getId() + '/requests', this.httpOptions)
	  .pipe(
		map(response => response)
	  )
  }

  	getAcceptedContacts() {
        return this.http.get(url + this.getId() + '/acceptedContacts', this.httpOptions)
		.pipe(
		  map(response => response)
		)
	}


    // Get contact between current user and profile user
    getContact(profileUserId: number) {
        return this.http.get(url + this.getId() + '/contacts/' + profileUserId, this.httpOptions)
		.pipe(
		  map(response => response)
		)
    }
}
