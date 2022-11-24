import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ChartModule} from 'primeng/chart';
import { BarComponent } from './bar/bar.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { FortifyAnalyticsComponent } from './fortify-analytics/fortify-analytics.component';
import { RiskFactorComponent } from './risk-factor/risk-factor.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    DoughnutComponent,
    FortifyAnalyticsComponent,
    RiskFactorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
