import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';

// const url = 'https://fontysin-backend.azurewebsites.net/posts/';
const url = 'http://localhost:9090/posts/';

// const commentsUrl = 'https://fontysin-backend.azurewebsites.net/comments/';
const commentsUrl = 'http://localhost:9090/comments/'

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpClient: HttpClient) { this.readLocalStorageValue(); }
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
  public getPosts(){
   return this.httpClient.get(url + 1, this.httpOptions);
  }

  public getPostLikes(id){
    return this.httpClient.get(url +id+"/likes", this.httpOptions);
   } 

  public newLikeOnPost(id,data){
    return this.httpClient.post(url +id+"/likes", data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
  }
   public getPostLikeByUser(id,userid){
    return this.httpClient.get(url +id+"/likes/user/"+userid, this.httpOptions);
   }
  public getPostLikesCount(id){
    return this.httpClient.get(url +id+"/likes/count", this.httpOptions);
   }

  public getNewsfeed(id){
    return this.httpClient.get(url + 'newsfeed/'+id,this.httpOptions);
   }

  public getPost(id){
    return this.httpClient.get(url +id, this.httpOptions);
   }

  public newPost(data){
    return this.httpClient.post(url, data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
    
  }

  public updatePost(data,id){
    return this.httpClient.put(url +id, data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
    
  }

  public deletePost(id){
    return this.httpClient.delete(url +id, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
  }

  public getCommentsByPostId(id){
    return this.httpClient.get(commentsUrl+'post/' +id, this.httpOptions);
  }
  
  public uploadPicture(userId, data){
    return this.httpClient.put(url +userId+'/uploadPicture', data, {responseType: 'text'})
  }

  public newComment(data){
    return this.httpClient.post(commentsUrl, data, this.httpOptions).toPromise().then(data => {
      console.log(data);
    });
    
  }
  
}
