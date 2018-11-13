import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { PlanetService } from 'src/app/services/planet/planet.service';
import { ExplorerService } from 'src/app/services/explorer/explorer.service';
import { User } from 'firebase';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions/user.actions';
import * as selectors from '../../store/selectors/user.selector';
import { LoginDetails } from 'src/app/models/login-details';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = null;

  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService,
    private planetService: PlanetService,
    private explorerService: ExplorerService,
    private store: Store<AppState>) { }


  navigateRegister() {
    this.router.navigateByUrl("register");
  }

  signInClicked(email: string, password: string) {

    if (!email) {
      this.message = "No email entered";
    }
    else if (!password) {
      this.message = "No password entered";
    }
    else {
      this.store.dispatch(new actions.RequestLoginUserExist({username: email, password: password} as LoginDetails));
    }
  }

  userAuthenticated() {

    if (this.globalService.userExists == true) {
      this.authenticationService.signInExistingUser().subscribe(userState => {
        if (userState.signedInUser.name){
          this.getUserPlanet();
        }
      });
    }
    else {
      this.message = "Incorrect email or password entered"
    }
  }

  getUserPlanet() {

    this.planetService.getUserPlanet();

    this.getCurrentExplorer();
  }

  getCurrentExplorer() {

    this.explorerService.getCurrentExplorer();

    // this.navigateDashboard();
  }

  navigateDashboard() {
    this.router.navigateByUrl("dashboard");
  }

  sliceHasLoginFailed() {
    this.store.select(selectors.hasLoginFailed).subscribe(hasFailed => {
      if(hasFailed)
        // alert("FAILED");
        this.message = "Incorrect email or password entered";
    });
  }

  sliceHasLoginSucceeded() {
    this.store.select(selectors.hasLoginSucceeded).subscribe(signedIn => {
      if(signedIn) {
        this.navigateDashboard();
      }
    })
  }

  ngOnInit() {
    this.sliceHasLoginFailed();
    this.sliceHasLoginSucceeded();
   }

}
