/**
 *  © 2019, slashlib.org.
 */
import "./helper";

import { I18nConfig }             from "./i18n.config";
import { II18nConfigData }        from "./i18n.config";

const DE:         string = "de-DE";
const DE_OK:      string = "Ok";
const DE_CANCEL:  string = "Abbrechen";
const US_OK:      string = "ok";
const US_CANCEL:  string = "cancel";

describe( "i18n: I18nConfig", () => {
  let language:   string;
  let i18nconfig: I18nConfig;
  let i18ndata:   II18nConfigData;

  /**
   *  mockup
   */
  beforeAll(() => {
    language   = DE;
    i18ndata   = {
                   "languages": {
                     "de-DE": {
                       "OK": {
                         "message": DE_OK
                       },
                       "CANCEL": {
                         "message": DE_CANCEL
                       },
                       "TEST WITH FORMATTED CONTENT: '{0}'": {
                         "message": "Test mit formatiertem '{0}'"
                       }
                     },
                     "en-US": {
                       "OK": {
                         "message": US_OK
                       },
                       "CANCEL": {
                         "message": US_CANCEL
                       },
                       "OTHER TEST WITH FORMATTED CONTENT: '{0}'": {
                         "message": "Test mit formatiertem '{0}'"
                       }
                     }
                   }
                 };
    i18nconfig = new I18nConfig( i18ndata, language );
  });

  describe( "testing mockups", () => {
    /**
     *  Check if String.prototype.format exists.
     *  (see @types and ./helper)
     */
     it( "Check testing precondition: 'String.prototype.format' should exist", () => {
         // instance must not be undefined
         expect( String.prototype.format ).toBeDefined();
         // instance must not be null.
         // be aware that undefined is not null.. see test above.
         expect( String.prototype.format ).not.toBeNull();
     });
    /**
     *  Check if I18nConfig is available
     */
    it( "Check testing precondition: instance of I18nConfig should exist", () => {
        // instance must not be undefined
        expect( i18nconfig ).toBeDefined();
        // instance must not be null.
        // be aware that undefined is not null.. see test above.
        expect( i18nconfig ).not.toBeNull();
    });
  });

  describe( "testing on completeness", () => {
    /* it( "I18nConfig::language - property should exist", () => {
        // instance must have property
        // TODO
    });*/

    it( "I18nConfig::transform - method should exist", () => {
        // instance method must not be undefined
        expect( i18nconfig.transform ).toBeDefined();
        // instance method must not be null.
        // be aware that undefined is not null.. see test above.
        expect( i18nconfig.transform ).not.toBeNull();
    });
  });

  describe( "functional testing", () => {
    it( "I18nConfig - translate 'cancel' => de => null", () => {
        i18nconfig.language = DE;
        expect( i18nconfig.transform( "cancel" )).toBeNull();
    });

    it( `I18nConfig - translate 'CANCEL' => de => '${ DE_CANCEL }'`, () => {
        i18nconfig.language = DE;
        expect( i18nconfig.transform( "CANCEL" )).toEqual( DE_CANCEL );
    });

    it( "I18nConfig - translate something with formatted content => translation", () => {
        i18nconfig.language = DE;
        expect( i18nconfig.transform( "TEST WITH FORMATTED CONTENT: '{0}'", "Inhalt" )).toEqual( "Test mit formatiertem 'Inhalt'" );
    });

    it( "I18nConfig - translate otherthing with formatted content => null", () => {
        i18nconfig.language = DE;
        expect( i18nconfig.transform( "OTHER TEST WITH FORMATTED CONTENT: '{0}'", "Inhalt" )).toBeNull();
    });
  });
});
