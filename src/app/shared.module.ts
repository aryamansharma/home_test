import { NgModule } from '@angular/core';
import { TokenScreenComponent } from './token-screen/token-screen.component';
import { ContentComponent } from './content/content.component';
import { NetworkFeePopupComponent } from './network-fee-popup/network-fee-popup.component';
import { NetworkpopupComponent } from './networkpopup/networkpopup.component';

@NgModule({
  declarations: [
    TokenScreenComponent,
    ContentComponent,
    NetworkFeePopupComponent,
    NetworkpopupComponent,
  ],
  exports: [
    TokenScreenComponent,
    ContentComponent,
    NetworkFeePopupComponent,
    NetworkpopupComponent,
  ],
})
export class SharedModule {}
