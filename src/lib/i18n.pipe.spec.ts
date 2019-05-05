/**
 *  © 2019, slashlib.org.
 */
import "./helper";

import { LOCALE_ID }                from '@angular/core';
import { TestBed }                  from "@angular/core/testing";

import { I18nConfig }               from "./i18n.config";
import { I18nPipe }                 from "./i18n.pipe";
import { I18nService }              from "./i18n.service";

import { SyncLoggingService }       from "@org.slashlib/ng-services-core";

const LOCALE_DE: string = "de-DE";

describe( "i18n: I18nPipe", () => {
  let i18nservice: I18nService;
  let i18npipe:    I18nPipe;

  /**
   *  mockup
   */
  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: LOCALE_ID, useValue: LOCALE_DE }, SyncLoggingService ]
    });
    i18nservice = new I18nService( TestBed.get( LOCALE_ID ), TestBed.get( SyncLoggingService ));
    i18npipe    = new I18nPipe( i18nservice );
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
    it( "Check testing precondition: instance of I18nPipe should exist", () => {
        // instance must not be undefined
        expect( i18npipe ).toBeDefined();
        // instance must not be null.
        // be aware that undefined is not null.. see test above.
        expect( i18npipe ).not.toBeNull();
    });
  });

  describe( "testing on completeness", () => {
    it( "I18nPipe::transform - method should exist", () => {
        // instance method must not be undefined
        expect( i18npipe.transform ).toBeDefined();
        // instance method must not be null.
        // be aware that undefined is not null.. see test above.
        expect( i18npipe.transform ).not.toBeNull();
    });
  });

  // TODO:
  /* describe( "functional testing", () => {
  }); */
});
