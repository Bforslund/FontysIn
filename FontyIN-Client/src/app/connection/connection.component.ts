import { Contact } from '../classes/Contact/Contact';
import { DeleteConnectionComponent } from './delete-connection/delete-connection.component';
import { ContactService } from './../services/contact/contact.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../classes/Profile/User';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {
  searchText = '';

  userId:number = this.userService.getUserIdOfLoggedIn();
  contacts: Contact[];
  requests: Contact[];

  position = new FormControl('below');

  defaultElevation = 3;
  raisedElevation = 5;



  constructor(private contactService: ContactService,
              private userService: UserService,
              private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    // GET ACCEPTED CONTACTS
    this.getAcceptedContacts();

    // GET REQUESTS
    this.getRequests();
 
  }

  // GET CONTACTS
  getAcceptedContacts() {
    this.contactService.getAcceptedContacts()
    .subscribe(
      contacts => {
        this.contacts = <Contact[]>contacts;
      }
    )
  }


  // GET REQUESTS
  getRequests() {
      this.contactService.getContactRequests()
      .subscribe(requests => {
        this.requests = <Contact[]>requests;
      })
  }

  // ACCEPT REQUEST
  accept(contact: Contact) {
    contact.isAccepted = true;

    this.contactService.update(contact)
      .subscribe(
        () => {

          this.getRequests();
          this.getAcceptedContacts();
        }
      )
  }


  // REJECT REQUEST
  reject(contact: Contact) {

    this.contactService.delete(contact.id)
      .subscribe(
        updatedContact => {
          this.getRequests();
        }
      )
  }


  // DELETE DIALOG
  openDialog(connection: User): void {
    const dialogRef = this.dialog.open(DeleteConnectionComponent, {
      maxWidth: '50%',
      data: {connection: connection}
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        this.getAcceptedContacts();  
    });
  }


}