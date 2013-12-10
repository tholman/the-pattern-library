function ScrollSystem() {

    var indexMap = {};

    var _this = this;

    var windowHeight;

    var elements, wrappers;
    var heights = [];

    var scrollPosition = 0;

    var scrollDelayDelta = 200; //ms

    var animationTimeout;

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

        $( document.body ).addClass( 'transitioning' );

        // Scrolling to X
        var scrollToItem = indexMap[ index.toLowerCase() ];

        // Scrolling from Y
        var currentItem = Math.floor( scrollPosition / windowHeight );

        // Scrolling down
        if ( scrollToItem > currentItem ) {

            for( var i = currentItem; i < scrollToItem; i++ ) {
                addDelay( wrappers[i], ( i - currentItem ) );
            }

        // Scrolling up!
        } else if ( currentItem > scrollToItem ){
            // Look into how this works, understanding is fun.
            for( var i = currentItem - 1; i >= scrollToItem; i-- ) {
                addDelay( wrappers[i], ( currentItem - i - 1)  );
            }
        }

        var scrollDifference = Math.abs( scrollToItem, currentItem );

        clearTimeout( animationTimeout );

        //500 is the total animation time
        animationTimeout = setTimeout( _this.removeDelays, (scrollDifference * scrollDelayDelta + 500) )
        console.log( 'delta: ', (scrollDifference * scrollDelayDelta + 500) );

        scrollPosition = scrollToItem * windowHeight;
        this.updateScroll();

    }

    var addDelay = function( element, delay ) {

        delay = Math.abs( delay );
        var $element = $( element );

        $element.css({
            'transition-delay': ( delay * scrollDelayDelta ) + 'ms'
        })
    }

    this.removeDelays = function() {

        console.log( 'remove!' );

        $( document.body ).removeClass( 'transitioning' );

        $( '.wrapper' ).css({
            'transition-delay': '0ms'
        })
    }
}