const express = require('express');
const cors = require('cors')

const Start = async () => {
    const app = express();
    const { Sync } = require('./models/sequalize');
    await Sync()
    app.use(cors())

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json())
    app.use(require('./router.js'));


    const server = app.listen(process.env.PORT ||5000 , () => {
        console.log(`I WORK. Example app listening at http://localhost:5000`)
    });

    const io = require('socket.io')(server);

   // io.on('connection', require('./controllers/Socket.controller').SocketHandling);
}

Start();