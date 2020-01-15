const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">press</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('CHUNK', chunk);
            body.push(chunk)
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('BODY', parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });

    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body><h1>Hello form my NodeJS Server</body>');
    res.write('</html>');
    res.end();
}

// module.exports = requestHandler;

exports.handler = requestHandler;
// module.exports.handler = requestHandler;
// module.exports = {
//     handler: requestHandler,
//     someText: 'text'
// }