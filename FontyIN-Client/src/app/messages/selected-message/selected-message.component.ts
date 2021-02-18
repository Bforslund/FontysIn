import { MessageService } from './../../services/message/message.service';
import { Conversation } from './../../classes/Message/Conversation';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { WebsocketsService } from './../../services/websocket/websockets.service';
import { DeleteConversationComponent } from 'src/app/start-conversation/delete-conversation/delete-conversation.component';


@Component({
  selector: 'app-selected-message',
  templateUrl: './selected-message.component.html',
  styleUrls: ['./selected-message.component.css'],
})
export class SelectedMessageComponent implements OnInit, AfterViewChecked {
	conversation: Conversation;
	id: number;
	currentUser;
	friend;

    userId:number = this.userService.getUserIdOfLoggedIn();

	@ViewChild('scrollable') private scrollable: ElementRef;
    disableScrollDown = false;

	position = new FormControl('below');

	constructor(private messageService: MessageService,
        private userService: UserService,
		private router: Router,
		private route: ActivatedRoute,
		public dialog: MatDialog,
		private WebsocketsService: WebsocketsService) { 
			this.WebsocketsService.connect();
		}

  	ngOnInit(): void {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = +params['conversationId'];
	
					this.getConversation();
				}
		)	
	}
	
		//open dialog for deleting conversation
		openDialogDeleteConversation(conversation: Conversation){
			const dialogRef = this.dialog.open(DeleteConversationComponent, {
			maxWidth: '50%',
			data: {conversation: conversation}
			}); 
			dialogRef.afterClosed()
			.subscribe(res => {
				this.conversation = null;

				this.messageService.setInfo('Conversation is deleted');
				
				this.router.navigate(['/messages']);
			});
	
		}


    ngAfterViewChecked() {
        this.scrollToBottom();
    }

	// Format tooltip date as (Nov 19, 2020 2:42 AM)
	getTooltipDate(date) {
		date = moment(date).format('lll');
		return date;
	}

	// Convert date and time from UTC to local
	getLocalDate(date) {
		var gmtDateTime = moment.utc(date, "YYYY-MM-DD HH:mm")
		var local = gmtDateTime.local().format('YYYY-MMM-DD HH:mm');

		return local;
	}


	getConversation() {
		this.messageService.get(this.id)
			.subscribe((data) => {
				this.conversation = <Conversation>data;

                if(this.conversation.messages.length > 0) {
                    // Get users
    				this.currentUser = (this.conversation.messages[0].receiver.id == this.userId) ? this.conversation.messages[0].receiver : this.conversation.messages[0].sender;
    				this.friend = (this.conversation.messages[0].receiver.id == this.userId) ? this.conversation.messages[0].sender : this.conversation.messages[0].receiver;
                }
                else {
                    this.currentUser = (this.userId == this.conversation.firstUser.id) ? this.conversation.firstUser : this.conversation.secondUser;
                    this.friend = (this.userId == this.conversation.firstUser.id) ? this.conversation.secondUser : this.conversation.firstUser;
                }

			})
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


    private scrollToBottom(): void {
        if (this.disableScrollDown) {
            return
        }
        try {
            this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
        } catch(err) { }
    }


	// Send message
	submit(f) {
		
		let newMessage = {
			conversationId: this.conversation.id,
			sender: this.currentUser,
			receiver: this.friend,
			content: f.value.message
		}
		var msg = {
			"conversationId": this.conversation.id,
			"sender": this.currentUser?.id,
			"reciever": this.friend?.id,
			"content": f.value.message,
			"friendName":this.currentUser?.firstName
		}
		
		var myJSON = JSON.stringify(msg);
  
		this.WebsocketsService.sendMessage(myJSON);

		this.messageService.create(newMessage)
			.subscribe(() => {
				this.getConversation();

				f.reset();

                this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
			});
	}

}
