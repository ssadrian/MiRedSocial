import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {IUser} from "../models/user";

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  @Input() users: IUser[] = [];
  @Output() onUserClick: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() onNewUserClick: EventEmitter<void> = new EventEmitter<void>();

  totalUsers: number = 0;

  ngOnInit(): void {
    this.totalUsers = this.users.length;
  }

  modifyUser(user: IUser): void {
    this.onUserClick.emit(user);
  }

  addNewUser(): void {
    this.onNewUserClick.emit();
  }

  test(value: any) {
    console.log(value);
    console.log((value as HTMLInputElement).value);
  }
}
