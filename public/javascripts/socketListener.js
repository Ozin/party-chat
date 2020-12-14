function onReady(){
    'use strict';

    console.log("run");
    
    const connection = new WebSocket(`ws://${location.host}/subscribe`);
    
    console.log(connection);

    /*
    connection.onopen = function () {
        const div = document.createElement("p");
        div.innerHTML = `Opened connection ${connection.readyState}:<br/>${JSON.stringify(arguments)}`
        document.body.appendChild(div);
    
        setTimeout(() => {
            connection.send("Blubba")
        }, 1000);
    }
    */
    
    const container = document.querySelector('#messages');
    
    connection.onmessage = function ({ data }) {
        const div = document.createElement("div");
    
        div.innerHTML = data.replace(/\r/g, '').replace(/\n/g, '<br />');
    
        const wrap = el => {el.innerHTML = wrapEmojis(el.innerHTML)};
        div.querySelectorAll('p').forEach(wrap);
    
        container.insertBefore(div, container.firstChild);
    }
    
    const regexEmojis = new RegExp([
        '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
        '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
        '\ud83d[\ude80-\udeff]'  // U+1F680 to U+1F6FF
    ].join('|'), 'g');
    
    function wrapEmojis(text) {
        return text.replace(regexEmojis, '<span class="emoji">$&</span>');
    }
}

window.onload = onReady;