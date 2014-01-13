/*!
 * Pattern Library
 */

/*********************************************
 * Bind Context
 *********************************************/

function bind( scope, fn ) {
    return function () {
        fn.apply( scope, arguments );
    };
}

/*********************************************
 * Knuth Shuffle ~ https://github.com/coolaj86/knuth-shuffle
 *********************************************/

function shuffle( array ) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;

  while ( 0 !== currentIndex ) {

    randomIndex = Math.floor( Math.random() * currentIndex );
    currentIndex -= 1;

    temporaryValue = array[ currentIndex ];
    array[ currentIndex ] = array[ randomIndex ];
    array[ randomIndex ] = temporaryValue;
  }

  return array;
}