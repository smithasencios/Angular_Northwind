import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);

  private auth0Client: Auth0Client;

  // Auth0 application configuration
  config = {
    audience:'http://192.168.39.190:30101',
    domain: environment.Auth0Domain,
    client_id: environment.Auth0ClientId,
    responseType: 'token id_token',
    redirect_uri: `${window.location.origin}/callback`,
    scope: 'openid profile'
  };

  /**
   * Gets the Auth0Client instance.
   */
  async getAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      console.log('%cObtener informacion del usuario', "color: blue; font-size: x-large");
      
      this.auth0Client = await createAuth0Client(this.config);

      // Provide the current value of isAuthenticated
      this.isAuthenticated.next(await this.auth0Client.isAuthenticated());

      // Whenever isAuthenticated changes, provide the current value of `getUser`
      this.isAuthenticated.subscribe(async isAuthenticated => {
        if (isAuthenticated) {
          this.profile.next(await this.auth0Client.getUser());
          console.log(await this.auth0Client.getUser())
          return;
        }

        this.profile.next(null);
      });

    } else {
      console.log('%cObtener informacion del usuario--La Instancia ya existe', "color: blue; font-size: x-large");
    }

    return this.auth0Client;
  }
}
