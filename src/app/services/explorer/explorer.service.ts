import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Explorer } from 'src/app/models/explorer';
import { User } from 'src/app/models/user';
import { Quest, QuestData } from 'src/app/models/quest';
import { Comment, CommentData } from 'src/app/models/comment';
import { QuestService } from '../quest/quest.service';
import { ExplorerRequiringModeratorAction } from 'src/app/models/explorers-requiring-moderator-action';
import { AppState } from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {
  newExplorer: Explorer = {} as Explorer;

  constructor(private angularFirestore: AngularFirestore,
    private questService: QuestService,
    private store: Store<AppState>
  ) { }

  createExplorer(planetName: string, newUser: User) {
    this.newExplorer.name = newUser.name;
    this.newExplorer.surname = newUser.surname;
    this.newExplorer.xp = 0;
    this.newExplorer.userId = newUser.userId;
    this.addNewExplorerToPlanet(planetName);
  }

  addNewExplorerToPlanet(planetName: string) {
    this.angularFirestore.collection(planetName + '/explorers/entries').doc(this.newExplorer.userId).set(this.newExplorer);
  }

  createExplorerRequiringModeratorAction(planetExplorer: Explorer) {
    const newExplorerRequiringModeratorAction = {} as ExplorerRequiringModeratorAction;
    newExplorerRequiringModeratorAction.isModerating = false;
    newExplorerRequiringModeratorAction.name = planetExplorer.name;
    newExplorerRequiringModeratorAction.newComments = false;
    newExplorerRequiringModeratorAction.surname = planetExplorer.surname;
    newExplorerRequiringModeratorAction.userId = planetExplorer.userId;
    newExplorerRequiringModeratorAction.xp = planetExplorer.xp;
    return newExplorerRequiringModeratorAction;
  }

  createExplorersRequiringModeratorActionArray(planetExplorers: Explorer[], planetName: string) {
    const newExplorersRequiringModeratorActionArray = [];
    const newExplorersRequiringModeratorActionIds = [];

    planetExplorers.forEach(planetExplorer => {
      const newExplorerRequiringModeratorAction = this.createExplorerRequiringModeratorAction(planetExplorer);
      if (newExplorersRequiringModeratorActionIds.indexOf(newExplorerRequiringModeratorAction.userId) === -1) {
        newExplorersRequiringModeratorActionArray.push(newExplorerRequiringModeratorAction);
        newExplorersRequiringModeratorActionIds.push(newExplorerRequiringModeratorAction.userId);
      }
    });

    console.log('first', newExplorersRequiringModeratorActionArray);

    newExplorersRequiringModeratorActionArray.forEach(newExplorerRequiringModeratorAction => {
      this.angularFirestore
        .collection(planetName + '/explorers/entries/' + newExplorerRequiringModeratorAction.userId + '/quests/', ref => ref
          .where('status', '==', 'moderating'))
        .get()
        .subscribe(moderatingQuests => {
          if (moderatingQuests.size > 0) {
            newExplorerRequiringModeratorAction.isModerating = true;
          }

          // this.angularFirestore
          //   .collection
          // (planetName + '/explorers/entries/' + newExplorerRequiringModeratorAction.userId + '/quests/' + quest.questId + '/comments/')
          //   .get().subscribe(documents => {
          //     documents.forEach(document => {
          //       let comment = {} as Comment;
          //       comment = new Comment(document.data() as CommentData);
          //       if (comment.timestamp > quest.comment_last_view_date && newExplorerRequiringModeratorAction.newComments === false) {
          //         newExplorerRequiringModeratorAction.newComments = true;
          //       }
          //     });
          //   });
        });
    });

    console.log('last', newExplorersRequiringModeratorActionArray);

    this.store.dispatch(new actions.GetExplorersRequiringModeratorActionSuccess(newExplorersRequiringModeratorActionArray));
  }
}
