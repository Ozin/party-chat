'use strict';

const fs = require('fs');

module.exports = class MessageStorage {
    constructor(path) {
        this.path = `../storage/${path}`;
    }

    push(msg) {
        return new Promise((resolve, reject) => {
            fs.appendFile(this.path, msg, {flag:'wx'}, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        });
    }
}