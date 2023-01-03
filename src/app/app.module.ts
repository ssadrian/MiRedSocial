import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UserListComponent} from "./user-list/user-list.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputNumberModule} from "primeng/inputnumber";
import {InputMaskModule} from "primeng/inputmask";
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DataViewModule} from "primeng/dataview";
import {DropdownModule} from "primeng/dropdown";
import {RatingModule} from "primeng/rating";
import {TooltipModule} from "primeng/tooltip";
import {OrderListModule} from "primeng/orderlist";
import {DragDropModule} from "primeng/dragdrop";
import {ToastModule} from "primeng/toast";
import {ConfirmationService, MessageService} from "primeng/api";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {BadgeModule} from "primeng/badge";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserRegisterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    PasswordModule,
    DividerModule,
    InputTextareaModule,
    ButtonModule,
    RippleModule,
    DataViewModule,
    DropdownModule,
    RatingModule,
    FormsModule,
    TooltipModule,
    DragDropModule,
    OrderListModule,
    DragDropModule,
    ToastModule,
    ConfirmPopupModule,
    BadgeModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
