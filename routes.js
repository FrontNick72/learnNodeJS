const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>MainPage</title></head>');
        res.write('<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">New user</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/users') {
        res.write('<html>');
        res.write('<head><title>Users</title></head>');
        res.write('<body><ul><li>User</li><li>User</li><li>User</li></ul></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('CHUNK', chunk);
            body.push(chunk)
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log('BODY', parsedBody);
            const userName = parsedBody.split('=')[1];
            fs.writeFile('user.txt', userName, err => {
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