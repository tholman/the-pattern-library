/*!
 * MIT licensed
 * Copyright (C) 2013 Tim Holman, http://tholman.com
 */

/*********************************************
 *
 *********************************************/

function App() {

    var _this = this;

	var pane = false;
    var paneElement;
	var pageHeight = window.innerHeight; // px
	var cardHeight = Math.ceil( window.innerHeight / 4 ); // px
	var cardWidth = Math.ceil( window.innerWidth / 8 ); // px

	var nav;

	var nameSlider;
	var nameSliderText;

    var paneData = 
        '<section class="wrapper %letter%" style="z-index: %z-index%;">' +
            '<div class="letter %letter%">' + 
                '<div class="details active">' +
                    '<span class="trigger">' +
                        '<h1> %name% </h1>' +
                        '<h2>' + 
                            'BY <a href="%creatorWeb%" target="_blank">%creator%</a><span class="twitter"> - ' + 
                            '<a href="http://twitter.com/%creatorTwitter%" target="_blank">@%creatorTwitter%</a></span>' +
                        '</h2>' + 
                        '<div class="download">' +
                            '<a href="./img/%file%" download="%downloadName%" target="_blank">' +
                                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="31.5px" height="31.5px" viewBox="-1.51 8.919 31.5 31.5" enable-background="new -1.51 8.919 31.5 31.5" xml:space="preserve">' + 
                                    '<circle fill="none" stroke="#E37070" stroke-width="1.5" stroke-miterlimit="10" cx="14.24" cy="24.669" r="15"/>' + 
                                    '<path fill="#E37070" d="M18.522,25.65c-0.296-0.295-0.786-0.295-1.082,0l-2.456,2.438v-7.92c0-0.412-0.323-0.745-0.737-0.745 c-0.413,0-0.737,0.334-0.737,0.745v7.94l-2.473-2.464c-0.295-0.296-0.772-0.296-1.069,0c-0.295,0.294-0.294,0.771,0.001,1.065 l3.676,3.664c0.02,0.023,0.038,0.053,0.062,0.074c0.189,0.189,0.454,0.255,0.697,0.202c0.036-0.006,0.069-0.02,0.104-0.031 c0.007-0.002,0.014-0.003,0.021-0.005c0.122-0.047,0.228-0.126,0.31-0.226l3.686-3.673C18.818,26.423,18.818,25.945,18.522,25.65z" />' + 
                                '</svg>' +
                                '<span class="text">Download Now</span>' +
                            '</a>' +
                        '</div>' +
                    '</span>' +
                    '<div class="self-promotion">' +
                        'The pattern Library was made for fun by <br> Tim Holman & Claudio Guglieri' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</section>'

    var imageDir = './img/';
    var patternData = [
        {
            letter: 'a',
            file: 'a.jpg',
            name: 'Sexy Ripples',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'b',
            file: 'b.jpg',
            name: 'Fancy Pants',
            creator: 'Anton Repponen',
            creatorWeb: 'http://repponen.com',
            creatorTwitter: 'repponen'
        },
        {
            letter: 'c',
            file: 'c.jpg',
            name: 'Kale Salad',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'd',
            file: 'd.png',
            name: 'Leather Nunchuck',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'h',
            file: 'h.jpg',
            name: 'Chalkboard',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'k',
            file: 'k.jpg',
            name: 'Crumble',
            creator: 'Julien Bailly',
            creatorWeb: 'http://julien-bailly.com/',
            creatorTwitter: 'julien_bailly'
        },
        {
            letter: 'l',
            file: 'l.jpg',
            name: 'Fiesta',
            creator: 'Julien Bailly',
            creatorWeb: 'http://julien-bailly.com/',
            creatorTwitter: 'julien_bailly'
        },
        {
            letter: 'm',
            file: 'm.jpg',
            name: 'Knitting',
            creator: 'Julien Bailly',
            creatorWeb: 'http://julien-bailly.com/',
            creatorTwitter: 'julien_bailly'
        },
        {
            letter: 'p',
            file: 'p.gif',
            name: 'Brijan',
            creator: 'Brijan Powel',
            creatorWeb: 'www.robothate.com',
            creatorTwitter: 'brijanp'
        },
        {
            letter: 'q',
            file: 'q.png',
            name: 'Naranjas',
            creator: 'Natalia de Frutos',
            creatorWeb: 'http://www.domestika.org/es/natalia_f_ramos/portfolio',
            creatorTwitter: 'nataliadfrutos'
        },
        {
            letter: 'r',
            file: 'r.png',
            name: 'Kiwis',
            creator: 'Natalia de Frutos',
            creatorWeb: 'http://www.domestika.org/es/natalia_f_ramos/portfolio',
            creatorTwitter: 'nataliadfrutos'
        },
        {
            letter: 's',
            file: 's.png',
            name: 'Cuadros',
            creator: 'Natalia de Frutos',
            creatorWeb: 'http://www.domestika.org/es/natalia_f_ramos/portfolio',
            creatorTwitter: 'nataliadfrutos'
        },
        {
            letter: 'j',
            file: 'j.jpg',
            name: 'Maze',
            creator: 'Julien Bailly',
            creatorWeb: 'http://julien-bailly.com/',
            creatorTwitter: 'julien_bailly'
        },
        {
            letter: 't',
            file: 't.gif',
            name: 'Cocina',
            creator: 'Natalia de Frutos',
            creatorWeb: 'http://www.domestika.org/es/natalia_f_ramos/portfolio',
            creatorTwitter: 'nataliadfrutos'
        },
        {
            letter: 'u',
            file: 'u.png',
            name: 'Wild Sea',
            creator: 'Henry Daubrez',
            creatorWeb: 'www.dogstudio.be',
            creatorTwitter: 'upskydown'
        },
        {
            letter: 'v',
            file: 'v.png',
            name: 'The Illusionist',
            creator: 'Henry Daubrez',
            creatorWeb: 'www.dogstudio.be',
            creatorTwitter: 'upskydown'
        },
        {
            letter: 'x',
            file: 'x.png',
            name: 'Norwegian sweater 1',
            creator: 'Kristoffer Brady',
            creatorWeb: 'www.egosmoke.com',
            creatorTwitter: 'egosmoke'
        },
        {
            letter: 'y',
            file: 'y.png',
            name: 'Norwegian sweater 2',
            creator: 'Kristoffer Brady',
            creatorWeb: 'www.egosmoke.com',
            creatorTwitter: 'egosmoke'
        },
        {
            letter: 'z',
            file: 'z.png',
            name: 'Norwegian sweater 3',
            creator: 'Kristoffer Brady',
            creatorWeb: 'www.egosmoke.com',
            creatorTwitter: 'egosmoke'
        },
        {
            letter: 'aa',
            file: 'aa.png',
            name: 'NYC Candy',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        }
    ]

    slowPatternData = [
        {
            letter: 'g',
            file: 'g.gif',
            name: 'Alchemy',
            creator: 'Anton Repponen',
            creatorWeb: 'http://repponen.com',
            creatorTwitter: 'repponen'
        },
        {
            letter: 'n',
            file: 'n.jpg',
            name: 'Special Delivery',
            creator: 'Matt Delbridge',
            creatorWeb: 'http://mattdelbridge.com/',
            creatorTwitter: null
        },
        {
            letter: 'i',
            file: 'i.jpg',
            name: 'White Wood',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'ab',
            file: 'ab.png',
            name: 'Sushi',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'o',
            file: 'o.jpg',
            name: 'Junk Mail',
            creator: 'Matt Delbridge',
            creatorWeb: 'http://mattdelbridge.com/',
            creatorTwitter: null
        },
        {
            letter: 'e',
            file: 'e.png',
            name: 'Escape Flight',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'ac',
            file: 'ac.png',
            name: 'Subway Lines',
            creator: 'Marc Anderson',
            creatorWeb: 'http://www.marcbanderson.com/',
            creatorTwitter: 'marcbanderson'
        },
        {
            letter: 'w',
            file: 'w.png',
            name: '輪紋',
            creator: 'Daniel Marcos Perujo',
            creatorWeb: 'http://www.peruho.com/',
            creatorTwitter: 'peruho'
        },
        {
            letter: 'f',
            file: 'f.jpg',
            name: 'Dark Wood',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        }
    ]

    var loaded = 0;
    var totalItems = ( patternData.length - 1 );
    // Tiles
    var minWidth = 240;
    var maxWidth = 300;

    this.scrollSystem;

    this.init = function() {

        paneElement = $( '.panes' );

        // Randomize Pane Order
        shuffle( patternData );
        shuffle( slowPatternData );

        // Loading first image & exiting preloader
        var first = patternData[ 0 ];
        loadImage( first, function() {
            
            createPane( first, 0 );
            $( '.panes' ).show();
            
            // Debounce
            setTimeout( function() {
                $( '.loading' ).removeClass( 'preload' );
            }, 100 )
            loadSmall();
            
            // Debounce
            loadSocial();

        });

        $( '.grid' ).click( function() {
            
            $( '.tiles' ).addClass( 'active' );
        });

        // Resize event!
        window.onresize = function() {
            app.resize();
            _this.scrollSystem.resize();
        }
    }

    var set

    var loadImage = function( data, callback ) {

        var image = new Image();
        image.onload = function() {
            callback();
        };

        image.src = imageDir + data.file;
    }

    var loadSmall = function() {

        var i = 1;
        
        for( var i; i < patternData.length; i++ ) {

            (function( element, index ) {

                loadImage( element , function() {
                
                    checkLoad();
                });

            })( patternData[ i ], i );
        }
    }

    var checkLoad = function() {
        
        loaded++;

        if ( loaded === totalItems ) {
            
            // Haha, loaded.
            finalizePage();
        }
    }

    var finalizePage = function() {

        // Create final panes!
        var i = 1;
        for( var i; i < patternData.length; i++ ) {
            createPane( patternData[ i ] );
        }

        console.log( "loaded!" );

        // Inject and load slower patterns now the first X have loaded.
        for( var i = 0; i < slowPatternData.length; i++ ) {
            console.log( "load slow one")
            createPane( slowPatternData[ i ] );
        }

        _this.scrollSystem = new ScrollSystem();
        _this.scrollSystem.init();

        // Trigger mouse events
        $( '.trigger' ).mouseenter( function() {

            $( this ).parent().parent().addClass( 'active' );
        });

        $( '.trigger' ).mouseleave( function( event ) {

            $( this ).parent().parent().removeClass( 'active' );
        });

        // Add Tile Events
        $( '.tile' ).click( function() {

            var letter = this.className.split( ' ' )[1];
            _this.scrollSystem.scrollTo( letter, true );

            $( '.tiles' ).removeClass( 'active' );
        })

        // Initial screen sizing
        _this.resize();

        // Show page
        setTimeout( function() {
            $( '.loading' ).addClass( 'loaded' );
        }, 500 );

        setTimeout( function() {
            $( '.loading' ).hide();
        }, 1500 );
    }

    var loadSocial = function() {

        // Twitter
        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');

        // Facebook
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
            fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

        // Google Analytics
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-47086520-1']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    }

    var createPane = function( data, index ) {

        // Update template data
        var pane = paneData;
        pane = pane.replace( /%file%/g, data.file );
        pane = pane.replace( /%letter%/g, data.letter );
        pane = pane.replace( /%name%/g, data.name );
        pane = pane.replace( /%creator%/g, data.creator );
        pane = pane.replace( /%creatorWeb%/g, data.creatorWeb );
        pane = pane.replace( /%creatorTwitter%/g, data.creatorTwitter );
        
        pane = pane.replace( /%downloadName%/g, (data.name.toLowerCase().split(' ').join('-') + '.' + data.file.split('.')[1]) );
        pane = pane.replace( /%z-index%/g, totalItems - index );

        // Set background image... not the template way :S
        pane = $( pane );
        $( '.letter', pane ).css({
            'background-image': 'url("' + imageDir + data.file + '")'
        })

        // Set tile background
        $( '.tile.' + data.letter ).css({
            'background-image': 'url("' + imageDir + data.file + '")'
        })

        if ( data.creatorTwitter === null ) {
            $( '.twitter', pane ).remove();
        }

        paneElement.append( $( pane ) );
    }

    this.resize = function() {

        // Letter positioning.
        $( '.showcase' ).css({
            'margin-top': ( (window.innerHeight - $( '.showcase' ).height() ) / 2 ) - 50 + 'px'
        })

        var element = document.querySelector( '.tiles' );
        var width = element.offsetWidth - ( element.offsetWidth - element.clientWidth );

        // Tile Positioning.
        var maxTiles = Math.floor( width / minWidth );
        var overflow = width % minWidth;
        var divvy = overflow / maxTiles;

        $( '.main-tile' ).width( 2 * ( minWidth + divvy ) );
        $( '.tile' ).width( minWidth + divvy );
    }
}



