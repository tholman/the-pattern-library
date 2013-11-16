function ScrollSystem() {

    var _this = this;

    var windowHeight;

    var elements, wrappers;
    var heights = [];

    var scrollPosition = 0;

    this.init = function() {

        windowHeight = window.innerHeight;

        elements = $( '.letter' );
        elements.height( windowHeight );

        wrappers = $( '.wrapper' );
        wrappers.height( windowHeight );


        for( var i = 0; i < elements.length; i++ ) {

            $( elements[i] ).css({
                'z-index': elements.length - i
            })

            heights.push( windowHeight );
        }

        $( document ).bind( 'mousewheel DOMMouseScroll', function( event ) {
            
            event.preventDefault();
            
            var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            
            _this.parseScroll( event, delta );
        });
    }

    this.parseScroll = function( event, delta ) {
        
        scrollPosition -= ( delta / 3 );

        if ( scrollPosition < 0 ) {
            scrollPosition = 0;
        }

        var scrollLevel = Math.floor( scrollPosition / windowHeight );
        var scrollDepth = scrollPosition % windowHeight;

        if ( scrollLevel === ( wrappers.length - 1 ) ) {
            return;
        }

        if ( scrollLevel > 0 ) {
            $( wrappers[ scrollLevel - 1 ] ).height( 0 );    
        }

        if ( scrollLevel < wrappers.length ) {
            $( wrappers[ scrollLevel + 1 ] ).height( windowHeight );    
        }

        $( wrappers[ scrollLevel ] ).height( windowHeight - scrollDepth );

        // console.log( -scrollPosition );
    }

}