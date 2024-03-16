import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdateTaskModalComponent } from './update-task-modal/update-task-modal.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotyfToast } from './notyf.toast';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddtaskComponent,
    NavbarComponent,
    UpdateTaskModalComponent,
    NotyfToast,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    ToastrModule.forRoot({ 
      toastComponent: NotyfToast 
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
