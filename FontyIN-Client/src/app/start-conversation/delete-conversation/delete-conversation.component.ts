import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-delete-conversation',
  templateUrl: './delete-conversation.component.html',
  styleUrls: ['./delete-conversation.component.css']
})
export class DeleteConversationComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    public dialogRef: MatDialogRef<DeleteConversationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  ngOnInit(): void {
  }

  loggedInUser = 1;

  // delete conversation
  deleteConversation(){

    this.messageService.deleteConversation(this.loggedInUser, this.data.conversation.id).subscribe();
    console.log(this.loggedInUser + " " + this.data.conversation.id + " " + "Deleted :)");

    // Close dialog
    this.dialogRef.close();

  }

  //close dialog 
  noClick(): void {
    this.dialogRef.close();
  }

}
