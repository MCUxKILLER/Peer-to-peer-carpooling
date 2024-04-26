import express from 'express';
import mongoose from 'mongoose';
import OfferedRide from './OfferRide.js';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();

mongoose.connect(process.env.MONGO_ETHERSHUTTLE_URI).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));
const app = express();
const PORT = 9000;
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);
    socket.on('join', (metaid) => {
        socket.join(metaid);
        console.log(`User ${socket.id} joined room ${metaid}`);
    });

    socket.on('send_offer', (data) => {
        console.log(data.driver_id);
        socket.to(data.driver_id).emit("recieve_offer", data);
    })
});

app.post('/offeredRide/post', (req, res) => {
    const { metaid, driver, source, dest, time, contact, totalSeats, carNumber, carName } = req.body;
    OfferedRide.create({ metaid: metaid, driver: driver, source: source, dest: dest, time: time, contact: contact, availableSeats: totalSeats, totalSeats: totalSeats, carNumber: carNumber, carName: carName }).then((newRide) => {
        res.send("Ride posted successfully!");
    }).catch((err) => {
        res.send("Sorry, a ride with this account already exists!!");
    });
});

app.get('/offeredRide/get', (req, res) => {
    OfferedRide.find({ "active": true }).then((rides) => {
        res.send(rides);
    }).catch((err) => {
        res.send(err);
    });
});

setInterval(() => {
    OfferedRide.deleteMany({ active: false })
        .then((result) => {
            console.log(`${result.deletedCount} document(s) were deleted.`);
        })
        .catch((err) => {
            console.error(`Failed to delete document: ${err}`);
        });
}, 30000);

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) });
server.listen(9001, () => { console.log('Socket server listening on port 9001') });