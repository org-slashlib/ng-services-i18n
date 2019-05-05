/**
 *  © 2019, slashlib.org.
 */
import "./helper";

import { LOCALE_ID }                from '@angular/core';
import { TestBed }                  from "@angular/core/testing";
import { I18nService }              from "./i18n.service";

import { SyncLoggingService }       from "@org.slashlib/ng-services-core";

const LOCALE_DE: string = "de-DE";

describe( "i18n: I18nService", () => {
  let i18nservice: I18nService;

  /**
   *  mockup
   */
  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: LOCALE_DE }, SyncLoggingService ]
    });
    i18nservice = new I18nService( TestBed.get( LOCALE_ID ), TestBed.get( SyncLoggingService ));
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
  });
});
