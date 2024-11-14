import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSurveyModule } from '../../projects/ngx-surveys/src/lib';
//import { NgxSurveyModule } from '../../dist/ngx-surveys/lib/ngx-survey.module';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo/demo.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GithubLinkComponent } from './github-link/github-link.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';

@NgModule({
    declarations: [
        AppComponent,
        DemoComponent,
        FooterComponent,
        HeaderComponent,
        GithubLinkComponent,
    ],
    imports: [BrowserModule, BrowserAnimationsModule, NgxSurveyModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatTabsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
