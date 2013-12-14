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

    var _this = this;

	var pane = false;
	var pageHeight = window.innerHeight; // px
	var cardHeight = Math.ceil( window.innerHeight / 4 ); // px
	var cardWidth = Math.ceil( window.innerWidth / 8 ); // px

	var nav;

	var nameSlider;
	var nameSliderText;

    this.scrollSystem;

    this.init = function() {

        var array = $( '.panes' ).children().get().sort( function() {
            return 0.5 - Math.random();
        });
        $( '.panes' ).append( array );

        _this.scrollSystem = new ScrollSystem();
        _this.scrollSystem.init();

        $( '.panes' ).show();

        // $( '.tile' ).click( function() {

        //     var letter = this.className.split( ' ' )[1];
        //     _this.scrollSystem.scrollTo( letter, false );

        //     $( '.tiles' ).removeClass( 'active' );
        //     $( '.tile-view' ).removeClass( 'open' );
        // });

        // Closing the claim item by clicking the overlay
        // $( '.claim-overlay' ).click( function( event) {

        //     $( document.body ).removeClass( 'overlay-active' );
        // });

        // Clicking a claim item!
        // $( '.claim' ).click( function( event ) {

        //     var letter = $( '.character', event.currentTarget ).html();
        //     $( '.background-letter' ).html( letter );

        //     $( document.body ).addClass( 'overlay-active' );
        // })

        // $( '.tile-view' ).click( function() {

        //    $( '.tiles' ).addClass( 'active' ); 
        //    $( '.tile-view' ).addClass( 'open' );
        // });

        // Initial screen sizing
        this.resize();

        // Make this happen onload?
        setTimeout( function() {
            $( '.loading' ).addClass( 'loaded' );
        }, 1500 );

        // Resize event!
        window.onresize = function() {
            app.resize();
            _this.scrollSystem.resize();
        }
    }

    this.resize = function() {

        // Letter positioning.
        $( '.showcase' ).css({
            'margin-top': ( (window.innerHeight - $( '.showcase' ).height() ) / 2 ) - 50 + 'px'
        })

    }
}