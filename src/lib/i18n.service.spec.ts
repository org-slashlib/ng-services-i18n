/**
 *  © 2019, slashlib.org.
 */
import "./helper";

import { LOCALE_ID }                from '@angular/core';
import { TestBed }                  from "@angular/core/testing";
import { I18nService }              from "./i18n.service";
import { AbstractI18nConfigData }   from "./i18n.config";

import { SyncLoggingService }       from "@org.slashlib/ng-services-core";

const LOCALE_DE:  string = "de-DE";
const DE_OK:      string = "Ok";
const DE_CANCEL:  string = "Abbrechen";
const US_OK:      string = "ok";
const US_CANCEL:  string = "cancel";

describe( "i18n: I18nService", () => {
  let i18nservice: I18nService;
  let i18nDataFactory: () => any;
  /**
   *  mockup
   */
  beforeAll(() => {
    i18nDataFactory = function(): any {
      return {
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
    };

    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: LOCALE_DE },
                  { provide: AbstractI18nConfigData, useFactory: i18nDataFactory },
                  SyncLoggingService ]
    });
    i18nservice = new I18nService( TestBed.get( LOCALE_ID ),
                                   TestBed.get( SyncLoggingService ),
                                   TestBed.get( AbstractI18nConfigData ));
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
     *  Check factory exists.
     */
    it( "Check testing precondition: i18nDataFactory should exist", () => {
        // instance must not be undefined
        expect( i18nDataFactory ).toBeDefined();
        // instance must not be null.
        // be aware that undefined is not null.. see test above.
        expect( i18nDataFactory ).not.toBeNull();
    });

    /**
     *  Check if I18nConfig is available
     */
    it( "Check testing precondition: instance of I18nService should exist", () => {
        // instance must not be undefined
        expect( i18nservice ).toBeDefined();
        // instance must not be null.
        // be aware that undefined is not null.. see test above.
        expect( i18nservice ).not.toBeNull();
    });
  });

  describe( "testing on completeness", () => {
    it( "I18nService::transform - method should exist", () => {
        // instance method must not be undefined
        expect( i18nservice.transform ).toBeDefined();
        // instance method must not be null.
        // be aware that undefined is not null.. see test above.
        expect( i18nservice.transform ).not.toBeNull();
    });
  });

  describe( "functional testing", () => {
    it( "I18nService::locale", () => {
        expect( i18nservice.locale ).toEqual( LOCALE_DE );
    });

    it( "I18nService::transform - translate 'cancel' => de => 'cancel'", () => {
        expect( i18nservice.transform( "cancel" )).toEqual( "cancel" );
    });

    it( `I18nService::transform - translate 'CANCEL' => de => '${ DE_CANCEL }'`, () => {
        expect( i18nservice.transform( "CANCEL" )).toEqual( DE_CANCEL );
    });
  });
});
