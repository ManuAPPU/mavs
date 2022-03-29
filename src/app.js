let express = require( 'express' );
let {spawn}=require('child_process')
let app = express();
let server = require( 'http' ).Server( app );
let io = require( 'socket.io' )( server );
let stream = require( './ws/stream' );
let path = require( 'path' );
let favicon = require( 'serve-favicon' );

app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );
app.get('/hello?' , ( req, res ) => {
    spawn('python',['virtual_paint_app.py']);
} );
app.get('/user?' , ( req, res ) => {
    spawn('python',['AIVirtualMouse.py']);
} );


io.of( '/stream' ).on( 'connection', stream );

server.listen( 3000 );
