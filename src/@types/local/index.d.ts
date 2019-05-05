/**
 *  © 2019, slashlib.org.
 */
interface String {
  format( ...replacements: string[] ):string;
}

// @see https://zzz.buzz/2016/01/13/detect-browser-language-in-javascript/
interface Navigator {
  browserLanguage?: string;
  // language:      string;                 // => interface NavigatorLanguage
  // languages:     ReadonlyArray<string>;  // => interface NavigatorLanguage
  systemLanguage?:  string;
  userLanguage?:    string;
}
