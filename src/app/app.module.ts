import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RichEditorDirective } from './widgets/RichEditor/rich-editor.directive';

@NgModule({
  declarations: [
    AppComponent,
    RichEditorDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
