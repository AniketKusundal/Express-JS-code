
const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
const parsedUrl = url.parse(req.url, true);

  // Route: Serve HTML Form
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading form.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }

  // Route: Handle POST - Append File1 to File2
  else if (req.method === 'POST' && parsedUrl.pathname === '/append') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const { file1, file2 } = querystring.parse(body);

      fs.readFile(file1, 'utf8', (err, data1) => {
        if (err) {
          res.writeHead(500);
          return res.end('Error reading source file: ' + err.message);
        }

        fs.appendFile(file2, data1, (err) => {
          if (err) {
            res.writeHead(500);
            return res.end('Error appending to destination file: ' + err.message);
          }

          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Content appended successfully!');
        });
      });
    });
  }

  // Route: Get File Content (Part b)
  else if (req.method === 'GET' && parsedUrl.pathname.startsWith('/file/')) {
    const filename = parsedUrl.pathname.replace('/file/', '');

    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Error: File not found.');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  }

  // Unknown Route
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running`);
});
