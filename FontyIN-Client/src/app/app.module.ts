import { MessageService } from './services/message/message.service';
import { AddInformationComponent } from './profile/add-information/add-information.component';
import { DataService } from './services/data.service';
import { ContactService } from './services/contact/contact.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { PostDetailsComponent } from './post-details/post-details.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatBadgeModule} from '@angular/material/badge';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';



import { HeaderComponent } from './header/header.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UpdateProfileEducationComponent } from './profile/update-profile-education/update-profile-education.component';
import { UpdateProfileExperienceComponent } from './profile/update-profile-experience/update-profile-experience.component';
import { UpdateProfileAboutComponent } from './profile/update-profile-about/update-profile-about.component';
import { ConnectionComponent } from './connection/connection.component';
import { DeleteConnectionComponent } from './connection/delete-connection/delete-connection.component';


import { FilterPipe } from './pipes/filter.pipe';
import { MaterialElevationDirective } from './directives/material-elevation.directive'; // -> imported filter pipe
import { A11yModule } from '@angular/cdk/a11y';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddProfileComponent } from './profile/dialog-add-profile/dialog-add-profile.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogAddExperienceComponent } from './profile/dialog-add-experience/dialog-add-experience.component';
import { DialogAddEducationComponent } from './profile/dialog-add-education/dialog-add-education.component';
import { DialogAddSkillComponent } from './profile/dialog-add-skill/dialog-add-skill.component';
import { SearchPipe } from './pipes/search.pipe';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { MessagesComponent } from './messages/messages.component';
import { SelectedMessageComponent } from './messages/selected-message/selected-message.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { LoginComponent } from './login/login.component';
import { DialogChangeDpComponent } from './profile/dialog-change-dp/dialog-change-dp.component';
import { RegistrationComponent } from './registration/registration.component';
import { CommentUsernameComponent } from './comment-username/comment-username.component';
import { StartConversationComponent } from './start-conversation/start-conversation.component';
import { UpdatePostDialogComponent } from './post/update-post-dialog/update-post-dialog.component';

import {CvBuilderComponent} from  './cv-builder/cv-builder.component';
import { ServerErrorInterceptor } from './errors/server-error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { UnexpectedErrorComponent } from './errors/unexpected-error/unexpected-error.component';
import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { OfflineComponent } from './errors/offline/offline.component';
import { InternalServerErrorComponent } from './errors/internal-server-error/internal-server-error.component';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { DeleteSkillComponent } from './profile/delete-skill/delete-skill.component';
import { DeleteEducationComponent } from './profile/delete-education/delete-education.component';
import { DeleteExperienceComponent } from './profile/delete-experience/delete-experience.component';
import { FilterUsersComponent } from './user/filter-users/filter-users.component';
import { DeleteConversationComponent } from './start-conversation/delete-conversation/delete-conversation.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    ProfileComponent,
    UpdatePostComponent,
    PostDetailsComponent,
    HeaderComponent,
    UserSettingsComponent,
    UpdateProfileEducationComponent,
    UpdateProfileExperienceComponent,
    UpdateProfileAboutComponent,
    ConnectionComponent,
    DeleteConnectionComponent,
    FilterPipe, // -> added filter pipe to use it inside the component
    MaterialElevationDirective,  // -> adds shadow
    DeleteSkillComponent,
    DeleteEducationComponent,
    DeleteExperienceComponent,
    FilterUsersComponent,
    ProfileComponent, 
    PostComponent,
    AddInformationComponent,
    DialogAddProfileComponent,
    DialogAddExperienceComponent,
    DialogAddEducationComponent,
    DialogAddSkillComponent,
    SearchPipe,
    NewsfeedComponent,
    MessagesComponent,
    SelectedMessageComponent,
    DateAgoPipe,
    LoginComponent,    
    DialogChangeDpComponent,
    RegistrationComponent,
    CommentUsernameComponent,
    DeleteConversationComponent,
    StartConversationComponent,
    UpdatePostDialogComponent,    
    CvBuilderComponent, NotFoundComponent, ForbiddenComponent, UnexpectedErrorComponent, BadRequestComponent, OfflineComponent, InternalServerErrorComponent,    
 
  ],
  entryComponents:[DialogAddProfileComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTabsModule,
    MatTooltipModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    A11yModule,
    ClipboardModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTreeModule,
    OverlayModule,
    PortalModule,
    ScrollingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgbModule,
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
  ],
  providers: [
    DataService,
    ContactService,
    FormsModule,
    MessageService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ServerErrorInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
