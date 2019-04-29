/**
 *  © 2019, slashlib.org.
 */
if ( ! String.prototype.format ) {
     String.prototype.format = function() {
       var args = arguments;
       return this.replace( /{(\d+)}/g, function( match: any, index: number ) {
         return typeof args[ index ] != "undefined" ? args[index] : match;
       });
     };
}

export { };
