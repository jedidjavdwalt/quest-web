import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { User, UserData } from 'src/app/models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users$: Observable<any>;
  userCollection: AngularFirestoreCollection<User>;

  constructor(private angularFirestore: AngularFirestore) {
    this.userCollection = angularFirestore.collection<User>("users");

    this.users$ = angularFirestore.collection("users").snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => new User(action.payload.doc.id, action.payload.doc.data() as UserData));
      })
    )
  }

  registerNewUser(newUser: User) {
    this.userCollection.add(newUser);
  }

}
