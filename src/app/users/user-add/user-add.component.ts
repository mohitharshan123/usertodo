import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.css"],
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserAddComponent>,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      id: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
      website: new FormControl("", [Validators.required]),
      company: new FormControl("", [Validators.required]),
    });
  }
  onSubmit() {
    const user = this.userForm.value;
    this.userService.addUser(user).subscribe(
      (res) => {
        this.dialogRef.close(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
