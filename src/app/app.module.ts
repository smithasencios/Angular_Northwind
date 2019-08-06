import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { metaReducers, reducers } from './state/reducers';
import { environment } from '../environments/environment';
import { AppEffects } from './state/effects/app.effects';
import { AuthHttpInterceptor } from './auth/interceptors/AuthHttpInterceptor';
import { CallbackComponent } from './auth/callback/callback.component';
import { AuthenticationService } from './auth/services/authentication.service';
import { AuthGuard } from './auth/guards/authguard.';
import { AuthorizationService } from './auth/services/authorization.service';
import { StorageEffects } from './state/effects/storage.effects';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects,StorageEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    AuthenticationService,
    AuthorizationService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
