## angular translation (i18n) service ##

Provides dynamic translation for angular6/7 projects. Formats supported so far:
- mozilla: messages.json<br />
  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Internationalization

## getting started ##

This guide assumes, that you are familiar with the use of npm.  

Download <code>org.slashlib-ng-services-i18n-&lt;version&gt;.tgz</code> or

<code>npm install @org.slashlib/ng-services-i18n --save-dev</code>

## building the library ##

* Browse https://github.com/org-slashlib/ng-project-template and download (no fork required!) a zip/tar of the the project template.
* Run <code> npm install </code> in the project template folder.
* Download or fork this project and link it into the templates subfolder.
* Run: <code> grunt </code>
* Change to build directory: <code> cd build </code>
* Call <code> ng build </code>
* Change to dist directory: <code> npm pack </code>
* <code> npm install path/to/@org.slashlib-ng-services-i18n-<version>.tgz</code>
