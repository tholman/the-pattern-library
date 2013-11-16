function ScrollSystem() {

    var deltaOfInterest,
        lastAnimation;

    var delayPeriod = 800;
    var animationTime = 600;

    var _this = this;

    var elements;

    var index = 0;

    this.timer;

    var scrolling = false;

    this.init = function( elementType ) {

        elements = $( elementType );

        window.scrollSystem = _this;

        $( document ).bind( 'mousewheel DOMMouseScroll', function( event ) {
            
            event.preventDefault();
            
            
            // Detect when scrolling has stopped, to allow user to scroll again!
            clearTimeout( _this.timer );
            _this.timer = setTimeout( _this.scrollStopped , 150 );

            if ( scrolling === false ) {
                setTimeout( function() {
                    _this.scrollStarted();
                }, 1 );
            }
            
            var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            
            _this.parseScroll( event, delta );
        });
    }

    this.scrollStarted = function() {
        scrolling = true;
    }

    this.scrollStopped = function() {
        console.log( "Stopped!" );
        scrolling = false;
    }

    this.parseScroll = function( event, delta ) {

        deltaOfInterest = delta;
        var timeNow = new Date().getTime();
        
        // Cancel scroll if currently animating or within quiet period
        // if( timeNow - lastAnimation < delayPeriod + animationTime ) {
        if ( scrolling === true && (timeNow - lastAnimation < delayPeriod + animationTime)) {

            event.preventDefault();
            return;
        }

        if (deltaOfInterest < 0) {
            this.moveUp();
        } else {
            this.moveDown();
        }
        lastAnimation = timeNow;
    }

    this.moveDown = function() {

        $( elements[ index ] ).removeClass( 'active' );
        index--;
    }

    this.moveUp = function() {

        // console.log( "move up!" );
        index++;
        $( elements[ index ] ).addClass( 'active' );

    }
}