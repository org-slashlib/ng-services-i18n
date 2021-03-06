## angular translation (i18n) service ##

Provides dynamic translation for angular6/7 projects. Formats supported so far:
- mozilla: messages.json<br />
  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization

## building the library ##

* Browse https://github.com/org-slashlib/ng-project-template and download (no fork required!) a zip/tar of the the project template.
* Run <code> npm install </code> in the project template folder.
* Download or fork this project and link it into the templates subfolder.
* Run: <code> grunt </code>
* Change to build directory: <code> cd build </code>
* Call <code> ng build </code>
* Change to dist directory: <code> npm pack </code>
* <code> npm install path/to/@org.slashlib-ng-services-i18n-<version>.tgz</code>

This guide assumes, that you are familiar with the use of npm.  

Either<br />
download/build <code>org.slashlib-ng-services-i18n-&lt;version&gt;.tgz</code><br />
and install <code> npm install path/to/@org.slashlib-ng-services-i18n-&lt;version&gt;.tgz</code><br />
<br />
or<br/>
<code>npm install @org.slashlib/ng-services-i18n --save-dev</code>

## usage ##

Add the following lines to your app module:

```javascript
import { SyncLoggingService }         from "@org.slashlib/ng-services-core";
import { I18nModule }                 from "@org.slashlib/ng-services-i18n";
import { I18nService }                from "@org.slashlib/ng-services-i18n";

// optional "fallback" translations
import { AbstractI18nConfigData }     from "@org.slashlib/ng-services-i18n";
import LANGUAGES                      from "./app.messages.json";

let i18nDataFactory = function(): any {
  return { languages: LANGUAGES };
}

@NgModule({
  imports:      [ ... ],
  declarations: [
    I18nModule                // translationservice => declares I18nPipe
  ],
  providers:    [
    SyncLoggingService,       // service for synchronous logging
    { provide: AbstractI18nConfigData, useFactory: i18nDataFactory }, // optional
    I18nService               // translationservice
  ],
  bootstrap:    [ ... ]
})
export class AppModule { }
```

Preparing a component for i18n

```javascript
import { I18nConfig }                 from "@org.slashlib/ng-services-i18n";
import { I18nPipe }                   from "@org.slashlib/ng-services-i18n";
import { I18nService }                from "@org.slashlib/ng-services-i18n";

import LANGUAGES                      from "./component.messages.json";

@Component({
  selector:     "some-selector",
  templateUrl:  "./some.component.html"
})
export class SomeComponent {
  protected readonly i18nconfig: I18nConfig;
  constructor( private readonly i18nsvc I18nService, private readonly i18npipe I18nPipe ) {
    this.i18nconfig = new I18nConfig({ languages: LANGUAGES }, this.i18nsvc.preferred );
  }
  // just in case the component code contains strings, that need translation  
  public translate( message: string, ...args: any[] ): string {
    return this.i18npipe.transform( message , this.i18nconfig, ...args );
  }
  public foo(): void {
    // translation example with one parameter. results in: "translate me" => "übersetze mich"
    // will lookup TRANSLATIONS for key "translate {0}" and for key "me"
    let bar: string = this.translate( "translate {0}", this.translate( "me" ));
    // translation example without any parameters. results in: "translate me" => "übersetze mich"
    // will lookup TRANSLATIONS for key "translate me"
    let baz: string = this.translate( "translate me" );
  }
}

```

The components html might look like:

```html
<!-- pass over the components i18nconfig (translations) to the i18n pipe -->
<p>{ "some text" | i18n:i18nconfig }</p>
<!-- same using a parameter -->
<p>{ "some {0} text" | i18n:i18nconfig:"other" }</p>
<!-- TODO: plurals :-) -->
```

The app.messages.json<br />
<p>Note:<br />
   "en-US" is not required as requested keys like "some text" will be returned as translation, if they can't be found.
   Parameters that have been passed to the translation will properly replace the keys parameters {0}, {1}, ...
</p>

```json
{
  "de-DE": {
    "some text": {
      "message":  "Ein Text"
    },
    "some {0} text": {
      "message":  "Ein {0} Text"
    }
  },
  "en-US": {
    "some text": {
      "message":  "some text"
    },
    "some {0} text": {
      "message":  "some {0} text"
    }
  }
}

```
