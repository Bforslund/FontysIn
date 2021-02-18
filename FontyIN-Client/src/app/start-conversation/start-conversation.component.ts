import { UserService } from 'src/app/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Conversation } from '../classes/Message/Conversation';
import { ConversationDTO } from '../classes/Message/ConversationDTO';
import { UserDTO } from '../classes/Profile/UserDTO';
import { FilterService } from '../services/filter/filter.service';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-start-conversation',
  templateUrl: './start-conversation.component.html',
  styleUrls: ['./start-conversation.component.css']
})
export class StartConversationComponent implements OnInit {

  searchText= "";
  users: UserDTO[]; 
  user: UserDTO;
  conversation: Conversation;
  conversationDTO: ConversationDTO; 

  
  constructor(
    private messageService: MessageService,
    private filterService: FilterService,
    public dialogRef: MatDialogRef<StartConversationComponent>,
    public userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

    userId:number = this.userService.getUserIdOfLoggedIn()

  ngOnInit(): void {
  }

  //get user by type letters of his/her name
  getUsersByFirstNameChars(){

    if (this.searchText != null){
      this.filterService.filterUsersByName(this.searchText).subscribe((data)=>
      {
       this.users=<UserDTO[]>data;
        console.log(this.users);     
      });
    }

  }

  //close dialog
  Close(){
    this.dialogRef.close();
  }

  // Send message
	startNewConversation(id: number) {

    let newConversation = {
      firstUserId: this.userId,
      secondUserId: id
    }

    this.messageService.startConversation(newConversation);
    console.log("Added" + newConversation);
      
    this.Close();
	}

}
