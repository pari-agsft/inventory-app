import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes,RouterModule } from '@angular/router';

import { ModalModule } from 'ngx-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RequestComponent } from './inventory/request/request.component';
import { ManageComponent } from './inventory/manage/manage.component';
import { ApproveComponent } from './inventory/approve/approve.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { InventoryService } from './inventory/inventory.service';


export const firebaseConfig = {
    apiKey: "AIzaSyCVODV6oS4diFZyVHE8CXx6zRhtByguogE",
    authDomain: "inventory-app-726af.firebaseapp.com",
    databaseURL: "https://inventory-app-726af.firebaseio.com",
    projectId: "inventory-app-726af",
    storageBucket: "inventory-app-726af.appspot.com",
    messagingSenderId: "596351154439"
  };

const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "manage", component: ManageComponent, canActivate: [AuthGuard] },
  { path: "request", component: RequestComponent, canActivate: [AuthGuard] },
  { path: "approve", component: ApproveComponent, canActivate: [AuthGuard] },
  { path: "signin", component: SigninComponent }, 
  { path: "signup", component: SignupComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RequestComponent,
    ManageComponent,
    ApproveComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    ModalModule.forRoot()
  ],
  providers: [AuthService,AngularFireAuth,AuthGuard,AngularFireDatabase,InventoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
