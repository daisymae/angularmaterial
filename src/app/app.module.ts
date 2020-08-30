import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DemoModule } from './demo/demo.module';
import { ContactmanagerModule } from './contactmanager/contactmanager.module';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  // './demo/demo.module#DemoModule' }, this is old way (5); not sure where it broke, but had to change for 9
  { path: 'contactmanager', loadChildren: () => ContactmanagerModule },
  { path: 'demo', loadChildren: () => DemoModule },
  { path: '**', redirectTo: 'contactmanager' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // the following gets rid of error in console about maticon needing httpclientmodule,
    // even though it was already in contactmanager.module.ts imports
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
