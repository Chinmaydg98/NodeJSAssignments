const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {

    const url = request.url;
    const method = request.method;

    //Homepage
    if (url === '/') {
        response.setHeader('Content-Type', 'text/html');
        response.write('<html>');
        response.write('<title>Home</title>');
        response.write('<body>');
        response.write('<form action="/notedown" method="POST">');
        response.write('<input type="text" name="note" placeholder="Enter text"></input>');
        response.write('<button type="submit">Notedown</button>');
        response.write('</form>');
        response.write('<a href="/notes">Show notes</a>')
        response.write('</body>');
        response.write('</html>');
        return response.end();
    }

    //Recieves some data and writes it to a text file.
    if (url === '/notedown') {

        const rawFormData = [];

        request.on('data', (chunk) => {
            rawFormData.push(chunk);
        });

        request.on('end', () => {
            const parsedFormData = Buffer.concat(rawFormData).toString();
            const note = parsedFormData.split('=')[1];

            fs.writeFile('./output/note.txt', note, (error) => {
                console.log('Notedown successfull');
                response.statusCode = 302;
                response.setHeader('Location', '/');
                return response.end();
            })
        });

    }

    //Show stored notes
    if (url == '/notes') {
        fs.readFile('./output/note.txt', (error, savedNotes) => {
            if (!error) {
                response.setHeader('Content-Type', 'text/html');
                response.write('<html>');
                response.write('<title>Stored notes:</title>');
                response.write('<body>');
                response.write('<h1>Stored note contents:</h1>');
                response.write('<p>');
                response.write(savedNotes.toString());
                response.write('</p>');
                response.write('<a href="/">Back</a>')
                response.write('</body>');
                response.write('</html>');
                return response.end();
            }
        });
    }

}).listen(3000);