import { NgModule } from '@angular/core';
import { TokenScreenComponent } from './token-screen/token-screen.component';
import { NetworkFeePopupComponent } from './network-fee-popup/network-fee-popup.component';
import { NetworkpopupComponent } from './networkpopup/networkpopup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DropdowncomponentComponent } from './dropdowncomponent/dropdowncomponent.component';

@NgModule({
  declarations: [
    TokenScreenComponent,
    NetworkFeePopupComponent,
    NetworkpopupComponent,
    DropdowncomponentComponent,
  ],
  exports: [
    TokenScreenComponent,
    NetworkFeePopupComponent,
    NetworkpopupComponent,
    DropdowncomponentComponent,
  ],
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    CommonModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
