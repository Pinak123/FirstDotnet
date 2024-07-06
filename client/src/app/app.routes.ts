import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersListsComponent } from './members/members-lists/members-lists.component';
import { MembersDetailsComponent } from './members/members-details/members-details.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './__gaurds/auth.guard';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {
        path: '',
        runGuardsAndResolvers:'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component:MembersListsComponent , canActivate: [authGuard]},
            {path: 'members/:id', component:MembersDetailsComponent},
            {path: 'lists', component:ListsComponent},
            {path: 'messages', component:MessagesComponent},
        ]
    },
    
    {path: '**', component:HomeComponent  , pathMatch: 'full'}
];
