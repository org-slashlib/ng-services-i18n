/**
 *  © 2019, slashlib.org.
 */
import { Injectable }               from "@angular/core";
import { Pipe }                     from "@angular/core";
import { PipeTransform }            from "@angular/core";

import { I18nConfig }               from "./i18n.config";
import { I18nService }              from "./i18n.service";

/**
 *  i18n - dynamic translation
 *
 *  Usage:
 *    translate me | i18n
 *    translate me | i18n:i18nconfig
 */
@Injectable()
@Pipe({ name: "i18n", pure: true })
export class I18nPipe implements PipeTransform {
  /**
   *  Constructor
   */
  constructor( protected i18nsvc: I18nService ){ }
  /**
   *  Implementation of the PipeTransform interface's transform method.
   */
  transform( value: string, config: I18nConfig|null, ...args: any[]): string {
    if ( config ) {
         return config.transform( value, ...args );
    }
    else return this.i18nsvc.transform( value, ...args );
  }
}
