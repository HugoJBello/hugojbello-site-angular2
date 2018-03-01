
import { CallbackComponent } from './callback.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { EntriesComponent } from './entries/entries.component';
import { AdminComponent } from './admin/admin.component';
import { EntryComponent } from './entry/entry.component';
import { CategoryComponent } from './category/category.component';
import { CategoriesComponent } from './categories/categories.component';
import { FilesComponent } from './files/files.component';
import { AboutComponent } from './about/about.component';
import { UploadComponent } from './upload/upload.component';
import { EditorComponent } from './editor/editor.component';

import { EntryFinderService } from './entry-finder.service';
import { UtilsDateService } from './utils-date.service';
import { CategoriesService } from './categories.service';
import { ColorUtilsService } from './color-utils.service';
import { FileUploaderService } from './file-uploader.service';
import { AuthService } from './auth/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatChipsModule } from '@angular/material/chips';
import { EntryEditorService } from './entry-editor.service';
import { SimplemdeModule, SIMPLEMDE_CONFIG } from 'ng2-simplemde'
import { MatIconModule } from "@angular/material/icon"; 
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgxPaginationModule} from 'ngx-pagination';
import { MarkdownModule } from 'angular2-markdown';
import { MatDialogModule } from '@angular/material';
import { CONFIG } from './config/config';
import { TagChipComponent } from './tag-chip/tag-chip.component';
import { DialogUploadComponent } from './dialog-upload/dialog-upload.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DialogFileSelectorComponent } from './dialog-file-selector/dialog-file-selector.component';

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
    EditorComponent,
    CategoryComponent,
    CategoriesComponent,
    FilesComponent,
    AboutComponent,
    TagChipComponent,
    DialogUploadComponent,
    DialogFileSelectorComponent
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
    NgxPaginationModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MarkdownModule.forRoot(),
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
    EntryEditorService,
    UtilsDateService,
    CategoriesService,
    ColorUtilsService,
    { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogUploadComponent,
    DialogFileSelectorComponent
  ]
})
export class AppModule { }
