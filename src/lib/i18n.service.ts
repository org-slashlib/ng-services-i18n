/**
 *  © 2019, slashlib.org.
 */
import { Inject }                   from "@angular/core";
import { Injectable }               from "@angular/core";
import { InjectionToken }           from "@angular/core";
import { LOCALE_ID }                from "@angular/core";
import { Optional }                 from "@angular/core";
import { PipeTransform }            from "@angular/core";

import { SyncLoggingService }       from "@org.slashlib/ng-services-core";

import { I18nConfig }               from "./i18n.config";
import { AbstractI18nConfigData }   from "./i18n.config";

/**
 *  I18nService is a fallback for I18nPipe and I18nConfig transformations.
 *  In case a I18nPipe cannot locate a I18nConfig or even if  a I18nConfig
 *  was found, which could not find a translation, the translation finally
 *  will be requested from I18nService.
 */
@Injectable()
export class I18nService implements PipeTransform {
  private config :I18nConfig
  private _language: string;
  /**
   *  Constructor
   */
  constructor( @Inject( LOCALE_ID ) private _locale: string,
               protected synclogservice:  SyncLoggingService,
               @Optional() configdata: AbstractI18nConfigData ) {
    if ( configdata ) {
         this.config = new I18nConfig( configdata, this.language );
    }
  }
  /**
   *  Returns the locale as injected by angular.
   */
  get locale(): string { return this._locale; }
  /**
   *  @return browser language
   */
  get language(): string {
    if ( ! this._language ) {
         if ( window.navigator.language ) {
              this._language = window.navigator.language;
         }
         else this._language = window.navigator.userLanguage || "en-US";
    }
    return this._language;
  }
  /**
   *
   */
  transform( value: string, ...args: any[]): string {
    let transformation: string;
    try {
      if ( this.config ) {
           transformation = this.config.transform( value, ...args );
      }
      if ( ! transformation ) {
           transformation = value.format( ...args );
      }
    }
    catch( e ) { this.synclogservice.log.error( `I18nService::transform - error: ${ e }` ); }
    finally { return transformation; }
  }
}
