function ScrollSystem() {

    var indexMap = {};

    var _this = this;

    var windowHeight;

    var elements, wrappers;
    var heights = [];

    var scrollPosition = 0;

    var scrollDelayDelta = 200; //ms

    var animationTimeout, scrollTimeout;

    var $body, $navUp, $navDown, $navRandom;

    var upDisabled = true;
    var downDisabled = false;
    var totalItems;

    this.transitioning = false;

    this.init = function() {

        windowHeight = window.innerHeight;

        $body = $( document.body );

        elements = $( '.letter' );
        elements.height( windowHeight );

        wrappers = $( '.wrapper' );
        wrappers.height( windowHeight );

        totalItems = wrappers.length - 1;

        for( var i = 0; i < elements.length; i++ ) {

            // Prepare letters
            var letter = elements[i].className.split( ' ' )[1];
            indexMap[ letter ] = i;         

            $( wrappers[i] ).css({
                'z-index': elements.length - i
            })

            heights.push( windowHeight );
        }

        // $( '.panes' ).bind( 'mousewheel MozMousePixelScroll wheel', function( event ) {

        $( '.panes' ).bind( 'mousewheel MozMousePixelScroll', function( event ) {
            
            // -event.originalEvent.deltaY, if using the wheel event... I don't want to trust this, since mouse wheels
            // may deliver strange things!

            // Manage mouse deltas on different browsers/OS
            event.preventDefault();

            if ( _this.transitioning === true ) {
                return;
            }

            var delta = ( event.originalEvent.wheelDelta / 3 ) || -event.originalEvent.detail;

            // Activate when the user stops scrolling.
            clearTimeout( scrollTimeout )
            scrollTimeout = setTimeout( function() {
                _this.finishScroll();
            }, 500 );
            
            _this.parseScroll( event, delta );
        });

        $( document ).keydown( function( e ){

            // UP
            if ( e.which == 38 ) { 
               
               _this.scrollUp();
                return false;

            // DOWN
            } else if (e.which == 40) { 

                _this.scrollDown();
                return false;
            }
        });

        $navUp = $( 'nav .up' );
        $navDown = $( 'nav .down' );
        $navRandom = $( 'nav .random' );

        $navUp.click( function() { _this.scrollUp(); })
        $navDown.click( function() { _this.scrollDown(); })
        $navRandom.click( function() { _this.scrollRandom(); })

    }

    this.finishScroll = function() {
        _this.scrollTo( Math.round( scrollPosition / windowHeight ), 1 );
    }

    this.parseScroll = function( event, delta ) {
        
        // Sort out scroll deltas here!
        scrollPosition -= delta;

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
        elements.width( window.innerWidth );

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

    this.getScrollLetter = function() {
        return elements[ getScrollLevel() ].className.split( ' ' )[1];
    }

    var getScrollLevel = function() {
        return Math.floor( scrollPosition / windowHeight );
    }

    this.scrollUp = function() {

        var scrollLevel = getScrollLevel();
        if ( (scrollLevel - 1) >= 0 ) {

            _this.scrollTo( scrollLevel - 1, 1 );
        }
    }

    this.scrollDown = function() {

        var scrollLevel = getScrollLevel();
        if ( (scrollLevel + 1) < elements.length ) {

            _this.scrollTo( scrollLevel + 1, 1 );
        }
    }

    this.scrollRandom = function() {

        var scrollLevel = getScrollLevel();
        var options = [];

        // Create list of options.
        for ( var i = 0; i < elements.length; i++ ) {
            options.push( i );
        }

        // Remove the current pattern.
        options.splice( scrollLevel, 1 );

        var randomItem = options[ Math.floor( Math.random() * options.length ) ];
        _this.scrollTo( randomItem, 2 );
    }

    // Scroll to specific letter... 
    // index: letter to scroll to
    // transition: snap, or transition to the letter
    this.scrollTo = function( index, transitionType ) {


        // Scrolling to X
        var scrollToItem = index;
        if ( typeof( index ) == 'string' ) {
            scrollToItem = indexMap[ index.toLowerCase() ];
        }

        // Scrolling from Y
        var currentItem = Math.floor( scrollPosition / windowHeight );

        if ( transitionType === 1 || transitionType === 2 ) {

            $( document.body ).addClass( 'transitioning' );

            // Scrolling down
            if ( scrollToItem > currentItem ) {

                for( var i = currentItem; i < scrollToItem; i++ ) {

                    if ( transitionType === 1 ) {
                        addDelay( wrappers[i], ( i - currentItem ) );
                    } else {
                        addDelay( wrappers[i], ( 1 ) );
                    }
                }

            // Scrolling up!
            } else if ( currentItem > scrollToItem ){
                // Look into how this works, understanding is fun.
                for( var i = currentItem - 1; i >= scrollToItem; i-- ) {

                    if ( transitionType === 1 ) {
                        addDelay( wrappers[i], ( currentItem - i - 1)  );
                    } else {
                        addDelay( wrappers[i], 1 );
                    }
                }
            }

            var scrollDifference = Math.abs( scrollToItem - currentItem );
            clearTimeout( animationTimeout );

            // 500 is the total animation time
            _this.transitioning = true;

            if ( transitionType === 1 ) {
                animationTimeout = setTimeout( bind( this, _this.removeDelays ), (scrollDifference * scrollDelayDelta + 500) )
            } else {
                animationTimeout = setTimeout( bind( this, _this.removeDelays ), 500 )
            }

        }

        scrollPosition = scrollToItem * windowHeight;
        
        this.updateScroll();
        this.manageHash();
        this.manageNav();
    }

    this.manageHash = function() {

        var scrollItem = getScrollLevel();
        location.hash = '#' + $( 'h1', wrappers.eq( scrollItem ) ).text().toLowerCase().trim().split(' ').join('-');
    }

    var addDelay = function( element, delay ) {

        delay = Math.abs( delay );
        var $element = $( element );

        $element.css({
            'transition-delay': ( delay * scrollDelayDelta ) + 'ms'
        })
    }

    this.removeDelays = function() {

        _this.transitioning = false;

        $body.removeClass( 'transitioning' );

        wrappers.css({
            'transition-delay': '0ms'
        })

        this.manageNav();
    }

    this.manageNav = function() {
         // Feels like this could have been done a bit better. :(
        var scrollLevel = getScrollLevel();
        if ( scrollLevel === 0 ) {

            upDisabled = true;
            $navUp.addClass( 'disabled' );

            downDisabled = false;
            $navDown.removeClass( 'disabled' );

        } else if ( scrollLevel === totalItems ) {

            downDisabled = true;
            $navDown.addClass( 'disabled' );

            upDisabled = false;
            $navUp.removeClass( 'disabled' );

        } else if ( downDisabled === true || upDisabled === true ){

            downDisabled = false;
            $navDown.removeClass( 'disabled' );

            upDisabled = false;
            $navUp.removeClass( 'disabled' );
        }
    }
}