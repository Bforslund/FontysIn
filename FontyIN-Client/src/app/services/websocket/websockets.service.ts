import { UserService } from './../user.service';
import { Injectable } from '@angular/core';

import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, tap, switchAll } from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';


import {BehaviorSubject} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const WS_ENDPOINT = 'ws://localhost:9090/ws/demo';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  constructor(private userService:UserService,
    private toastr: ToastrService) {}
  private socket$: WebSocketSubject<any>;
  private state$ = new BehaviorSubject<any>('');

  private static getNewWebSocket(): WebSocketSubject<any> {
    return webSocket(WS_ENDPOINT);
  }

  public connect(): void {
  var id:number = this.userService.getUserIdOfLoggedIn();
    
    console.log(id);
    if (!this.socket$ || this.socket$.closed) {

      this.socket$ = WebsocketsService.getNewWebSocket() as WebSocketSubject<any>;
      var s = "id"+id;
      this.sendMessage(s);
      this.socket$.subscribe(
        msg => this.populateMessage(msg),
        // Called whenever there is a message from the server
        err => {
          console.log('getting error');
          console.log(err);
        },
        // Called if WebSocket API signals some kind of error
        () => {
         
          this.socket$ = null;
        }
        // Called when connection is closed (for whatever reason)
      );
    }
  }

  private populateMessage(message: any): void{
    if (!this.socket$){
      return;
    }
   

    var obj = JSON. parse(message);
    
    // this.state$.next(message);

    // this.state$.next(message);
    let reciever: string = obj.friendName;
    let sender: string = obj.sender;
    
    let notification: string = obj.content;
   
    // id = message.substring(message.indexOf("/")+1,message.length);
    // if(parseInt(sender) == this.id) {
     
      this.toastr.success(reciever, notification);

    this.state$.next(notification);
    //} 
  }

  public getState(): Observable<string>{
    return this.state$.asObservable();
  }

  public sendMessage(msg: any): void {
    if (!this.socket$){
      return;
    }
  
    this.socket$.next(msg);
  }

  public close(): void {
    this.socket$.complete();
  }
}
