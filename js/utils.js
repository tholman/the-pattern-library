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

/*********************************************
 * Remove Hash ~ http://stackoverflow.com/questions/1397329/how-to-remove-the-hash-from-window-location-with-javascript-without-page-refresh
 *********************************************/

function removeHash () { 
    var scrollV, scrollH, loc = window.location;
    if ("pushState" in history)
        history.pushState("", document.title, loc.pathname + loc.search);
    else {
        // Prevent scrolling by storing the page's current scroll offset
        scrollV = document.body.scrollTop;
        scrollH = document.body.scrollLeft;

        loc.hash = "";

        // Restore the scroll offset, should be flicker free
        document.body.scrollTop = scrollV;
        document.body.scrollLeft = scrollH;
    }
}