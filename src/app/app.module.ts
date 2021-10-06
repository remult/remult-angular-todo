import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Remult } from 'remult';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => AuthService.fromStorage()
      }
    }),
    FormsModule
  ],
  providers: [
    { provide: Remult, useClass: Remult, deps: [HttpClient] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
