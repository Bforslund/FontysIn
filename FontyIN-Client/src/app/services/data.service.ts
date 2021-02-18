import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  http: HttpClient;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  readLocalStorageValue() {
    if(localStorage.getItem("userToken") != null){
      this.httpOptions.headers = this.httpOptions.headers.set('Authorization',  localStorage.getItem("userToken"));
    };
}

  constructor(private url: string, 
              http: HttpClient) {
    this.http = http;
    this.readLocalStorageValue();
   }

  getAll() {
    return this.http.get(this.url, this.httpOptions)
      .pipe(
        // transform this response object to an array of js objects
        map(response => response)
      )
  }

  get(id: number) {
      return this.http.get(this.url + "/" + id, this.httpOptions)
        .pipe(
            map(response => response)
        )
    }


  create(resource: {}) {
      console.log(resource)
    return this.http.post(this.url, JSON.stringify(resource), this.httpOptions)
      .pipe(
        map(response => response)
      )
  }

  
  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify(resource), this.httpOptions)
      .pipe(
        map(response => response)
      )
  }


  delete(id) {
    return this.http.delete(this.url + '/' + id, this.httpOptions)
      .pipe(
        map(response => response)
      )
  }
}
