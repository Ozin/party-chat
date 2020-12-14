const ws = require('ws')
const pug = require('pug')
const MessageStorage = require('./MessageStorage')

module.exports = class WebSocket {
    constructor(server, db) {
        this.webSocketServer = new ws.Server({ server })
        this.storage = new MessageStorage('list');
        this.db = db;
        this.previousMessages = this.getMessages();

        console.log("constructor")

        this.webSocketServer.on('connection', (client, req) => {
            console.log("new connection")

            console.log(`called route: ${req.url}`)
            if (req.url !== '/subscribe') {
                client.close()
            }

            client.on('open', () => {
                console.log('now open')
                client.send('OPEN')

            })

            this.getMessages().forEach((msg) => client.send(msg))

            client.on('close', () => {
                console.log(`Connection to undefined was closed.`)
            })

            client.on('error', () => {
                console.log('error')
            })
        })

    }

    send(message) {
        this.addMessage(message);

        [...this.webSocketServer.clients]
            .filter(client => client.readyState === ws.OPEN)
            .forEach(client => client.send(message))
    }

    sendRender(file, obj) {
        this.send(pug.compileFile(`./views/${file}`)(obj));
    }

    getMessages() {
        return this.db.getData('messages') || [];
    }

    addMessage(msg) {
        this.previousMessages.push(msg);
        this.db.push('messages', this.previousMessages);
    }
}