const http = require('http')
const port = 3000

const handler = (req,res) => {
    console.log('action')
    res.end('XDXD')
}
const server = http.createServer(handler)

server.listen(port, (err) => {

    if (err) {
        return console.log('Connect error')
    }
    console.log('server is running...')
})