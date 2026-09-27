function ScrollSystem() {

    var indexMap = {};

    var _this = this;

    var windowHeight;

    var elements, wrappers;

    var scrollPosition = 0;

    var scrollDelayDelta = 200; //ms

    var animationTimeout, scrollTimeout;

    var body, navUp, navDown, navRandom;

    var totalItems;

    var lastWheel = 0;
    var ignoringMomentum = false;

    this.transitioning = false;

    this.init = function() {

        windowHeight = window.innerHeight;

        body = document.body;

        elements = document.querySelectorAll( '.letter' );
        setHeights( elements, windowHeight );

        wrappers = document.querySelectorAll( '.wrapper' );
        setHeights( wrappers, windowHeight );

        totalItems = wrappers.length - 1;

        for( var i = 0; i < elements.length; i++ ) {

            // Prepare letters
            var letter = elements[i].className.split( ' ' )[1];
            indexMap[ letter ] = i;         

            wrappers[i].style.zIndex = elements.length - i;

        }

        showRange( 0, 1 );

        var panes = document.querySelector( '.panes' );

        panes.addEventListener( 'wheel', function( event ) {

            event.preventDefault();

            var now = Date.now();
            var quiet = now - lastWheel > 150;
            lastWheel = now;

            if ( _this.transitioning === true ) {
                ignoringMomentum = true;
                return;
            }

            if ( ignoringMomentum && !quiet ) {
                return;
            }

            ignoringMomentum = false;

            // Normalize line/page deltas (Firefox mouse wheels) to pixels, and slow it down a touch.
            var deltaY = event.deltaY;
            if ( event.deltaMode === 1 ) {
                deltaY *= 40;
            } else if ( event.deltaMode === 2 ) {
                deltaY *= windowHeight;
            }

            var delta = -deltaY * 0.4;

            // Activate when the user stops scrolling.
            clearTimeout( scrollTimeout );
            scrollTimeout = setTimeout( function() {
                _this.finishScroll();
            }, 500 );

            _this.parseScroll( event, delta );
        }, { passive: false });

        // Swipe up/down on touch screens.
        var touchStartY = null;

        panes.addEventListener( 'touchstart', function( event ) {
            touchStartY = event.touches[0].clientY;
        });

        panes.addEventListener( 'touchend', function( event ) {

            if ( touchStartY === null ) {
                return;
            }

            var distance = touchStartY - event.changedTouches[0].clientY;
            touchStartY = null;

            if ( Math.abs( distance ) < 50 || _this.transitioning === true ) {
                return;
            }

            if ( distance > 0 ) {
                _this.scrollDown();
            } else {
                _this.scrollUp();
            }
        });

        document.addEventListener( 'keydown', function( e ) {

            // Let the tile view scroll normally.
            if ( body.classList.contains( 'tile-view' ) ) {
                return;
            }

            // UP
            if ( e.key === 'ArrowUp' ) {

                e.preventDefault();
                _this.scrollUp();

            // DOWN
            } else if ( e.key === 'ArrowDown' ) {

                e.preventDefault();
                _this.scrollDown();
            }
        });

        navUp = document.querySelector( 'nav .up' );
        navDown = document.querySelector( 'nav .down' );
        navRandom = document.querySelector( 'nav .random' );

        navUp.addEventListener( 'click', function() { _this.scrollUp(); });
        navDown.addEventListener( 'click', function() { _this.scrollDown(); });
        navRandom.addEventListener( 'click', function() { _this.scrollRandom(); });

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

        showRange( scrollLevel, scrollLevel + 1 );

        if ( scrollLevel === ( wrappers.length - 1 ) ) {

            setHeight( wrappers[ scrollLevel - 1 ], 0 );
            return;
        }

        if ( scrollLevel > 0 ) {
            setHeight( wrappers[ scrollLevel - 1 ], 0 );
        }

        if ( scrollLevel + 1 < wrappers.length ) {
            setHeight( wrappers[ scrollLevel + 1 ], windowHeight );
        }

        setHeight( wrappers[ scrollLevel ], windowHeight - scrollDepth );
    }

    // Updates ALL wrappers scroll positions
    this.updateScroll = function() {

        // Animate scrolling as well.

        var scrollLevel = Math.floor( scrollPosition / windowHeight );
        var scrollDepth = windowHeight - ( scrollPosition % windowHeight );

        for ( var i = 0; i < wrappers.length; i++ ) {

            // Item is less than the scroll level
            if ( i < scrollLevel ) {
                setHeight( wrappers[ i ], 0 );
                continue;
            }

            if ( i === scrollLevel ) {
                setHeight( wrappers[ i ], scrollDepth );
                continue;
            }

            if ( i > scrollLevel ) {
                setHeight( wrappers[ i ], windowHeight );
                continue;
            }
        }
    }

    this.resize = function() {

        var level = scrollPosition / windowHeight;
        windowHeight = window.innerHeight;

        setHeights( elements, windowHeight );

        scrollPosition = level * windowHeight;
        this.updateScroll();
        showRange( getScrollLevel(), getScrollLevel() + 1 );
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

            body.classList.add( 'transitioning' );

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

            // Stepping shows every pane on the way, a random jump only needs the two ends.
            if ( transitionType === 1 ) {
                showRange( Math.min( currentItem, scrollToItem ), Math.max( currentItem, scrollToItem ) + 1 );
            } else {
                showOnly( [ currentItem, scrollToItem, scrollToItem + 1 ] );
            }

            var scrollDifference = Math.abs( scrollToItem - currentItem );
            clearTimeout( animationTimeout );

            // 500 is the total animation time
            _this.transitioning = true;

            if ( transitionType === 1 ) {
                animationTimeout = setTimeout( _this.removeDelays, scrollDifference * scrollDelayDelta + 500 );
            } else {
                animationTimeout = setTimeout( _this.removeDelays, 500 );
            }

        }

        scrollPosition = scrollToItem * windowHeight;

        if ( !_this.transitioning ) {
            showRange( scrollToItem, scrollToItem + 1 );
        }

        this.updateScroll();
        this.manageHash();
        this.manageNav();
    }

    this.manageHash = function() {

        var scrollItem = getScrollLevel();
        setHash( slugify( wrappers[ scrollItem ].querySelector( 'h1' ).textContent ) );
    }

    // Only the current pane and the one under it are ever seen. Hiding the rest stops the
    // browser painting (and animating GIFs in) ~50 stacked full screen layers.
    var showOnly = function( indices ) {

        for ( var i = 0; i < wrappers.length; i++ ) {
            wrappers[ i ].classList.toggle( 'off', indices.indexOf( i ) === -1 );
        }
    }

    var showRange = function( from, to ) {

        var indices = [];
        for ( var i = from; i <= to; i++ ) {
            indices.push( i );
        }

        showOnly( indices );
    }

    var setHeight = function( element, height ) {
        element.style.height = height + 'px';
    }

    var setHeights = function( list, height ) {
        for ( var i = 0; i < list.length; i++ ) {
            setHeight( list[ i ], height );
        }
    }

    var addDelay = function( element, delay ) {
        element.style.transitionDelay = ( Math.abs( delay ) * scrollDelayDelta ) + 'ms';
    }

    this.removeDelays = function() {

        _this.transitioning = false;

        body.classList.remove( 'transitioning' );

        for ( var i = 0; i < wrappers.length; i++ ) {
            wrappers[ i ].style.transitionDelay = '0ms';
        }

        var level = getScrollLevel();
        showRange( level, level + 1 );

        _this.manageNav();
    }

    this.manageNav = function() {

        var scrollLevel = getScrollLevel();
        navUp.classList.toggle( 'disabled', scrollLevel === 0 );
        navDown.classList.toggle( 'disabled', scrollLevel === totalItems );
    }
}
