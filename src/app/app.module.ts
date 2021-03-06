import { FooterComponent } from './component/footer/footer.component';
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
import { LookComponent } from './component/look/look.component';
import { ReadComponent } from './component/read/read.component';
import { HighLightPipe } from './pipe/high-light.pipe';
import { ReadMoreComponent } from './component/read-more/read-more.component';
import { FormateoFechaPipe } from './pipe/formateo-fecha.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
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
    ModalComponent,
    LookComponent,
    ReadComponent,
    HighLightPipe,    
    ReadMoreComponent,
    FormateoFechaPipe,
    FooterComponent
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
