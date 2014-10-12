(function ( root , factory ) {
  'use strict';
  // AMD, CommonJS
  // Browser globals
  root.App = factory();

})( function() {
  'use strict';

  var exports = {};
  var privateOtto = true;

  exports.val = privateOtto;

  exports.init = function () {};

  return exports;

} );
