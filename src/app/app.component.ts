import {Component, OnInit} from "@angular/core";
import {MessageService, PrimeNGConfig} from "primeng/api";
import {IUser} from "./models/user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  users: IUser[] = [];
  userForm?: IUser;

  showForm: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, private messageService: MessageService) {
    const json: string = `[
      {
        "id": 1,
        "name": "John",
        "surname": "Walker",
        "age": 26,
        "profilePicture": "https://picsum.photos/1920/1080",
        "description": "Lorem ipsum, dolor sit amet, sed diam nonumy eirmod tempor incididunt ut labore et dolore magna aliquyam erat volutpat.",
        "email": "john@walker",
        "password": "12345678"
      },
      {
        "id": 2,
        "name": "John",
        "surname": "Smith",
        "age": 27,
        "profilePicture": "https://picsum.photos/1920/1080",
        "description": "Lorem ipsum, dolor sit amet, sed diam nonumy eirmod tempor incididunt ut labore et dolore magna aliquyam erat volutpat.",
        "email": "john@smith",
        "password": "qwerty"
      }
    ]`;

    this.users = JSON.parse(json);
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  switchShowForm(): void {
    this.showForm = !this.showForm;
  }

  onFormSubmit(user: IUser): void {
    this.switchShowForm();

    let existingUser: IUser | undefined = this.users.find(x => x.id === user.id);
    if (!existingUser) {
      user.id = this.users.length + 1;
      this.addNewUser(user);
      return;
    }

    existingUser.id = user.id;
    existingUser.age = user.age;
    existingUser.surname = user.surname;
    existingUser.name = user.name;
    existingUser.email = user.email;
    existingUser.password = user.password;
    existingUser.description = user.description;
    existingUser.profilePicture = user.profilePicture;

    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: `Updated user ${ user.name } ${ user.surname }`,
    });
  }

  addNewUser(user: IUser): void {
    this.users.push(user);

    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: `Added new user ${ user.name } ${ user.surname }`,
    });
  }

  editUser(user: IUser): void {
    this.switchShowForm();
    this.userForm = user;

    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: `Edit user ${ user.name } ${ user.surname }`,
    });
  }
}
