const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        //Simple form which submits a username.
        res.write('<html>');
        res.write('<title>Home</title>');
        res.write('<body>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username" placeholder="Username">En</input>');
        res.write('<button name="submit">Add user</button');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
    if (req.url === '/create-user') {
        //Simply console logs username from home page. 
        res.write('<html>');
        res.write('<title>User creation</title>');
        res.write('<body>');
        res.write('<h1>Reached user-create</h1>');
        res.write('</body>');
        res.write('</html>');
        res.end();
    }
});

server.listen(3000);