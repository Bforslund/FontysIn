import { WebsocketsService } from './../services/websocket/websockets.service';
import { Conversation } from './../classes/Message/Conversation';
import { MessageService } from './../services/message/message.service';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StartConversationComponent } from '../start-conversation/start-conversation.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	conversations: Conversation[];

	defaultElevation = 3;
	raisedElevation = 5;    
	position = new FormControl('below');

    @ViewChild('scrollable') private scrollable: ElementRef;
    disableScrollDown = false;

    // Selected conversation
    selectedConversation: Conversation;
    selectedIndex = -1;

    userId:number = this.userService.getUserIdOfLoggedIn();

	notifications: Array<Notification> = [];

	constructor(private messageService: MessageService,
        private userService: UserService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog,
		private WebsocketsService: WebsocketsService) {
			this.WebsocketsService.connect();
		 }
	
		ngOnInit(): void {

			this.messageService.getInfo().subscribe(val => {
				console.log("Get information: " + val);
				this.getMessages();
			})
			this.getMessages();
		}
	
		getMessages(){
			this.messageService.getAll()
			.subscribe((data) => {
				this.conversations = <Conversation[]>data;
	
				// Show first conversation
				if(this.conversations.length > 0) {
					this.router.navigate([this.conversations[0].id], {relativeTo: this.route});
				}
			})
		}


	public get width() {
	  return window.innerWidth;
	}

    // When a conversation is selected
    onSelected(conversation, index) {
        this.selectedConversation = conversation;
        this.selectedIndex = index;

        // Redirect and pass the cselected conversation object
        this.router.navigate([conversation.id], {relativeTo: this.route});
	}
	
	// Start new Conversation Dialog
	openDialogStartConversation(){

		const dialogRef = this.dialog.open(StartConversationComponent, {
			maxWidth: '50%',
			}); 
			dialogRef.afterClosed()
			.subscribe(res => {
				this.ngOnInit()
			});

	}


    // Scroll
    onScroll() {
        let element = this.scrollable.nativeElement;
        let atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
        if (this.disableScrollDown && atBottom) {
            this.disableScrollDown = false;
        } else {
            this.disableScrollDown = true;
        }
    }
}
