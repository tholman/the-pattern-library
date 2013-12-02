function ScrollSystem() {

    var indexMap = {};

    var _this = this;

    var windowHeight;

    var elements, wrappers;
    var heights = [];

    var scrollPosition = 0;

    var scrollDelayDelta = 200; //ms

    this.init = function() {

        windowHeight = window.innerHeight;

        elements = $( '.letter' );
        elements.height( windowHeight );

        wrappers = $( '.wrapper' );
        wrappers.height( windowHeight );

        // Prepare letters.
        // var letters = 'abcdefghijklmnopqrstuvwxyz';
        // for ( var i = 0; i < elements.length; i++ ) {
        // }


        for( var i = 0; i < elements.length; i++ ) {

            // Prepare letters
            var letter = elements[i].className.split( ' ' )[1];
            indexMap[ letter ] = i;         

            $( elements[i] ).css({
                'z-index': elements.length - i
            })

            heights.push( windowHeight );
        }

        $( '.panes' ).bind( 'mousewheel DOMMouseScroll', function( event ) {
            
            event.preventDefault();
            
            var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            
            _this.parseScroll( event, delta );
        });
    }

    this.parseScroll = function( event, delta ) {
        
        // Sort out scroll deltas here!
        scrollPosition -= ( delta / 3 );

        // Top scroll position
        if ( scrollPosition < 0 ) {
            scrollPosition = 0;
        } else if ( scrollPosition > ( ( wrappers.length - 1 ) * windowHeight ) ) {
            scrollPosition = ( ( wrappers.length - 1 ) * windowHeight );
        }

        var scrollLevel = Math.floor( scrollPosition / windowHeight );
        var scrollDepth = scrollPosition % windowHeight;

        if ( scrollLevel === ( wrappers.length - 1 ) ) {

            $( wrappers[ scrollLevel - 1 ] ).height( 0 );   
            return;
        }

        if ( scrollLevel > 0 ) {
            $( wrappers[ scrollLevel - 1 ] ).height( 0 );    
        }

        if ( scrollLevel < wrappers.length ) {
            $( wrappers[ scrollLevel + 1 ] ).height( windowHeight );    
        }

        $( wrappers[ scrollLevel ] ).height( windowHeight - scrollDepth );
    }

    // Updates ALL wrappers scroll positions
    this.updateScroll = function() {

        // Animate scrolling as well.

        var scrollLevel = Math.floor( scrollPosition / windowHeight );
        var scrollDepth = windowHeight - ( scrollPosition % windowHeight );

        for ( var i = 0; i < wrappers.length; i++ ) {

            // Item is less than the scroll level
            if ( i < scrollLevel ) {
                $( wrappers[ i ] ).height( 0 );
                continue;
            }

            if ( i === scrollLevel ) {
                $( wrappers[ i ] ).height( scrollDepth );
                continue;
            }

            if ( i > scrollLevel ) {
                $( wrappers[ i ] ).height( windowHeight );   
                continue;
            }
        }
    }

    this.resize = function() {

        var oldWindowHeight = windowHeight;
        windowHeight = window.innerHeight;

        elements = $( '.letter' );
        elements.height( windowHeight );

        wrappers = $( '.wrapper' );
        wrappers.height( windowHeight );

        var ratio = windowHeight / oldWindowHeight;
        scrollPosition = scrollPosition * ratio;

        for( var i = 0; i < heights.length; i++ ) {

            heights[ i ] = heights[ i ] * ratio;
            $( wrappers[i] ).height( heights[ i ] );
        }

        this.updateScroll();
    }

    // Scroll to specific letter... 
    // index: letter to scroll to
    // transition: snap, or transition to the letter
    this.scrollTo = function( index, transition ) {

        // Scrolling to X
        var scrollToItem = indexMap[ index.toLowerCase() ];

        // Scrolling from Y
        var currentItem = Math.floor( scrollPosition / windowHeight );

        if ( scrollToItem > currentItem ) {

            for( var i = currentItem; i < scrollToItem; i++ ) {

                addDelay( wrappers[i], ( i - currentItem ) );
            }

        } else if ( currentItem > scrollToItem ){

            for( var i = currentItem; i >= (scrollToItem - 1); i-- ) {
                
                console.log( "Item: ", currentItem - i );
                addDelay( wrappers[i], ( ( currentItem - i ) - 1  ) );
            }

        }

        scrollPosition = scrollToItem * windowHeight;
        this.updateScroll();

    }

    var addDelay = function( element, delay ) {

        delay = Math.abs( delay );

        var $element = $( element );

        console.log( $element, ( 'height ' + ( delay * scrollDelayDelta ) + 'ms' ) );
        $element.css({
            '-webkit-transition-delay': ( delay * scrollDelayDelta ) + 'ms'
        })
    }

    this.removeDelays = function() {

    }
}