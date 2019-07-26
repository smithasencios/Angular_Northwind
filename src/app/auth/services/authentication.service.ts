import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);

  private auth0Client: Auth0Client;

  // Auth0 application configuration
  config = {
    audience: environment.AuthAudience,
    domain: environment.Auth0Domain,
    client_id: environment.Auth0ClientId,
    responseType: 'token id_token',
    redirect_uri: `${window.location.origin}/callback`    
  };

  async getAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      //console.log('%cObtener informacion del usuario', "color: blue; font-size: x-large");

      this.auth0Client = await createAuth0Client(this.config);
      this.isAuthenticated.next(await this.auth0Client.isAuthenticated());

      this.isAuthenticated.subscribe(async isAuthenticated => {
        if (isAuthenticated) {
          this.profile.next(await this.auth0Client.getUser());
          return;
        }

        this.profile.next(null);
      });

    } 

    return this.auth0Client;
  }
}
