const { createServer } = require("http");
const { mkdirSync, writeFileSync } = require("fs");
const port = process.env.PORT;

createServer((req, res) => {
    req.on("data", data => {
        data = JSON.parse(data.toString());
        console.log(`PUT ${data.name}`)
        if(data.type == "directory") {
            mkdirSync(req.url);
            res.end("ok");
            return;
        }
        if(data.type == "file") {
            writeFileSync(req.url, data.content);
            res.end("ok");
            return;
        }
    });
}).listen(port, () => console.log(`remote listening on port: ${port}`));