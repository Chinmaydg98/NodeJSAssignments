const http = require('http');

const server = http.createServer((req, res) => {

    //Homepage
    if (req.url === '/') {
        //Simple form which submits a username.
        res.write('<html>');
        res.write('<title>Home</title>');
        res.write('<body>');
        res.write('<form action="/create-user" method="POST">');
        res.write('<input type="text" name="username" placeholder="Username"></input>');
        res.write('<button type="submit">Add user</button');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        res.end();
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
            res.setHeader('Location', '/');
            res.end();
        })
    }
});

server.listen(3000);