const http = require('http')
const fs = require('fs')
const path = require('path')
PORT = 5000

function server(html) {
    http.createServer ((req, res) => {
        const url = req.url
        if (url === '/') {
            res.writeHead(200, {'Content-Type': 'text/html' });
            res.end(html);
        }
        else if (url === '/style.css') {
            const cssPath = path.join (__dirname, 'public', 'style.css');
            fs.readFile (cssPath, (err, css) => {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'text/css' });
                res.end(css);
            })
        }
        else if (url === '/file.js') {
            const jsPath = path.join (__dirname, 'public', 'file.js');
            fs.readFile (jsPath, (err, js) => {
                if (err) throw err;
                res.writeHead(200, {'Content-Type': 'text/javascript' });
                res.end(js);
            })
        }
        else {
            res.writeHead (404, { 'content-type': 'text/html' })
            res.write('<h2>ERROR! go back to <a href="/">Home</a></h2>')
            res.end()
        }
    }).listen(PORT)
}

fs.readFile('./public/index.html', (err, html) => {
    if (err) throw err;
    server(html);
});




// server.on('request', (req, res) => {
//     // res.writeHead( 200, {'content-type': 'text/html'} )
//     // res.write("Hellow")
//     // res.end()
// })



// server.listen(PORT, (req, res) => {
//     console.log('Server Established')
// })