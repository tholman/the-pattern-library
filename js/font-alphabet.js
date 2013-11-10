/*!
 * font-alphabet
 *
 * MIT licensed
 * Copyright (C) 2013 Tim Holman, http://tholman.com
 */

/*********************************************
 *
 *********************************************/

function App() {

	var pane = false;
	var pageHeight = window.innerHeight; // px
	var cardHeight = Math.ceil( window.innerHeight / 4 ); // px
	var cardWidth = Math.ceil( window.innerWidth / 8 ); // px

	var nav;

	var nameSlider;
	var nameSliderText;

    this.init = function() {

    	this.prepareCards();
    	skewTiles();

    	// Nav positioning.
    	nav = $( 'nav ul' );
    	var navMarginTop = ( pageHeight - nav.height() ) / 2
    	nav.css({ 'margin-top': navMarginTop });

    	$( '.tile-view' ).mouseup( function() {
    		$( '.tile-view' ).toggleClass( 'open' );	
    	});

    	$( document.body ).click( function() {

    		if ( pane ) {
    			$( '.panes' ).removeClass( "active" );
    			$( '.tiles' ).removeClass( "ready" ).addClass( "active" );
    		} else {
    			$( '.tiles' ).removeClass( "active" );
    			$( '.panes' ).removeClass( "ready" ).addClass( "active" );
    		}

    		pane = !pane;
    		
    		setTimeout( function() {

    			if ( pane ) {
    				$( '.tiles' ).addClass( 'ready' );
    				skewTiles();
    			} else {
    				$( '.panes' ).addClass( 'ready' );
    			}
    			
    		}, 1000 )
    	})


    	// Position Mo
    	$( '.showcase' ).css({
    		'margin-top': ( (window.innerHeight - $( '.showcase' ).height() ) / 2 ) - 50 + 'px'
    	})

    }

    this.prepareCards = function() {
    	var items = $( '.tile' );
		for( var i = 0; i < items.length; i++ ) {

			var column = i % 8;
			var row = Math.floor( i / 8 );

			$item = $( items[i] );
			$item.css({
				top: row * cardHeight,
				left: column * cardWidth,
				width: cardWidth,
				height: cardHeight,
				position: 'absolute'
			})
		}
    }

    var skewTiles = function() {
    	var items = $( '.tile' );
		for( var i = 0; i < items.length; i++ ) {

			$item = $( items[i] );
			$item.css({
				"-webkit-transform": "translate3d( 0, 0, " + (100 + ( Math.random() * 200 ) ) + "px)",
				"-webkit-transition-delay": ( Math.random() * 500 ) + "ms",
				"opacity": "300ms"
			});
		}
    }
}