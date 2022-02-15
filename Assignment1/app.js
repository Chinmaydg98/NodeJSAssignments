const http = require('http');

const server = http.createServer((req, res) => {

    //Homepage
    if (req.url === '/') {
        //Simple form which submits a username.
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<title>Home</title>');
        res.write('<body>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username" placeholder="Username"></input>');
        res.write('<button type="submit">Add user</button>');
        res.write('</form>');
        res.write('<a href="/users">Show All Users</a>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    //User list
    if(req.url === '/users'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<title>Users</title>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>Mike Hunt</li>');
        res.write('<li>Ben Dover</li>');
        res.write('<li>Mike Oxlong</li>');
        res.write('<li>Jenny Talls</li>');
        res.write('<li>Moe Lester</li>');
        res.write('</ul>');
        res.write('<a href="/">Back</a>')
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    //User creation
    if (req.url === '/create-user') {
        const formData = []
        
        //Fetch data
        req.on('data', (chunk) => {
            formData.push(chunk);
        })

        //Parse fetched data
        req.on('end', () => {
            const parsedFormData = Buffer.concat(formData).toString();
            const username = parsedFormData.split('=')[1];
            
            //Simply console log username and redirect to home page. 
            console.log(username);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        })
    }
});

server.listen(3000);