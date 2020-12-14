const firstnames = require('./firstnames.js');
const adjectives = require('./adjectives.js');
const colors = require('./colors.js');

module.exports = function () {
    const { sex, name } = random(firstnames);
    const adjective = random(adjectives);
    const number = Math.floor(Math.random() * 100);
    const suffix = sex === 'w' ? 'e' : 'er';
    const color = colors[number % colors.length];

    function random(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    return {
        name,
        "adjective": adjective + suffix,
        number,
        color
    }
}