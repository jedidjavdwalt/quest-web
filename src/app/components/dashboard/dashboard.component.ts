import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as actions from '../../store/actions';
import { User } from 'src/app/models/user';
import * as selectors from '../../store/selectors';
import { Planet } from 'src/app/models/planet';
import { Explorer } from 'src/app/models/explorer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  signedInUser: User = {} as User;
  currentPlanet: Planet = {} as Planet;
  currentExplorer: Explorer = {} as Explorer;


  constructor(private store: Store<AppState>) {
    
  }

  logOutClicked() {
    this.store.dispatch(new actions.LogOutUser);
  }

  sliceSignedInUser() {
    this.store.select(selectors.signedInUser).subscribe(signedInUser => {
      if(signedInUser) {
        this.signedInUser = signedInUser;
        this.store.dispatch(new actions.RequestGetDefaultPlanet(this.signedInUser.userId));
      }
    })
  }

  sliceCurrentPlanet() {
    this.store.select(selectors.currentPlanet).subscribe(currentPlanet => {
      if(currentPlanet) {               
        this.currentPlanet = currentPlanet;
        this.store.dispatch(new actions.RequestGetExplorer(this.currentPlanet.name, this.signedInUser.userId));
      }
    })
  }

  sliceCurrentExplorer() {
    this.store.select(selectors.currentExplorer).subscribe(currentExplorer => {
      if(currentExplorer) {
        this.currentExplorer = currentExplorer;        
      }
    })
  }

  ngOnInit() {
    this.sliceSignedInUser();
    this.sliceCurrentPlanet();
    this.sliceCurrentExplorer();
  }
}
