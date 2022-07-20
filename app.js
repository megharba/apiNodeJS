//http module is used tomake http requests
const { on } = require('events');
const http = require('http');

// create a server

const server = http.createServer((req,res) =>{
    console.log(req);
    // const / let
    const { url, method } = req;
    if(url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write(`<body>
                        <form action="/message">
                            <input type="text name="message">
                            <button type="submit">Send</button>
                        </form>
                    </body>`);
        res.write('</html>');
        res.end();
    }

    if(url === '/message' && method === 'POST'){
        const body = [];
        //data event is emitted when data is received 
        
        req.on('data',(chunk) => {
            console.log(chunk);
            body.push(chunk);

        });on('end',() => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            message = parsedBody.split("=")[1];
            fs.writeFileSync("message.txt", message);
            res.statusCode = 302;
            res.setHeader('Location','/');
            return res.end();

        }).on('error',(err)=>{
            console.log(err);
        });
        
    }
    
    //send a response 
   // res.writeHead(200,{'Content-Type': 'text/plain'});
   // res.end('Hello World\n');
})

//execution: node app.js 
server.listen(3000);