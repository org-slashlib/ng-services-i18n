/**
 *  © 2019, slashlib.org.
 */
import { Inject }                   from "@angular/core";

import * as helper                  from "./helper";

/**
 *  let translations: ITranslations = {
 *    "translate me": { translation: "übersetze mich" }
 *  }
 */
export interface ITranslations {
  [ key: string ] : { translation?: string, [key: string]: string };
}

/**
 *  let languages: ILanguages = {
 *    "de-DE": ITranslations,
 *    "en-US": ITranslations
 *  }
 */
export interface ILanguages {
  [ language: string ] : ITranslations;
}

/**
 *  Interface required for translation handling.
 */
export interface II18nConfigData {
  // have a mapping of language identifiers to translations(ets)
  readonly languages: ILanguages;
  /**
   *  Lookup the translation registered with key for the given language.
   *  This will return the raw value. No formatting, no modifications.
   *  Returns null if no translation is registered or language is unknown.
   */
  translate?: ( key: string, language: string ) => string;
}

/**
 *  Internal class for handling translation files.
 *  Currently the following formats are supported:
 *
 *  - extended mozilla i18n.
 *    https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization
 *    extended means, message.json contains the _locales structure (all languages in one file)
 */
class I18nConfigData implements II18nConfigData {
  public static readonly DEFAULTLANGUAGE = "en-US";
  private _translations:  ITranslations;
  /**
   *  Constructor
   *
   *  @param config values.
   */
  constructor( private readonly config: II18nConfigData | null ) { }
  /**
   *  Returns an object, which holds all available translations.
   *  Exampe:
   *  let translations = {
   *    "de-DE": { ... },
   *    "en-US": { ... }
   *  }
   */
  public get languages(): ILanguages {
    if ( ! this.config ) {
         return {};
    }
    else return this.config.languages;
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
  public translations( language: string ): ITranslations {
    if ( ! this._translations ) {
         let lang = language ? language : I18nConfigData.DEFAULTLANGUAGE;
         // return empty map of translations instead of null
         this._translations = this.languages[ lang ] || { };
    }
    return this._translations;
  }
  /**
   *  Lookup the translation registered with key for the given language.
   *  This will return the raw value. No formatting, no modifications.
   *  Returns null if no translation is registered.
   */
  public translate( key: string, language: string ): string {
    if ( this.config.translate ) {
         return this.config.translate( key, language );
    }
    else {
         let translation: any = this.translations( language )[ key ];
         return translation ? translation.message : null;
    }
  }
}

export class I18nConfig {
  private readonly configdata: I18nConfigData;
  private _language: string;
  /**
   *  Constructor
   *
   *  @param config values.
   *  @param language setting.
   */
  constructor( config: II18nConfigData | null, language: string ) {
    this.configdata = new I18nConfigData( config );
    this._language  = language;
  }
  /**
   *  Get access to configured language
   */
  public get language(): string { return this._language; }
  /**
   *  Enable language switching.
   */
  public set language( language: string ) { this._language = language; }
  /**
   *  Implementation of the PipeTransform interface's transform method.
   */
  transform( value: string, ...args: any[]): string {
    if ( ! value ) { return ""; }
    let message: string = this.configdata.translate( value, this._language );
    return ( ! message ) ? null : message.format( ...args );
  }
}
