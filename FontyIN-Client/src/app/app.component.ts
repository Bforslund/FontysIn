import { Component } from '@angular/core';
import { WebsocketsService } from '../app/services/websocket/websockets.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private WebsocketsService: WebsocketsService) { 
  // this.WebsocketsService.connect();

  // WebsocketsService.getState().subscribe((msg) => {
  //   this.notifications.unshift({content: msg, senderId:});
  // });
 
}
  title = 'FontyIN-Client';

  readLocalStorageValue() {
    return localStorage.getItem('userToken');
}
userIsLogged(){
  if(this.readLocalStorageValue() != null){
   return true;
  }else{
   return false;
  }
}
 

}
