import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {IUser} from "../models/user";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: "user-register",
  templateUrl: "./user-register.component.html",
  styleUrls: ["./user-register.component.scss"],
})
export class UserRegisterComponent implements OnInit {
  @Input() user?: IUser;

  @Output() onSubmit: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() onExit: EventEmitter<void> = new EventEmitter<void>();

  readonly minAge: number = 14;
  readonly maxAge: number = 110;

  registerFormGroup = this.fb.group({
    name: ["", Validators.required],
    surname: ["", Validators.required],
    age: [this.minAge, [Validators.min(this.minAge), Validators.max(this.maxAge)]],
    profilePicture: ["", [Validators.required, this.#urlValidator]],
    description: ["", [Validators.required, Validators.pattern(/\b\w{3,}\b/i)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
    passwordConfirmation: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (this.user === undefined) {
      return;
    }

    this.registerFormGroup.setValue({
      age: this.user.age,
      name: this.user.name,
      email: this.user.email,
      surname: this.user.surname,
      password: this.user.password,
      passwordConfirmation: "",
      description: this.user.description,
      profilePicture: this.user.profilePicture,
    });
  }

  #urlValidator(control: AbstractControl): null | { invalidUrl: boolean } {
    let validUrl: boolean = true;

    try {
      new URL(control.value);
    } catch {
      validUrl = false;
    }

    return validUrl ? null : { invalidUrl: true };
  };

  submitForm(): void {
    const formUser = this.registerFormGroup.value;

    if (!this.registerFormGroup.valid) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "The form is not valid. Make sure all fields are completed properly.",
      });
      return;
    }

    if (formUser.password !== formUser.passwordConfirmation) {
      this.messageService.add({
        severity: "error",
        summary: "Error",
        detail: "The password and password confirmation fields must match.",
      });
      return;
    }

    const user: IUser = {
      id: this.user?.id ?? 0,
      age: formUser.age!,
      name: formUser.name!,
      email: formUser.email!,
      surname: formUser.surname!,
      password: formUser.password!,
      description: formUser.description!,
      profilePicture: formUser.profilePicture!,
    };

    this.onSubmit.emit(user);
  }

  resetForm(): void {
    this.registerFormGroup.setValue({
      age: this.user?.age!,
      name: this.user?.name!,
      email: this.user?.email!,
      passwordConfirmation: "",
      surname: this.user?.surname!,
      password: this.user?.password!,
      description: this.user?.description!,
      profilePicture: this.user?.profilePicture!,
    });
    this.registerFormGroup.markAsPristine({ onlySelf: true });

    this.messageService.add({
      severity: "info",
      summary: "Info",
      detail: "Form reset",
    });
  }

  exitForm(event: Event): void {
    if (!this.registerFormGroup.dirty) {
      this.onExit.emit();
    }

    this.confirmationService.confirm({
      target: event.target ?? undefined,
      message: "Are you sure that you want to proceed? All changes will be lost!",
      icon: "pi pi-exclamation-triangle",
      accept: (): void => {
        this.onExit.emit();
      },
    });
  }
}
