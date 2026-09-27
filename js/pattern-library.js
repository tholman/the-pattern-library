/*!
 * MIT licensed
 * Copyright (C) 2013 Tim Holman, http://tholman.com
 */

/*********************************************
 *
 *********************************************/

function App() {

    var _this = this;

    var paneElement;
    var loading;
    var introShown;

    var paneData = 
        '<section class="wrapper %letter%">' +
            '<div class="letter %letter%">' + 
                '<div class="details active">' +
                    '<span class="trigger">' +
                        '<h1> %name% </h1>' +
                        '<h2>' + 
                            'BY <a href="%creatorWeb%" target="_blank" rel="noopener">%creator%</a><span class="twitter"> - ' + 
                            '<a href="https://twitter.com/%creatorTwitter%" target="_blank" rel="noopener">@%creatorTwitter%</a></span>' +
                        '</h2>' + 
                        '<div class="download">' +
                            '<a href="./img/%file%" download="%downloadName%">' +
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
            name: 'Kale Salad',
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
            name: 'Ripples',
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
            creator: 'Brijan Powell',
            creatorWeb: 'http://www.robothate.com',
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
            creatorWeb: 'http://www.dogstudio.be',
            creatorTwitter: 'upskydown'
        },
        {
            letter: 'v',
            file: 'v.png',
            name: 'The Illusionist',
            creator: 'Henry Daubrez',
            creatorWeb: 'http://www.dogstudio.be',
            creatorTwitter: 'upskydown'
        },
        {
            letter: 'x',
            file: 'x.png',
            name: 'Magnus 2050',
            creator: 'Kristoffer Brady',
            creatorWeb: 'http://www.egosmoke.com',
            creatorTwitter: 'egosmoke'
        },
        {
            letter: 'y',
            file: 'y.png',
            name: 'Magnus 2051',
            creator: 'Kristoffer Brady',
            creatorWeb: 'http://www.egosmoke.com',
            creatorTwitter: 'egosmoke'
        },
        {
            letter: 'z',
            file: 'z.png',
            name: 'Magnus 2052',
            creator: 'Kristoffer Brady',
            creatorWeb: 'http://www.egosmoke.com',
            creatorTwitter: 'egosmoke'
        },
        {
            letter: 'aa',
            file: 'aa.png',
            name: 'NYC Candy',
            creator: 'Claudio Guglieri',
            creatorWeb: 'http://whydontwetry.com',
            creatorTwitter: 'claudioguglieri'
        },
        {
            letter: 'af',
            file: 'af.png',
            name: 'Bunting flag',
            creator: 'Raul Varela',
            creatorWeb: 'http://shonen.me',
            creatorTwitter: 'shonenCMYK'
        },
        {
            letter: 'ag',
            file: 'ag.jpg',
            name: 'Canvas Orange',
            creator: 'Raul Varela',
            creatorWeb: 'http://shonen.me',
            creatorTwitter: 'shonenCMYK'
        },
        {
            letter: 'ah',
            file: 'ah.png',
            name: 'Bicycles',
            creator: 'Shaun Fox',
            creatorWeb: 'http://shaunfox.com',
            creatorTwitter: 'shaunrfox'
        },
        {
            letter: 'ai',
            file: 'ai.png',
            name: 'Hodgepodge',
            creator: 'Anatoliy Gromov',
            creatorWeb: 'http://agromov.com',
            creatorTwitter: 'agromov'
        },
        {
            letter: 'ak',
            file: 'ak.png',
            name: 'Retro Furnish',
            creator: 'Heury & Heury',
            creatorWeb: 'http://heuryandheury.eu',
            creatorTwitter: 'heuryheury'
        },
        {
            letter: 'ap',
            file: 'ap.jpg',
            name: 'Jade',
            creator: 'Jade Meneguel',
            creatorWeb: 'http://portfolio.jademeneguel.com',
            creatorTwitter: 'jademeneguel'
        },
        {
            letter: 'aq',
            file: 'aq.jpg',
            name: 'Plaid',
            creator: 'Alexey Tretina',
            creatorWeb: 'http://www.tretina.ru',
            creatorTwitter: 'squilacci'
        },
        {
            letter: 'ar',
            file: 'ar.png',
            name: 'Kitty',
            creator: 'Penny Yu',
            creatorWeb: null,
            creatorTwitter: null
        },
        {
            letter: 'az',
            file: 'az.png',
            name: 'Quake',
            creator: 'Nina Geometrieva',
            creatorWeb: 'https://www.behance.net/ninageo',
            creatorTwitter: 'geometrieva'
        },
        {
            letter: 'ba',
            file: 'ba.jpg',
            name: 'Flowers',
            creator: 'Débora Sayuri',
            creatorWeb: 'https://www.behance.net/deborasayuri',
            creatorTwitter: null
        },
        {
            letter: 'bc',
            file: 'bc.png',
            name: 'Science',
            creator: 'Fabricio Marques',
            creatorWeb: 'http://fabric8.de',
            creatorTwitter: 'fabric_8'
        },
    ]

    // Heavier files, loaded after the first batch is ready.
    var slowPatternData = [
        {
            letter: 'ay',
            file: 'ay.jpg',
            name: 'Hotdogs',
            creator: 'Román Jusdado',
            creatorWeb: 'http://www.romanjusdado.com',
            creatorTwitter: 'romanjusdado'
        },
        {
            letter: 'ax',
            file: 'ax.jpg',
            name: 'Design Tools',
            creator: 'Miguel Angel Avila',
            creatorWeb: 'http://dribbble.com/geeklangel',
            creatorTwitter: 'geeklangel'
        },
        {
            letter: 'aw',
            file: 'aw.png',
            name: 'Green Goblin',
            creator: 'Dmitry Grigorev',
            creatorWeb: 'http://dgrigoriev.com/index.php/info',
            creatorTwitter: 'alieneye'
        },
        {
            letter: 'av',
            file: 'av.gif',
            name: 'raspberry lace',
            creator: 'Ana Novakovic',
            creatorWeb: 'http://ananovakovicdesign.com/',
            creatorTwitter: 'Ana_Novakovic_'
        },
        {
            letter: 'au',
            file: 'au.jpg',
            name: 'Isometropolis',
            creator: 'Alan Geraghty',
            creatorWeb: 'http://cargocollective.com/tigerpixel',
            creatorTwitter: 'tigerpixel'
        },
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
            creatorTwitter: 'matt_delbridge'
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
            creatorTwitter: 'matt_delbridge'
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
        },
        {
            letter: 'ae',
            file: 'ae.jpg',
            name: 'Ocean',
            creator: 'Jon Vlasach',
            creatorWeb: 'http://colectiv.com/',
            creatorTwitter: 'JonVlasach'
        },
        {
            letter: 'am',
            file: 'am.jpg',
            name: 'Guglieri Speciale',
            creator: 'Jon Vlasach',
            creatorWeb: 'http://colectiv.com/',
            creatorTwitter: 'JonVlasach'
        },
        {
            letter: 'aj',
            file: 'aj.png',
            name: 'Geometrica',
            creator: 'Guy Moorhouse',
            creatorWeb: 'http://futurefabric.co.uk',
            creatorTwitter: 'futurefabric'
        },
        {
            letter: 'al',
            file: 'al.png',
            name: 'Glitch',
            creator: 'Tim Green',
            creatorWeb: 'http://destroywerk.com',
            creatorTwitter: 'destroywerk'
        },
        {
            letter: 'an',
            file: 'an.jpg',
            name: 'Asteroids',
            creator: 'Sanja Kusturica',
            creatorWeb: 'http://noumevon.com',
            creatorTwitter: 'kustkunst'
        },
        {
            letter: 'ao',
            file: 'ao.gif',
            name: 'Shattered Island',
            creator: 'Julien Renvoye',
            creatorWeb: 'http://www.julienrenvoye.com/',
            creatorTwitter: 'julienrenvoye'
        },
        {
            letter: 'as',
            file: 'as.gif',
            name: 'Neon Autumn',
            creator: 'Dailey Crafton',
            creatorWeb: 'http://daileycrafton.com',
            creatorTwitter: 'daileycrafton'
        },
        {
            letter: 'at',
            file: 'at.png',
            name: 'Celebration',
            creator: 'Prabhu Kandavelu',
            creatorWeb: null,
            creatorTwitter: 'prabhuk1986'
        },
        {
            letter: 'bb',
            file: 'bb.jpg',
            name: 'Ahoy',
            creator: 'Lorena G',
            creatorWeb: 'http://behance.net/lorena-g',
            creatorTwitter: 'Lorena_Disseny'
        },
    ]

    var firstPattern;
    var loaded = 0;
    var totalItems = 0;

    // Tiles
    var minWidth = 240;
    var minWidthSmall = 160;

    this.scrollSystem;

    this.init = function() {

        loading = document.querySelector( '.loading' );

        paneElement = document.querySelector( '.panes' );

        // Randomize Pane Order
        shuffle( patternData );
        shuffle( slowPatternData );

        // Start on the pattern in the hash if there is one, otherwise the first (random) pattern.
        var hash = decodeURIComponent( location.hash.slice( 1 ) );
        firstPattern = takePattern( patternData, hash ) || takePattern( slowPatternData, hash );

        if ( !firstPattern ) {
            removeHash();
            firstPattern = patternData.shift();
        }

        totalItems = patternData.length;

        // Hold the intro text back until the fonts are in (or 3s), so it doesn't swap fonts in view.
        var fontsReady = Promise.race([
            document.fonts ? document.fonts.ready : Promise.resolve(),
            new Promise( function( resolve ) { setTimeout( resolve, 3000 ); })
        ]);

        // Loading first image & exiting preloader
        loadImage( firstPattern, function() {

            createPane( firstPattern );
            paneElement.style.display = 'block';

            introShown = fontsReady.then( function() {

                // Debounce
                return new Promise( function( resolve ) {
                    setTimeout( function() {
                        loading.classList.remove( 'preload' );
                        resolve();
                    }, 500 );
                });
            });

            loadSmall();
        });

        document.querySelector( '.grid' ).addEventListener( 'click', function() {

            document.body.classList.add( 'tile-view' );
            removeHash();
        });

        // Resize event!
        window.addEventListener( 'resize', function() {
            _this.resize();

            if ( _this.scrollSystem ) {
                _this.scrollSystem.resize();
            }
        });
    }

    // Pulls the pattern matching the slug out of the list.
    var takePattern = function( list, hash ) {

        if ( hash === '' ) {
            return null;
        }

        for ( var i = 0; i < list.length; i++ ) {
            if ( slugify( list[i].name ) === hash ) {
                return list.splice( i, 1 )[0];
            }
        }

        return null;
    }

    var loadImage = function( data, callback ) {

        // A missing image shouldn't hold the whole page hostage.
        var image = new Image();
        image.onload = callback;
        image.onerror = callback;
        image.src = imageDir + data.file;
    }

    var loadSmall = function() {

        if ( totalItems === 0 ) {
            finalizePage();
            return;
        }

        for ( var i = 0; i < patternData.length; i++ ) {
            loadImage( patternData[ i ], checkLoad );
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
        for ( var i = 0; i < patternData.length; i++ ) {
            createPane( patternData[ i ] );
        }

        // Inject and load slower patterns now the first X have loaded.
        for ( var i = 0; i < slowPatternData.length; i++ ) {
            createPane( slowPatternData[ i ] );
        }

        createTiles();

        _this.scrollSystem = new ScrollSystem();
        _this.scrollSystem.init();

        // Trigger mouse events
        each( '.trigger', function( trigger ) {

            var letter = trigger.closest( '.letter' );

            trigger.addEventListener( 'mouseenter', function() {
                letter.classList.add( 'active' );
            });

            trigger.addEventListener( 'mouseleave', function() {
                letter.classList.remove( 'active' );
            });
        });

        // Add Tile Events
        each( '.tile', function( tile ) {

            tile.addEventListener( 'click', function() {

                _this.scrollSystem.scrollTo( tile.dataset.letter, 0 );

                // Debounce
                setTimeout( function() {
                    document.body.classList.remove( 'tile-view' );
                }, 1 );
            });
        });

        // Initial screen sizing
        _this.resize();

        // Show page, once the intro has had its moment.
        introShown.then( function() {

            setTimeout( function() {
                loading.classList.add( 'loaded' );
            }, 2000 );

            setTimeout( function() {
                loading.style.display = 'none';
            }, 3500 );
        });
    }

    var createPane = function( data ) {

        // Update template data
        var pane = paneData;
        pane = pane.replace( /%file%/g, data.file );
        pane = pane.replace( /%letter%/g, data.letter );
        pane = pane.replace( /%name%/g, data.name );
        pane = pane.replace( /%creator%/g, data.creator );
        pane = pane.replace( /%creatorWeb%/g, data.creatorWeb );
        pane = pane.replace( /%creatorTwitter%/g, data.creatorTwitter );
        pane = pane.replace( /%downloadName%/g, slugify( data.name ) + '.' + data.file.split( '.' )[1] );

        var holder = document.createElement( 'div' );
        holder.innerHTML = pane;
        pane = holder.firstChild;

        // Set background image... not the template way :S
        pane.querySelector( '.letter' ).style.backgroundImage = 'url("' + imageDir + data.file + '")';

        if ( data.creatorTwitter === null ) {
            pane.querySelector( '.twitter' ).remove();
        }

        if ( data.creatorWeb === null ) {
            var link = pane.querySelector( 'h2 a' );
            link.removeAttribute( 'href' );
            link.classList.add( 'no-link' );
        }

        paneElement.appendChild( pane );
    }

    // Tiles are built from the same data as the panes, alphabetically.
    var createTiles = function() {

        var tiles = document.querySelector( '.tiles' );
        var patterns = [ firstPattern ].concat( patternData, slowPatternData ).sort( function( a, b ) {
            return a.name.localeCompare( b.name );
        });

        for ( var i = 0; i < patterns.length; i++ ) {

            var data = patterns[ i ];
            var tile = document.createElement( 'div' );
            tile.innerHTML = '<div class="prompt"><div class="name"></div><div class="author"></div></div>';

            tile.className = 'tile ' + data.letter;
            tile.dataset.letter = data.letter;
            tile.style.backgroundImage = 'url("' + imageDir + data.file + '")';
            tile.querySelector( '.name' ).textContent = data.name;
            tile.querySelector( '.author' ).textContent = 'BY ' + data.creator;

            tiles.appendChild( tile );
        }
    }

    this.resize = function() {

        var element = document.querySelector( '.tiles' );
        var width = element.clientWidth;

        // Tile Positioning.
        var min = width < 600 ? minWidthSmall : minWidth;
        var maxTiles = Math.max( 1, Math.floor( width / min ) );
        var tileWidth = Math.floor( width / maxTiles * 100 ) / 100;

        document.querySelector( '.main-tile' ).style.width = ( maxTiles > 2 ? tileWidth * 2 : width ) + 'px';

        each( '.tile', function( tile ) {
            tile.style.width = tileWidth + 'px';
        });
    }
}
