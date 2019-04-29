/**
 *  © 2019, encrypt-it.org.
 */
import { Inject }                   from "@angular/core";

export interface II18nConfigData {
  translations: any;
}

class I18nConfigData implements II18nConfigData {
  private _config:      II18nConfigData;
  private _language:    string;
  private _translation: any;
  /**
   *  Constructor
   *
   *  @param  {II18nConfigData|null} configuration values.
   *  @param  {string|null} language setting.
   */
  constructor( config: II18nConfigData | null, language: string ) {
    this._config   = config;
    this._language = language;
  }
  public get language(): string {
    return this._language;
  }
  /**
   *  Returns an object, which holds all available translations.
   *  Exampe:
   *  let translations = {
   *    "de-DE": { ... },
   *    "en-US": { ... }
   *  }
   */
  public get translations(): any {
    var translations: any;
    if ( ! this._config ) {
         translations = {};
    }
    else translations = this._config.translations;
    // console.log( `==> I18nConfigData::translations - translations '${JSON.stringify(translations)}'` );
    return translations;
  }
  /**
   *  Returns an object, which holds the translation matching
   *  the (this._language = browsers) settings. It must match
   *  mozillas messages.json for i18n translations.
   *  Example:
   *  let translation = {
   *    "translation key" : {
   *      "description" : "Optional description for the context used by key/message",
   *      "message"     : "Value returned for translation may use parameterslike {0} {1} ... {n}"
   *    }
   *  }
   */
  public get translation(): any {
    if ( ! this._translation ) {
         // this._translation must not be null
         this._translation = this.translations[ this._language ] || { };
         // console.log( `==> I18nConfigData::translation - translation '${JSON.stringify(this._translation)}'` );
    }
    return this._translation;
  }
}

export class I18nConfig {
  private _config: I18nConfigData;
  /**
   *  Constructor
   *
   *  @param  {II18nConfigData|null} configuration values.
   */
  constructor( config: II18nConfigData | null, language: string ) {
    this._config = new I18nConfigData( config, language );
  }
  public get config(): I18nConfigData { return this._config; }
  /**
   *  Implementation of the PipeTransform interface's transform method.
   */
  transform( value: string, ...args: any[]): string {
    // console.log( `==> I18nConfig::transform - value '${value}'` );
    let translation: any = this._config.translation[ value ];
    let message:  string = translation ? translation.message : null;
    // console.log( `==> I18nConfig::transform - message '${message}'` );
    return ( ! message ) ? value.format( ...args ) : message.format( ...args );
  }
}
