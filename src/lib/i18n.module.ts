/**
 *  © 2019, slashlib.org.
 */
import { NgModule }                 from "@angular/core";

import "./helper";
import { I18nPipe }                 from "./i18n.pipe";


@NgModule({
  imports:      [ ],        // no other modules to be imported.
  declarations: [
                  I18nPipe
                ],
  exports:      [
                  I18nPipe
                ],
  providers:    [
                  I18nPipe  // enable using I18nPipe programatically in Components
                ]
})
export class I18nModule {}
