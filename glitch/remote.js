const { createServer } = require("net");
const { mkdirSync, writeFileSync } = require("fs");
const port = process.env.PORT

createServer(socket => {
    socket.on("data", data => {
        data = JSON.parse(data.toString());
        if(data.type == "directory") {
            mkdirSync(data.name);
            return;
        }
        if(data.type == "file") {
            writeFileSync(data.name, data.content);
            return;
        }
    })
}).listen(port, () => console.log(`remote listening on port: ${port}`));