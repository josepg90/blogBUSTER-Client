import { ShowBoolean } from './pipe/showBoolean.pipe';
import { ShowDateTime } from './pipe/showDateTime.pipe';
import { TrimPipe } from './pipe/trim.pipe';
import { PaginationService } from './service/pagination.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SecretComponent } from './component/secret/secret.component';
import { LogoutComponent } from './component/logout/logout.component';
import { MenuComponent } from './component/menu/menu.component';
import { SessionService } from './service/session.service';
import { HttpClientModule } from "@angular/common/http";
import { SessionResolver } from './resolve/session.resolve';
import { PlistComponent } from './component/post/plist/plist.component';
import { PostService } from './service/post.service';
import { ViewComponent } from './component/view/view.component';
import { NewComponent } from './component/post/new/new.component';
import { UpdateComponent } from './component/post/update/update.component';
import { DeleteComponent } from './component/post/delete/delete.component';
import { ModalComponent } from './component/modal/modal.component';
import { DateTimeService } from './service/datetime.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SecretComponent,
    LogoutComponent,
    MenuComponent,
    PlistComponent,
    ViewComponent,
    TrimPipe,
    ShowDateTime,
    NewComponent,
    UpdateComponent,
    DeleteComponent,
    ShowBoolean,
    ModalComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    SessionService,
    SessionResolver,
    PostService,
    PaginationService,
    DateTimeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
