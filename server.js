const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
    <body>
        <h1>Node JS</h1>
        <p>Node is a runtime environment that allows you to trun javascript outside the brower mainly on the server side</p>
    </body>
    </html>
    `);
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
