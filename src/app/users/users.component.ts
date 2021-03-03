import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { MatTableDataSource } from "@angular/material/table";
import { SharedService } from "../services/shared.service";
import { Router, ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { UserAddComponent } from "./user-add/user-add.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ["id", "name", "email", "todo"];
  dataSource: MatTableDataSource<any> = null;

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    let usersExist = false;
    this.sharedService.usersList
      .pipe(
        switchMap((users) => {
          if (users.length === 0) {
            return this.userService.getUsers();
          } else {
            usersExist = true;
            return of(users);
          }
        })
      )
      .subscribe((users) => {
        if (!usersExist) {
          this.sharedService.setUsers(users);
        }
        this.dataSource = new MatTableDataSource(users);
      });
  }

  navigateToDetail(userId) {
    this.router.navigate([userId], { relativeTo: this.route });
  }

  goToTodoList(event, userId) {
    event.stopPropagation();
    this.router.navigate([userId, "todos"], { relativeTo: this.route });
  }

  openaddPopup() {
    const dialogRef = this.dialog.open(UserAddComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.sharedService.setUsers([...this.dataSource.data, res]);
      }
    });
  }
}
