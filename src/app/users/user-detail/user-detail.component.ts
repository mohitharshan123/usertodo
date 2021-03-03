import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  userDetail = null;
  constructor(
  private sharedService: SharedService,
  private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.params.id;
    this.sharedService.usersList.subscribe(users => {
      this.userDetail = users.find(user => user.id == userId);
    });
  }
}
