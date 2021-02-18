import { BadRequestComponent } from './errors/bad-request/bad-request.component';
import { DialogAddProfileComponent } from './profile/dialog-add-profile/dialog-add-profile.component';
import { SelectedMessageComponent } from './messages/selected-message/selected-message.component';
import { MessagesComponent } from './messages/messages.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConnectionComponent } from './connection/connection.component';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserComponent} from './user/user.component';

import {PostComponent} from './post/post.component';
import {UpdatePostComponent} from './update-post/update-post.component';
import {PostDetailsComponent} from './post-details/post-details.component'


import {UserSettingsComponent} from './user-settings/user-settings.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import {LoginComponent} from './login/login.component';
import { AuthGuard } from  './auth/auth.guard';
import {CvBuilderComponent} from './cv-builder/cv-builder.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { UnexpectedErrorComponent } from './errors/unexpected-error/unexpected-error.component';
import { OfflineComponent } from './errors/offline/offline.component';
import { InternalServerErrorComponent } from './errors/internal-server-error/internal-server-error.component';
import { FilterUsersComponent } from './user/filter-users/filter-users.component';
const routes: Routes = [
	{
	  path: '',
	  component: LoginComponent
	},
	{
	  path: 'export/:profileId',
	  component: CvBuilderComponent,
	  //canActivate: [ AuthGuard ]
	},
	{
	  path: 'users/:id/profiles/:profileId', 
	  component: ProfileComponent,
	  canActivate: [ AuthGuard ]
	},{
	  path: 'posts', 
	  component: NewsfeedComponent,
	  canActivate: [ AuthGuard ]
	},
	{
	  path: 'update-post/:id',
	  component: UpdatePostComponent,
	  canActivate: [ AuthGuard ]
	},
	{
	  path: 'post/:id',
	  component: PostDetailsComponent,
	  canActivate: [ AuthGuard ]
	},
	  {
		path: 'connections',
		component: ConnectionComponent,
		canActivate: [ AuthGuard ]
	  },
	{
	  path: 'settings',
	  component: UserSettingsComponent,
	  canActivate: [ AuthGuard ]
	},
	{
	  path: 'users/filter',
	  component: FilterUsersComponent,
	  canActivate: [ AuthGuard ]
	},
	{
	  path:'register', 
	  component: RegistrationComponent
	},
	{
	  path: 'messages',
	  component: MessagesComponent,
		children: [
			{
				path: ':conversationId',
				component: SelectedMessageComponent,
				canActivate: [ AuthGuard ]
			}
		],
		canActivate: [ AuthGuard ]
	},
	{
	  path: 'addProfile',
	  component: DialogAddProfileComponent,
	  canActivate: [ AuthGuard ]
	},
	{
		path: 'forbidden',
		component: ForbiddenComponent,
	},
	{
		path: 'unexpected-error',
		component: UnexpectedErrorComponent,
	},
	{
		path: 'bad-request',
		component: BadRequestComponent,
	},
	{
		path: 'offline',
		component: OfflineComponent
	},
	{
		path: 'internal-server-error',
		component: InternalServerErrorComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
