import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { CallbackComponent } from './callback.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EntriesComponent } from './entries/entries.component';
import { AdminComponent } from './admin/admin.component';
import { EntryComponent } from './entry/entry.component';
import { EntryFinderService } from './entry-finder.service';
import {MatChipsModule} from '@angular/material/chips';
import { UploadComponent } from './upload/upload.component';
import { FileUploaderService } from './file-uploader.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EntriesComponent,
    AdminComponent,
    CallbackComponent,
    EntryComponent,
    UploadComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatChipsModule,
    HttpClientModule
  ],
  providers: [AuthService,
    HttpClientModule,
    EntryFinderService,
    FileUploaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
