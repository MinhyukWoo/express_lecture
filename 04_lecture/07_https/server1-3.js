const https = require("https")
const fs = require("fs")

https.createServer({
    cert: fs.readFileSync("도임")
})