import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryComponent } from './entry/entry.component';

import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { CallbackComponent } from './callback.component';

const routes:  Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'entries',
    component: EntriesComponent
  },
  {
    path: 'entry/:id',
    component: EntryComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: 'callback',
    component: CallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule { }
