/**
 *  © 2019, slashlib.org.
 */
import { Injectable }               from "@angular/core";
import { PipeTransform }            from "@angular/core";

import { SyncLoggingService }       from "@org.slashlib/ng-services-core";


@Injectable()
export class I18nService implements PipeTransform {
  private _language: string;
  /**
   *  Constructor
   */
  constructor( protected synclogservice:  SyncLoggingService ) {}
  /**
   *  @return browser language
   */
  get language(): string {
    if ( ! this._language ) {
         if ( window.navigator.language ) {
              this._language = window.navigator.language;
         }
         else {
              // *facepalm* workarround for:
              // error TS7017: Element implicitly has an 'any' type because type 'Navigator' has no index signature.
              // this._language = window.navigator.userLanguage
              let element: any = window.navigator;
              this._language   = element ? element[ "userLanguage" ]: "en-US";
         }
    }
    return this._language;
  }
  /**
   *
   */
  transform( value: string, ...args: any[]): string {
    return value.format( ...args );
  }
}
