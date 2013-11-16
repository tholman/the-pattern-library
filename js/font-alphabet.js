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

	this.a;

    this.init = function() {

    	this.prepareCards();
    	skewTiles();

    	// Nav positioning.
    	nav = $( 'nav ul' );
    	var navMarginTop = ( pageHeight - nav.height() ) / 2
    	nav.css({ 
    		'padding-top': navMarginTop,
    		'padding-bottom': navMarginTop
		});

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


    	// Bind nav hovering.
    	nameSlider = $( '.name-slider' );
    	nameSliderText = $( '.the-name', nameSlider );

    	$( 'nav li' ).on( "mouseover", this.moveNavName );
    	$( 'nav ul' ).on( "mouseout", this.hideNavName );

    	// this.a = $( '.panes' ).onepage_scroll( {
    	//	pagination: false
    	// });
		var scrollSystem = new ScrollSystem();
		scrollSystem.init();

        // Set z indexing on scroll items

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

    this.moveNavName = function( event ) {
    	
    	$( 'nav' ).addClass( "hovered" );
    	var $target = $( event.currentTarget );
    	var top = $target.offset().top - 4; // Element is offset 4 above its position.
    	nameSlider.css({
    		top: top + 'px'
    	})
    	nameSliderText.html( $( '.text',  $target ).html() + '-font' );
    }

    this.hideNavName = function( event ) {

        // Mouse has been moved off the screen.
        if ( !event.relatedTarget ) {
            $( 'nav' ).removeClass( "hovered" );
            return;
        }

        // Mouse has moved to another list element.
    	if ( event.relatedTarget.localName === 'li' ) {
    		return;

        // Mouse has been moved off the nav, but is in the screen.
    	} else {
    		$( 'nav' ).removeClass( "hovered" );
    	}

    }
}