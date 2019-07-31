import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    
  }

  async ngOnInit() {    
    const client = await this.authenticationService.getAuth0Client();

    // Handle the redirect from Auth0
    const result = await client.handleRedirectCallback();
    
    // Get the URL the user was originally trying to reach
    const targetRoute =
      result.appState && result.appState.target ? result.appState.target : '';

    // Update observables
    this.authenticationService.isAuthenticated.next(await client.isAuthenticated());
    this.authenticationService.profile.next(await client.getUser())

    // Redirect away
    this.router.navigate([targetRoute]);
  }

}
