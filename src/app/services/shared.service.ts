import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class SharedService {
  private users = new BehaviorSubject([]);
  usersList = this.users.asObservable();
  constructor() {}

  setUsers(users: Array<any>) {
    this.users.next(users);
  }
}
