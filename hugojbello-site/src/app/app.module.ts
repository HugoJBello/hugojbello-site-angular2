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
import { EditorComponent } from './editor/editor.component';
import { EntryEditorService } from './entry-editor.service';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde'
import { MatIconModule } from "@angular/material/icon"; 
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    EntriesComponent,
    AdminComponent,
    CallbackComponent,
    EntryComponent,
    UploadComponent,
    EditorComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatChipsModule,
    HttpClientModule,
    FormsModule,
    AngularFontAwesomeModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    SimplemdeModule.forRoot({
      provide: SIMPLEMDE_CONFIG,
      useValue: {
        placeholder: 'placeholder'
      }
    })
  ],
  providers: [AuthService,
    HttpClientModule,
    EntryFinderService,
    FileUploaderService,
    EntryEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
